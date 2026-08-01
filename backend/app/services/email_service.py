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

