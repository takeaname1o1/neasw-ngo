import logging
import re
from datetime import datetime, timezone
from html import escape

import httpx
from fastapi_mail import FastMail, MessageSchema, MessageType

from app.models.schemas import ContactFormSubmit
from app.core.config import settings

logger = logging.getLogger("uvicorn.error.email")
BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email"


class EmailService:
    @staticmethod
    async def _send_email(
        subject: str, body: str, reply_to: str | None = None,
        *, recipient: str | None = None, category: str = "admin_notification",
    ) -> bool:
        if not settings.MAIL_ENABLED:
            logger.info("Email %s skipped: MAIL_ENABLED=False.", category)
            return False

        if settings.MAIL_PROVIDER == "smtp":
            return await EmailService._send_smtp(subject, body, reply_to, recipient=recipient)

        api_key = settings.BREVO_API_KEY.get_secret_value().strip()
        if not api_key:
            logger.warning("Brevo %s skipped: BREVO_API_KEY is not configured.", category)
            return False

        payload = {
            "sender": {"email": settings.MAIL_FROM, "name": settings.MAIL_FROM_NAME},
            "to": [{"email": recipient or settings.MAIL_TO_ADMIN}],
            "subject": subject,
            "htmlContent": body,
            "tags": [category],
        }
        if reply_to:
            payload["replyTo"] = {"email": reply_to}

        try:
            async with httpx.AsyncClient(timeout=httpx.Timeout(15.0, connect=5.0)) as client:
                response = await client.post(
                    BREVO_EMAIL_URL,
                    headers={"api-key": api_key, "accept": "application/json"},
                    json=payload,
                )
                response.raise_for_status()
            # API acceptance is distinct from delivery to the recipient's inbox.
            result = response.json()
            if not isinstance(result, dict) or not result.get("messageId"):
                logger.error("Brevo %s returned an invalid email acceptance response.", category)
                return False
            logger.info("Brevo accepted %s for delivery.", category)
            return True
        except httpx.HTTPStatusError as exc:
            # Never log request headers, provider response bodies, or form data.
            code = "unknown"
            try:
                detail = exc.response.json()
                value = detail.get("code") if isinstance(detail, dict) else None
                if isinstance(value, str) and re.fullmatch(r"[A-Za-z0-9_-]{1,64}", value):
                    code = value
            except ValueError:
                pass
            logger.error(
                "Brevo rejected %s (HTTP %s, code=%s).",
                category, exc.response.status_code, code,
            )
        except httpx.RequestError as exc:
            logger.error("Brevo %s request failed (%s).", category, type(exc).__name__)
        except ValueError:
            logger.error("Brevo %s returned an invalid JSON response.", category)
        return False

    @staticmethod
    async def _send_smtp(
        subject: str, body: str, reply_to: str | None,
        *, recipient: str | None = None,
    ) -> bool:
        if not settings.MAIL_PASSWORD:
            logger.warning("SMTP notification skipped: MAIL_PASSWORD is not configured.")
            return False
        try:
            message = MessageSchema(
                subject=subject,
                recipients=[recipient or settings.MAIL_TO_ADMIN],
                headers={"Reply-To": reply_to} if reply_to else {},
                body=body,
                subtype=MessageType.html,
            )
            await FastMail(settings.get_mail_config()).send_message(message)
            logger.info("SMTP email notification dispatched.")
            return True
        except Exception as exc:
            logger.error("SMTP notification failed (%s).", type(exc).__name__)
            return False

    @staticmethod
    async def send_contact_form_email(form_data: ContactFormSubmit) -> bool:
        """Notify the admin after database storage; email failures never undo it."""
        body = f"""
<h2>New Website Submission Received</h2>
<p><strong>Name:</strong> {escape(form_data.name)}</p>
<p><strong>Email:</strong> {escape(str(form_data.email))}</p>
<p><strong>Phone:</strong> {escape(form_data.phone_number or 'N/A')}</p>
<p><strong>Organization:</strong> {escape(form_data.organization_name or 'N/A')}</p>
<p><strong>Preferred Date:</strong> {escape(form_data.preferred_date or 'N/A')}</p>
<hr>
<h3>Message:</h3>
<p>{escape(form_data.message).replace(chr(10), '<br>')}</p>
"""
        return await EmailService._send_email(
            subject=f"[New Web Submission] Form Entry from {' '.join(form_data.name.splitlines())}",
            body=body,
            reply_to=str(form_data.email),
        )

    @staticmethod
    async def send_contact_confirmation(form_data: ContactFormSubmit, submission_id: int) -> bool:
        """Acknowledge a saved enquiry without promising a booking or response time."""
        body = f"""
<h2>Thank you for contacting us</h2>
<p>Hello {escape(form_data.name)},</p>
<p>We have received your enquiry at NorthEast Association for Social Welfare.</p>
<p><strong>Enquiry reference:</strong> {submission_id}</p>
<p>Our team will review your message and get back to you.
This email confirms receipt of your enquiry; it does not confirm a booking or reservation.</p>
<p>If you have questions or additional details, reply to this email to reach our team.</p>
<p>NorthEast Association for Social Welfare<br>Unity &amp; Service</p>
"""
        return await EmailService._send_email(
            subject="We received your enquiry — NorthEast Association for Social Welfare",
            body=body,
            recipient=str(form_data.email),
            reply_to=settings.MAIL_TO_ADMIN,
            category="contact_confirmation",
        )

    @staticmethod
    async def send_registration_confirmation(form_data: ContactFormSubmit, submission_id: int) -> bool:
        """Acknowledge receipt, not acceptance into the volunteer programme."""
        body = f"""
<h2>Thank you for registering your interest</h2>
<p>Hello {escape(form_data.name)},</p>
<p>We have received your volunteer application to NorthEast Association for Social Welfare.</p>
<p><strong>Application reference:</strong> {submission_id}</p>
<p>Our team will review your application and contact you about the next steps.
This email confirms receipt of your application; it does not confirm a volunteer placement.</p>
<p>If you have questions, reply to this email to reach our team.</p>
<p>NorthEast Association for Social Welfare<br>Unity &amp; Service</p>
"""
        return await EmailService._send_email(
            subject="We received your volunteer application — NorthEast Association for Social Welfare",
            body=body,
            recipient=str(form_data.email),
            reply_to=settings.MAIL_TO_ADMIN,
            category="volunteer_confirmation",
        )

    @staticmethod
    async def send_startup_email() -> bool:
        """Notify the admin when the API starts, using the configured provider."""
        body = f"""
<h2>NEASW Backend Server Active</h2>
<p>The backend server has booted successfully.</p>
<ul>
  <li><strong>Project:</strong> {escape(settings.PROJECT_NAME)}</li>
  <li><strong>Email Provider:</strong> {escape(settings.MAIL_PROVIDER)}</li>
  <li><strong>Timestamp (UTC):</strong> {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</li>
</ul>
<p>Incoming contact form submissions will be forwarded to this address when email delivery succeeds.</p>
"""
        return await EmailService._send_email(
            subject=f"[{settings.PROJECT_NAME}] Server Booted",
            body=body,
            category="startup_notification",
        )
