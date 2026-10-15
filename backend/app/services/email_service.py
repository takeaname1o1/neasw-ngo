import logging
from datetime import datetime, timezone
from html import escape

import httpx
from fastapi_mail import FastMail, MessageSchema, MessageType

from app.models.schemas import ContactFormSubmit
from app.core.config import settings

logger = logging.getLogger(__name__)
BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email"


class EmailService:
    @staticmethod
    async def _send_email(subject: str, body: str, reply_to: str | None = None) -> bool:
        if not settings.MAIL_ENABLED:
            logger.info("Email notifications disabled (MAIL_ENABLED=False).")
            return False

        if settings.MAIL_PROVIDER == "smtp":
            return await EmailService._send_smtp(subject, body, reply_to)

        api_key = settings.BREVO_API_KEY.get_secret_value().strip()
        if not api_key:
            logger.warning("Brevo notification skipped: BREVO_API_KEY is not configured.")
            return False

        payload = {
            "sender": {"email": settings.MAIL_FROM, "name": settings.MAIL_FROM_NAME},
            "to": [{"email": settings.MAIL_TO_ADMIN}],
            "subject": subject,
            "htmlContent": body,
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
                logger.error("Brevo returned an invalid email acceptance response.")
                return False
            logger.info("Brevo accepted email notification for delivery.")
            return True
        except httpx.HTTPStatusError as exc:
            # Never log request headers, provider response bodies, or form data.
            logger.error("Brevo rejected email notification (HTTP %s).", exc.response.status_code)
        except httpx.RequestError as exc:
            logger.error("Brevo notification request failed (%s).", type(exc).__name__)
        except ValueError:
            logger.error("Brevo returned an invalid JSON response.")
        return False

    @staticmethod
    async def _send_smtp(subject: str, body: str, reply_to: str | None) -> bool:
        if not settings.MAIL_PASSWORD:
            logger.warning("SMTP notification skipped: MAIL_PASSWORD is not configured.")
            return False
        try:
            message = MessageSchema(
                subject=subject,
                recipients=[settings.MAIL_TO_ADMIN],
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
        )
