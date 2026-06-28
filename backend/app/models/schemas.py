from pydantic import BaseModel, EmailStr
from typing import List, Optional

class ContactFormSubmit(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    organization_name: Optional[str] = None
    preferred_date: Optional[str] = None
    message: str

class LeadershipMember(BaseModel):
    id: Optional[int] = None
    name: str
    position: str
    chapter: str

    class Config:
        from_attributes = True

class VolunteerPlan(BaseModel):
    id: Optional[int] = None
    duration_months: int
    title: str
    features: List[str]

    class Config:
        from_attributes = True
