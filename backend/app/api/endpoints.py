from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.db_models import ContactSubmission, LeadershipMember, VolunteerPlan
from app.models.schemas import ContactFormSubmit, LeadershipMember as LeadershipSchema, VolunteerPlan as PlanSchema
from app.services.email_service import EmailService

router = APIRouter()

# PAGE 2: ABOUT US ENDPOINTS
@router.get("/about/leadership", response_model=list[LeadershipSchema])
async def get_leadership(db: Session = Depends(get_db)):
    """Returns the leadership directory grouped by regional chapters from the database."""
    try:
        members = db.query(LeadershipMember).all()
        return members
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {str(e)}")

# PAGE 4: JOIN NEASW ENDPOINTS
@router.get("/join/volunteer-plans", response_model=list[PlanSchema])
async def get_volunteer_plans(db: Session = Depends(get_db)):
    """Returns the tiered volunteer plans from the database."""
    try:
        plans = db.query(VolunteerPlan).all()
        return plans
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {str(e)}")

# PAGE 5: CONTACT US ENDPOINTS
@router.post("/contact/submit")
async def submit_contact_form(
    form_data: ContactFormSubmit,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Receives contact form submissions, writes them to the SQLite database, and dispatches an email notification.
    """
    try:
        # Create DB record
        db_submission = ContactSubmission(
            name=form_data.name,
            email=form_data.email,
            phone_number=form_data.phone_number,
            organization_name=form_data.organization_name,
            preferred_date=form_data.preferred_date,
            message=form_data.message
        )
        db.add(db_submission)
        db.commit()
        db.refresh(db_submission)

        # Notify via Email Service asynchronously in background
        background_tasks.add_task(EmailService.send_contact_form_email, form_data)

        return {
            "status": "success",
            "id": db_submission.id,
            "message": f"Thank you {form_data.name}, your request to reserve a spot has been received and saved."
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to submit form: {str(e)}")


@router.get("/contact/info")
async def get_contact_info():
    """Returns global contact information used in the footer and contact page."""
    return {
        "motto": "Unity & Service",
        "headquarters": "50, Pandit Deen Dayal Upadhyaya Marg, Mata Sundari Railway Colony, Mandi House, Delhi, India 110002",
        "emails": ["ne.association.for.socialwelfare@gmail.com"],
        "phones": ["+91 6009-313275"],
        "locations": ["Delhi", "Nagaland", "Arunachal Pradesh", "Manipur"],
        "socials": {"instagram": "https://www.instagram.com/neasw__?igsh=MW9xa3MyM3U2bGczOQ=="},
        "partners": [
            {"name": "Assam Rifles", "url": "https://assamrifles.gov.in/"},
            {"name": "Ministry of Home Affairs", "url": "https://www.mha.gov.in/"},
            {"name": "Ministry of Development of North Eastern Region", "url": "https://mdoner.gov.in/"},
            {"name": "Department of Science & Technology", "url": "https://dst.gov.in/"}
        ]
    }
