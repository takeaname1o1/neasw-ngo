from fastapi import APIRouter, HTTPException, Depends
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
async def submit_contact_form(form_data: ContactFormSubmit, db: Session = Depends(get_db)):
    """
    Receives contact form submissions, writes them to the SQLite database, and simulates email notification.
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

        # Notify via Email Service (mock/stub)
        await EmailService.send_contact_form_email(form_data)

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
        "emails": ["neasw.welfare@gmail.com"],
        "phones": ["+91 876 676 8888", "+91 676 676 8888"],
        "locations": ["Delhi", "Nagaland", "Arunachal Pradesh"],
        "socials": {"instagram": "@NEASW.Welfare"}
    }
