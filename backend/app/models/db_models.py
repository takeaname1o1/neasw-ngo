from sqlalchemy import Column, Integer, String, JSON, DateTime
from datetime import datetime
from app.core.database import Base

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    organization_name = Column(String, nullable=True)
    preferred_date = Column(String, nullable=True)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class LeadershipMember(Base):
    __tablename__ = "leadership_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    chapter = Column(String, nullable=False)

class VolunteerPlan(Base):
    __tablename__ = "volunteer_plans"

    id = Column(Integer, primary_key=True, index=True)
    duration_months = Column(Integer, unique=True, nullable=False)
    title = Column(String, nullable=False)
    features = Column(JSON, nullable=False)
