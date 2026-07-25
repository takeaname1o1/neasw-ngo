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

        # Seed/Update leadership members if empty or placeholder
        if db.query(LeadershipMember).count() <= 4:
            logger.info("Seeding complete leadership members...")
            db.query(LeadershipMember).delete()
            members = [
                LeadershipMember(id=1, name="Nyaken Riba", position="Director & Founder", chapter="Executive Board"),
                LeadershipMember(id=2, name="Kiren Acharya", position="Overall Gen Sec", chapter="Executive Board"),
                LeadershipMember(id=3, name="Pratik Thaomung", position="President", chapter="Delhi Chapter"),
                LeadershipMember(id=4, name="Lanchenbi Urungpurel", position="Vice President", chapter="Delhi Chapter"),
                LeadershipMember(id=5, name="Krishanu Pratim Medhi", position="General Secretary", chapter="Delhi Chapter"),
                LeadershipMember(id=6, name="Boaz Lepcha", position="Joint Secretary", chapter="Delhi Chapter"),
                LeadershipMember(id=7, name="Michi Sheela", position="Joint Secretary", chapter="Delhi Chapter"),
                LeadershipMember(id=8, name="Pema Khandu Thungon", position="Convenor", chapter="Delhi Chapter"),
                LeadershipMember(id=9, name="Tashi Chotton", position="Delhi Chapter Coordinator", chapter="Delhi Chapter"),
                LeadershipMember(id=10, name="Shomwang Wangnao", position="President", chapter="Nagaland Chapter"),
                LeadershipMember(id=11, name="S. Birila Brianna", position="Vice President & Legal Advisor", chapter="Nagaland Chapter"),
                LeadershipMember(id=12, name="Mangam Walem", position="Finance Incharge", chapter="Nagaland Chapter"),
                LeadershipMember(id=13, name="Tokheto", position="Media Secretary", chapter="Nagaland Chapter"),
                LeadershipMember(id=14, name="Manai Konyak", position="Technical Support Specialist", chapter="Nagaland Chapter"),
                LeadershipMember(id=15, name="Rajkumar Napoleon Singh", position="Core Member", chapter="Manipur Chapter"),
                LeadershipMember(id=16, name="Thongbam Aarti Chanu", position="Core Member", chapter="Manipur Chapter"),
                LeadershipMember(id=17, name="Komok Hassen", position="Core Member", chapter="Arunachal Chapter"),
                LeadershipMember(id=18, name="Kina Khishum", position="Core Member", chapter="Arunachal Chapter")
            ]
            db.add_all(members)
            db.commit()
            logger.info("Seeding complete leadership members finished.")
    except Exception as e:
        logger.error(f"Error seeding database: {str(e)}")
        db.rollback()
