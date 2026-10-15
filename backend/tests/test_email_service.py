"""Exercise Brevo requests and submission persistence without external calls."""
import json
import unittest
from unittest.mock import AsyncMock, patch

import httpx
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import Settings
from app.core.database import Base, get_db
from app.main import app
from app.models.db_models import ContactSubmission
from app.models.schemas import ContactFormSubmit
from app.services.email_service import BREVO_EMAIL_URL, EmailService

AsyncClient = httpx.AsyncClient


def email_settings(**overrides):
    values = {
        "MAIL_ENABLED": True,
        "MAIL_PROVIDER": "brevo",
        "BREVO_API_KEY": "test-brevo-key",
        "MAIL_FROM": "notifications@neaswwelfarefoundation.in",
        "MAIL_FROM_NAME": "NorthEast Association for Social Welfare",
        "MAIL_TO_ADMIN": "admin@example.com",
    }
    values.update(overrides)
    return Settings(_env_file=None, **values)


def test_form():
    return ContactFormSubmit(
        name='Test <Volunteer>', email='volunteer@example.com',
        phone_number='0000000000', organization_name='A & B',
        preferred_date='2026-11-01', message='<script>alert(1)</script>\nSecond line',
    )


class EmailServiceTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.settings = email_settings()
        self.settings_patch = patch('app.services.email_service.settings', self.settings)
        self.settings_patch.start()
        self.addCleanup(self.settings_patch.stop)

    def mock_client(self, handler):
        return patch('app.services.email_service.httpx.AsyncClient',
                     return_value=AsyncClient(transport=httpx.MockTransport(handler)))

    async def test_submission_uses_brevo_https_verified_sender_and_reply_to(self):
        requests = []
        def handler(request):
            requests.append(request)
            return httpx.Response(201, json={'messageId': '<test-id>'})
        with self.mock_client(handler), patch('app.services.email_service.FastMail') as smtp:
            self.assertTrue(await EmailService.send_contact_form_email(test_form()))
            smtp.assert_not_called()
        self.assertEqual(len(requests), 1)
        request = requests[0]
        self.assertEqual(str(request.url), BREVO_EMAIL_URL)
        self.assertEqual(request.method, 'POST')
        self.assertEqual(request.headers['api-key'], 'test-brevo-key')
        payload = json.loads(request.content)
        self.assertEqual(payload['sender']['email'], self.settings.MAIL_FROM)
        self.assertEqual(payload['to'], [{'email': 'admin@example.com'}])
        self.assertEqual(payload['replyTo'], {'email': 'volunteer@example.com'})
        self.assertIn('Test &lt;Volunteer&gt;', payload['htmlContent'])
        self.assertIn('A &amp; B', payload['htmlContent'])
        self.assertNotIn('<script>', payload['htmlContent'])
        self.assertIn('<br>Second line', payload['htmlContent'])

    async def test_disabled_or_missing_key_never_contacts_provider(self):
        for enabled, key in [(False, 'test-brevo-key'), (True, '')]:
            self.settings.MAIL_ENABLED = enabled
            self.settings.BREVO_API_KEY = email_settings(BREVO_API_KEY=key).BREVO_API_KEY
            with patch('app.services.email_service.httpx.AsyncClient') as client:
                self.assertFalse(await EmailService.send_contact_form_email(test_form()))
                self.assertFalse(await EmailService.send_startup_email())
                client.assert_not_called()

    async def test_provider_errors_are_logged_without_key_or_submission(self):
        for status in [401, 429, 500]:
            def handler(request):
                return httpx.Response(status, json={'message': 'test-brevo-key volunteer@example.com'})
            with self.subTest(status=status), self.mock_client(handler), \
                 self.assertLogs('uvicorn.error.email', level='ERROR') as logs, \
                 patch('app.services.email_service.FastMail') as smtp:
                self.assertFalse(await EmailService.send_contact_form_email(test_form()))
                smtp.assert_not_called()
            output = ' '.join(logs.output)
            self.assertIn(str(status), output)
            self.assertNotIn('test-brevo-key', output)
            self.assertNotIn('volunteer@example.com', output)

    async def test_timeout_does_not_raise_or_retry(self):
        requests = []
        def handler(request):
            requests.append(request)
            raise httpx.ReadTimeout('test-brevo-key', request=request)
        with self.mock_client(handler), self.assertLogs('uvicorn.error.email', level='ERROR') as logs:
            self.assertFalse(await EmailService.send_contact_form_email(test_form()))
        self.assertEqual(len(requests), 1)
        self.assertNotIn('test-brevo-key', ' '.join(logs.output))

    async def test_confirmation_rejection_logs_safe_provider_code(self):
        def handler(request):
            return httpx.Response(400, json={
                'code': 'invalid_parameter',
                'message': 'test-brevo-key volunteer@example.com',
            })
        with self.mock_client(handler), self.assertLogs('uvicorn.error.email', level='ERROR') as logs:
            self.assertFalse(await EmailService.send_registration_confirmation(test_form(), 42))
        output = ' '.join(logs.output)
        self.assertIn('volunteer_confirmation', output)
        self.assertIn('HTTP 400, code=invalid_parameter', output)
        self.assertNotIn('test-brevo-key', output)
        self.assertNotIn('volunteer@example.com', output)

    async def test_malformed_acceptance_response_is_not_reported_as_success(self):
        for body in [b'not-json', b'{}', b'[]']:
            def handler(request):
                return httpx.Response(201, content=body)
            with self.subTest(body=body), self.mock_client(handler), \
                 self.assertLogs('uvicorn.error.email', level='ERROR'):
                self.assertFalse(await EmailService.send_contact_form_email(test_form()))

    async def test_startup_uses_same_https_provider_without_reply_to(self):
        requests = []
        def handler(request):
            requests.append(request)
            return httpx.Response(201, json={'messageId': '<startup-test>'})
        with self.mock_client(handler):
            self.assertTrue(await EmailService.send_startup_email())
        payload = json.loads(requests[0].content)
        self.assertNotIn('replyTo', payload)
        self.assertIn('Server Booted', payload['subject'])
        self.assertIn('brevo', payload['htmlContent'])

    async def test_registration_confirmation_targets_applicant_and_replies_to_admin(self):
        requests = []
        def handler(request):
            requests.append(request)
            return httpx.Response(201, json={'messageId': '<confirmation-test>'})
        with self.mock_client(handler):
            self.assertTrue(await EmailService.send_registration_confirmation(test_form(), 42))
        payload = json.loads(requests[0].content)
        self.assertEqual(payload['to'], [{'email': 'volunteer@example.com'}])
        self.assertEqual(payload['replyTo'], {'email': 'admin@example.com'})
        self.assertEqual(payload['tags'], ['volunteer_confirmation'])
        self.assertEqual(payload['sender']['email'], self.settings.MAIL_FROM)
        self.assertIn('Test &lt;Volunteer&gt;', payload['htmlContent'])
        self.assertIn('42', payload['htmlContent'])
        self.assertIn('does not confirm a volunteer placement', payload['htmlContent'])
        self.assertNotIn('alert(1)', payload['htmlContent'])

    async def test_registration_confirmation_respects_mail_disabled(self):
        self.settings.MAIL_ENABLED = False
        with patch('app.services.email_service.httpx.AsyncClient') as http:
            self.assertFalse(await EmailService.send_registration_confirmation(test_form(), 42))
            http.assert_not_called()

    async def test_smtp_confirmation_targets_applicant(self):
        self.settings.MAIL_PROVIDER = 'smtp'
        self.settings.MAIL_PASSWORD = 'test-smtp-password'
        with patch('app.services.email_service.FastMail') as smtp:
            smtp.return_value.send_message = AsyncMock()
            self.assertTrue(await EmailService.send_registration_confirmation(test_form(), 42))
            message = smtp.return_value.send_message.call_args.args[0]
            self.assertEqual(
                [str(getattr(recipient, 'email', recipient)) for recipient in message.recipients],
                ['volunteer@example.com'],
            )
            self.assertEqual(message.headers, {'Reply-To': 'admin@example.com'})

    async def test_smtp_requires_explicit_provider_selection(self):
        self.settings.MAIL_PROVIDER = 'smtp'
        self.settings.MAIL_PASSWORD = 'test-smtp-password'
        with patch('app.services.email_service.FastMail') as smtp, \
             patch('app.services.email_service.httpx.AsyncClient') as http:
            smtp.return_value.send_message = AsyncMock()
            self.assertTrue(await EmailService.send_contact_form_email(test_form()))
            smtp.return_value.send_message.assert_awaited_once()
            http.assert_not_called()

    def test_api_key_is_redacted_from_settings(self):
        self.assertNotIn('test-brevo-key', repr(self.settings))


