"""Recovery and static content tests against an isolated, empty database."""
import unittest
from unittest.mock import AsyncMock, MagicMock, patch

from fastapi.testclient import TestClient
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core import database
from app.core.admin_security import admin_security
from app.core.config import Settings
from app.core.database import get_db
from app.models.db_models import ContactSubmission


class SingleTableTests(unittest.TestCase):
    def test_postgres_recreates_schema_and_only_retires_known_legacy_tables(self):
        engine = MagicMock()
        engine.dialect.name = 'postgresql'
        connection = engine.begin.return_value.__enter__.return_value
        with (patch.object(database, 'engine', engine),
              patch.object(database.settings, 'DATABASE_URL_UNPOOLED', None),
              patch.object(database.Base.metadata, 'create_all') as create_tables):
            database.initialize_database()
        statements = [str(call.args[0]) for call in connection.execute.call_args_list]
        self.assertEqual(statements[0], 'CREATE SCHEMA IF NOT EXISTS public')
        self.assertEqual(len(statements), 5)
        self.assertTrue(all('contact_submissions' not in sql for sql in statements))
        create_tables.assert_called_once_with(bind=connection, tables=[ContactSubmission.__table__])

    def test_legacy_tables_are_removed_without_deleting_submissions(self):
        engine = create_engine('sqlite://')
        try:
            with patch.object(database, 'engine', engine):
                database.initialize_database()
                with engine.begin() as connection:
                    connection.execute(ContactSubmission.__table__.insert().values(
                        name='Preserve this enquiry', email='test@example.com',
                        phone_number='0000000000', message='Keep this record',
                    ))
                    for table in ['leadership_members', 'volunteer_plans', 'admin_sessions', 'admin_login_attempts']:
                        connection.execute(text(f'CREATE TABLE "{table}" (id INTEGER)'))
                database.initialize_database()
                self.assertEqual(inspect(engine).get_table_names(), ['contact_submissions'])
                with engine.connect() as connection:
                    self.assertEqual(connection.scalar(text('SELECT COUNT(*) FROM contact_submissions')), 1)
        finally:
            engine.dispose()

    def test_public_content_does_not_connect_to_database(self):
        def unavailable_database():
            raise AssertionError('Static endpoints must not access the database')
            yield
        app.dependency_overrides[get_db] = unavailable_database
        client = TestClient(app)
        try:
            leadership = client.get('/api/about/leadership')
            plans = client.get('/api/join/volunteer-plans')
            self.assertEqual(leadership.status_code, 200)
            self.assertEqual(plans.status_code, 200)
            self.assertEqual(len(leadership.json()), 18)
            self.assertEqual(sorted(p['duration_months'] for p in plans.json()), [6, 12, 24])
        finally:
            client.close()
            app.dependency_overrides.clear()

    def test_empty_database_recovers_and_supports_both_forms_and_admin(self):
        engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
        sessions = sessionmaker(bind=engine)
        def isolated_database():
            with sessions() as db:
                yield db
        app.dependency_overrides[get_db] = isolated_database
        admin_security.clear()
        try:
            self.assertEqual(inspect(engine).get_table_names(), [])
            with (
                patch.object(database, 'engine', engine),
                patch.object(database.settings, 'DATABASE_URL_UNPOOLED', None),
                patch.object(Settings, 'admin_credentials', return_value=('test-admin', 'test-password')),
                patch('app.services.email_service.EmailService.send_startup_email', new=AsyncMock(return_value=False)),
                patch('app.services.email_service.EmailService.send_contact_form_email', new=AsyncMock(return_value=True)),
                patch('app.services.email_service.EmailService.send_contact_confirmation', new=AsyncMock(return_value=True)),
                patch('app.services.email_service.EmailService.send_registration_confirmation', new=AsyncMock(return_value=True)),
                TestClient(app, base_url='https://testserver', headers={'X-Admin-Request': '1'}) as client,
            ):
                self.assertEqual(inspect(engine).get_table_names(), ['contact_submissions'])
                for submission_type in ['contact', 'volunteer']:
                    response = client.post('/api/contact/submit', json={
                        'submission_type': submission_type, 'name': 'Recovery test',
                        'email': 'test@example.com', 'phone_number': '0000000000',
                        'message': 'Synthetic recovery test',
                    })
                    self.assertEqual(response.status_code, 200)
                self.assertEqual(client.post('/api/admin/login', json={
                    'username': 'test-admin', 'password': 'test-password',
                }).status_code, 200)
                self.assertEqual(client.get('/api/admin/submissions').json()['total'], 2)
                database.initialize_database()
                with sessions() as db:
                    self.assertEqual(db.query(ContactSubmission).count(), 2)
                self.assertEqual(inspect(engine).get_table_names(), ['contact_submissions'])
        finally:
            app.dependency_overrides.clear()
            admin_security.clear()
            engine.dispose()


if __name__ == '__main__':
    unittest.main()
