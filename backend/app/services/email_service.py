import logging
from fastapi_mail import FastMail, MessageSchema, MessageType
from app.models.schemas import ContactFormSubmit
from app.core.config import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    async def send_contact_form_email(form_data: ContactFormSubmit) -> bool:
        """
        Sends contact form submission email using FastAPI-Mail and configured SMTP credentials.
        """
        message = MessageSchema(
            subject=f"[New Web Submission] Form Entry from {form_data.name}",
            recipients=[settings.MAIL_TO_ADMIN],
            headers={"Reply-To": form_data.email},
            body=f"""
<h2>New Website Submission Received</h2>
<p><strong>Name:</strong> {form_data.name}</p>
<p><strong>Email:</strong> {form_data.email}</p>
<p><strong>Phone:</strong> {form_data.phone_number or 'N/A'}</p>
<p><strong>Organization:</strong> {form_data.organization_name or 'N/A'}</p>
<p><strong>Preferred Date:</strong> {form_data.preferred_date or 'N/A'}</p>
<hr>
<h3>Message:</h3>
<p>{form_data.message}</p>
""",
            subtype=MessageType.html
        )

        conf = settings.get_mail_config()
        fm = FastMail(conf)

        try:
            await fm.send_message(message)
            logger.info(f"Successfully dispatched notification email for {form_data.email} to {settings.MAIL_TO_ADMIN}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email via FastAPI-Mail: {e}")
            return False

    @staticmethod
    async def send_startup_email() -> bool:
        """
        Dispatches a server activation notification email when the backend boots up.
        """
        import datetime

        message = MessageSchema(
            subject=f"[{settings.PROJECT_NAME}] Server Booted & Mail Service Active",
            recipients=[settings.MAIL_TO_ADMIN],
            body=f"""
<h2>NEASW Backend Server Active</h2>
<p>The backend server has booted successfully and the email service is ready.</p>
<ul>
  <li><strong>Project:</strong> {settings.PROJECT_NAME}</li>
  <li><strong>SMTP Server:</strong> {settings.MAIL_SERVER}:{settings.MAIL_PORT}</li>
  <li><strong>Admin Recipient:</strong> {settings.MAIL_TO_ADMIN}</li>
  <li><strong>Timestamp (UTC):</strong> {datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</li>
</ul>
<p>Incoming contact form submissions will be automatically forwarded to this address.</p>
""",
            subtype=MessageType.html
        )

        conf = settings.get_mail_config()
        fm = FastMail(conf)

        try:
            await fm.send_message(message)
            logger.info(f"Server startup email sent successfully to {settings.MAIL_TO_ADMIN}")
            return True
        except Exception as e:
            logger.error(f"Failed to send startup email via FastAPI-Mail: {e}")
            return False