class SubmissionNotificationTests(unittest.TestCase):
    def exercise_notification_flow(self, submission_type, admin_status=201, applicant_status=201, legacy_volunteer=False):
        engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
        Base.metadata.create_all(engine)
        sessions = sessionmaker(bind=engine)
        requests = []
        def test_db():
            with sessions() as db:
                yield db
        def handler(request):
            payload = json.loads(request.content)
            requests.append(payload)
            recipient = payload['to'][0]['email']
            status = admin_status if recipient == 'admin@example.com' else applicant_status
            return httpx.Response(status, json={'messageId': '<test-id>'})
        transport = httpx.MockTransport(handler)
        app.dependency_overrides[get_db] = test_db
        client = TestClient(app)
        try:
            payload = test_form().model_dump()
            if legacy_volunteer:
                payload['organization_name'] = 'Volunteer Application (6 Months Plan)'
                payload['message'] = 'Registered interest for the 6 Months Plan (6 months).'
            if submission_type is not None:
                payload['submission_type'] = submission_type
            else:
                payload.pop('submission_type')
            with patch('app.services.email_service.settings', email_settings()), \
                 patch('app.services.email_service.httpx.AsyncClient',
                       side_effect=lambda **kwargs: AsyncClient(transport=transport)):
                response = client.post('/api/contact/submit', json=payload)
            self.assertEqual(response.status_code, 200)
            with sessions() as db:
                saved = db.query(ContactSubmission).one()
                self.assertEqual(saved.id, response.json()['id'])
            return requests
        finally:
            client.close()
            app.dependency_overrides.pop(get_db, None)
            engine.dispose()

    def test_registration_sends_separate_admin_and_applicant_emails(self):
        requests = self.exercise_notification_flow('volunteer')
        self.assertEqual([r['to'] for r in requests], [
            [{'email': 'admin@example.com'}], [{'email': 'volunteer@example.com'}],
        ])

    def test_cached_legacy_join_form_still_sends_confirmation(self):
        requests = self.exercise_notification_flow(None, legacy_volunteer=True)
        self.assertEqual(len(requests), 2)
        self.assertEqual(requests[1]['tags'], ['volunteer_confirmation'])
        self.assertEqual(requests[1]['to'], [{'email': 'volunteer@example.com'}])

    def test_explicit_contact_type_takes_precedence_over_legacy_markers(self):
        requests = self.exercise_notification_flow('contact', legacy_volunteer=True)
        self.assertEqual(len(requests), 1)

    def test_production_logs_identify_registration_classification(self):
        with self.assertLogs('uvicorn.error.submissions', level='INFO') as logs:
            self.exercise_notification_flow('volunteer')
        output = ' '.join(logs.output)
        self.assertIn('applicant_confirmation=queued', output)
        self.assertIn('classification=explicit', output)
        self.assertNotIn('volunteer@example.com', output)

    def test_contact_and_legacy_payloads_do_not_send_registration_confirmations(self):
        for submission_type in ['contact', None]:
            with self.subTest(submission_type=submission_type):
                requests = self.exercise_notification_flow(submission_type)
                self.assertEqual(len(requests), 1)
                self.assertEqual(requests[0]['to'], [{'email': 'admin@example.com'}])

    def test_admin_failure_does_not_block_applicant_confirmation(self):
        with self.assertLogs('uvicorn.error.email', level='ERROR'):
            requests = self.exercise_notification_flow('volunteer', admin_status=503)
        self.assertEqual(len(requests), 2)
        self.assertEqual(requests[1]['to'], [{'email': 'volunteer@example.com'}])

    def test_applicant_failure_does_not_undo_saved_registration(self):
        with self.assertLogs('uvicorn.error.email', level='ERROR'):
            requests = self.exercise_notification_flow('volunteer', applicant_status=503)
        self.assertEqual(len(requests), 2)

    def test_email_provider_failure_preserves_submission_and_success_response(self):
        engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
        Base.metadata.create_all(engine)
        sessions = sessionmaker(bind=engine)
        def test_db():
            with sessions() as db:
                yield db
        app.dependency_overrides[get_db] = test_db
        client = TestClient(app)
        try:
            with patch('app.services.email_service.settings', email_settings()), \
                 patch('app.services.email_service.httpx.AsyncClient', return_value=AsyncClient(
                     transport=httpx.MockTransport(lambda request: httpx.Response(503)))), \
                 self.assertLogs('uvicorn.error.email', level='ERROR'):
                response = client.post('/api/contact/submit', json=test_form().model_dump())
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json()['status'], 'success')
            with sessions() as db:
                saved = db.query(ContactSubmission).one()
                self.assertEqual(saved.id, response.json()['id'])
                self.assertEqual(saved.message, test_form().message)
        finally:
            client.close()
            app.dependency_overrides.pop(get_db, None)
            engine.dispose()


if __name__ == '__main__':
    unittest.main()
