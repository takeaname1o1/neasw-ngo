"""Exercise auth and private records against isolated SQLite, never Neon."""
from datetime import datetime, timedelta
from dataclasses import replace
import hashlib
import os
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.config import Settings
from app.core.database import Base, get_db
from app.api.admin import COOKIE, credential_key, now
from app.models.db_models import ContactSubmission
from app.core.admin_security import admin_security


class AdminTests(unittest.TestCase):
    def setUp(self):
        admin_security.clear()
        self.engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
        Base.metadata.create_all(self.engine)
        self.sessions = sessionmaker(bind=self.engine)
        def test_db():
            with self.sessions() as db:
                yield db
        app.dependency_overrides[get_db] = test_db
        self.credentials = patch.object(Settings, 'admin_credentials', return_value=('test-admin', 'test-password'))
        self.credentials.start()
        self.client = TestClient(app, base_url='https://testserver', headers={'X-Admin-Request': '1'})
        with self.sessions() as db:
            for index in range(23):
                db.add(ContactSubmission(name=f'Person {index}', email=f'person{index}@example.org',
                                         phone_number='1234567890', message='Private enquiry',
                                         created_at=now() + timedelta(seconds=index)))
            db.commit()

    def tearDown(self):
        self.client.close()
        self.credentials.stop()
        credential_key.cache_clear()
        app.dependency_overrides.clear()
        self.engine.dispose()
        admin_security.clear()

    def login(self, **kwargs):
        return self.client.post('/api/admin/login', json={'username': 'test-admin', 'password': 'test-password'}, **kwargs)

    def test_private_endpoints_require_login_and_are_not_cached(self):
        for path in ('/api/admin/session', '/api/admin/submissions'):
            response = self.client.get(path)
            self.assertEqual(response.status_code, 401)
            self.assertEqual(response.headers['cache-control'], 'no-store')
        self.client.cookies.set(COOKIE, 'forged-token')
        self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)

    def test_login_cookie_reload_pagination_search_and_logout_revocation(self):
        response = self.login()
        self.assertEqual(response.status_code, 200)
        cookie = response.headers['set-cookie']
        for flag in ('HttpOnly', 'Secure', 'SameSite=lax', 'Max-Age=28800', 'Path=/api/admin'):
            self.assertIn(flag, cookie)
        token = self.client.cookies.get(COOKIE)
        session = admin_security.get_session(hashlib.sha256(token.encode()).hexdigest(), now())
        self.assertIsNotNone(session)
        self.assertNotEqual(session.token_hash, token)
        self.assertEqual(session.token_hash, hashlib.sha256(token.encode()).hexdigest())
        self.assertEqual(self.client.get('/api/admin/session').json()['username'], 'test-admin')
        records = self.client.get('/api/admin/submissions').json()
        self.assertEqual(records['total'], 23)
        self.assertEqual(len(records['items']), 20)
        self.assertEqual(records['items'][0]['name'], 'Person 22')
        self.assertEqual(datetime.fromisoformat(records['items'][0]['created_at']).utcoffset(), timedelta(0))
        self.assertEqual(len(self.client.get('/api/admin/submissions?page=2').json()['items']), 3)
        self.assertEqual(self.client.get('/api/admin/submissions?search=person22%40example.org').json()['total'], 1)
        self.assertEqual(self.client.get('/api/admin/submissions?search=%27%20OR%201=1--').json()['total'], 0)
        self.assertEqual(self.client.get('/api/admin/submissions?page_size=101').status_code, 422)
        self.assertEqual(self.client.post('/api/admin/logout').status_code, 200)
        self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)
        self.client.cookies.set(COOKIE, token)
        self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)

    def test_expired_sessions_and_credential_rotation_are_rejected(self):
        self.login()
        token_hash = hashlib.sha256(self.client.cookies.get(COOKIE).encode()).hexdigest()
        session = admin_security.get_session(token_hash, now())
        admin_security.create_session(replace(session, expires_at=now() - timedelta(seconds=1)), now())
        self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)
        self.login()
        with patch.object(Settings, 'admin_credentials', return_value=('test-admin', 'new-password')):
            self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)

    def test_wrong_password_and_rate_limit(self):
        for _ in range(5):
            response = self.client.post('/api/admin/login', json={'username': 'test-admin', 'password': 'wrong'})
            self.assertEqual(response.status_code, 401)
        response = self.login()
        self.assertEqual(response.status_code, 429)
        self.assertEqual(response.headers['retry-after'], '900')
        self.assertEqual(self.client.get('/api/admin/submissions').status_code, 401)

    def test_process_restart_invalidates_session_and_allows_fresh_login(self):
        self.assertEqual(self.login().status_code, 200)
        admin_security.clear()
        self.assertEqual(self.client.get('/api/admin/session').status_code, 401)
        self.assertEqual(self.login().status_code, 200)

    def test_csrf_and_cross_origin_requests_are_rejected(self):
        self.assertEqual(self.login(headers={'Origin': 'https://evil.example'}).status_code, 403)
        self.assertEqual(self.login(headers={'X-Admin-Request': ''}).status_code, 403)
        response = self.client.options('/api/admin/login', headers={
            'Origin': 'https://evil.example', 'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'x-admin-request,content-type'})
        self.assertNotIn('access-control-allow-origin', response.headers)
        self.assertEqual(self.login(headers={'Origin': 'https://neaswwelfarefoundation.in'}).status_code, 200)

    def test_legacy_dotenv_credentials_do_not_use_operating_system_user(self):
        with TemporaryDirectory() as directory:
            env_file = Path(directory) / '.env.local'
            env_file.write_text('USER=website-admin\nPASSWORD=website-password\n')
            with (patch.dict(Settings.model_config, {'env_file': (env_file,)}),
                  patch.dict(os.environ, {'USER': 'operating-system-user'})):
                config = Settings(_env_file=None, ADMIN_USERNAME='', ADMIN_PASSWORD='')
                # Invoke the implementation, without this test class's credential stub.
                self.credentials.stop()
                try:
                    self.assertEqual(config.admin_credentials(), ('website-admin', 'website-password'))
                    preferred = Settings(_env_file=None, ADMIN_USERNAME='preferred', ADMIN_PASSWORD='preferred-password')
                    self.assertEqual(preferred.admin_credentials(), ('preferred', 'preferred-password'))
                finally:
                    self.credentials.start()

    def test_missing_credentials_fail_closed(self):
        with patch.object(Settings, 'admin_credentials', return_value=('', '')):
            self.assertEqual(self.login().status_code, 503)


if __name__ == '__main__':
    unittest.main()
