from pydantic import BaseModel, EmailStr
from typing import List, Literal, Optional

class ContactFormSubmit(BaseModel):
    submission_type: Literal["contact", "volunteer"] = "contact"
    name: str
    email: EmailStr
    phone_number: str
    organization_name: Optional[str] = None
    preferred_date: Optional[str] = None
    message: str

    @property
    def is_volunteer_registration(self) -> bool:
        if "submission_type" in self.model_fields_set:
            return self.submission_type == "volunteer"
        # Older cached Join forms predate the explicit submission_type field.
        organization = self.organization_name or ""
        return (
            organization.startswith("Volunteer Application (")
            and organization.endswith(")")
            and self.message.startswith("Registered interest for the ")
        )

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
