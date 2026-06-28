import logging
from sqlalchemy.orm import Session
from app.models.db_models import VolunteerPlan, LeadershipMember

logger = logging.getLogger(__name__)

def seed_db(db: Session):
    try:
        # Check if volunteer plans table is empty
        if db.query(VolunteerPlan).count() == 0:
            logger.info("Seeding default volunteer plans...")
            plans = [
                VolunteerPlan(
                    duration_months=6,
                    title="6 Months Plan",
                    features=[
                        "Volunteer Certificate",
                        "Practical field experience",
                        "Skill-building workshops",
                        "Networking opportunities"
                    ]
                ),
                VolunteerPlan(
                    duration_months=12,
                    title="12 Months Plan",
                    features=[
                        "Everything in 6 months plan",
                        "Leadership opportunities",
                        "Recommendation Letter",
                        "Internship Certificate",
                        "Event management experience"
                    ]
                ),
                VolunteerPlan(
                    duration_months=24,
                    title="24 Months Plan",
                    features=[
                        "Everything in 12 months plan",
                        "Project Coordinator eligibility",
                        "Sponsored training opportunities",
                        "Priority for paid projects",
                        "Official NEASW Ambassador status",
                        "Exclusive invitations to partner events"
                    ]
                )
            ]
            db.add_all(plans)
            db.commit()
            logger.info("Seeding volunteer plans complete.")

        # Check if leadership table is empty
        if db.query(LeadershipMember).count() == 0:
            logger.info("Seeding default leadership members...")
            members = [
                LeadershipMember(name="Member Name", position="Position", chapter="Delhi Chapter"),
                LeadershipMember(name="Member Name", position="Position", chapter="Nagaland Chapter"),
                LeadershipMember(name="Member Name", position="Position", chapter="Manipur Chapter"),
                LeadershipMember(name="Member Name", position="Position", chapter="Arunachal Pradesh Chapter")
            ]
            db.add_all(members)
            db.commit()
            logger.info("Seeding leadership members complete.")
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        db.rollback()
