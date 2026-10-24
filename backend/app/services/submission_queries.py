"""Shared dashboard/export filtering; dates describe UTC calendar days."""
from datetime import date, datetime, time, timedelta

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.db_models import ContactSubmission


def submission_query(db: Session, search: str = "", date_from: date | None = None,
                     date_to: date | None = None):
    if date_from and date_to and date_from > date_to:
        raise HTTPException(422, "Start date must be on or before end date")
    if date_to == date.max:
        raise HTTPException(422, "End date must be earlier than 9999-12-31")
    query = db.query(ContactSubmission)
    if search.strip():
        pattern = f"%{search.strip()}%"
        query = query.filter(or_(*(column.ilike(pattern) for column in (
            ContactSubmission.name, ContactSubmission.email, ContactSubmission.phone_number,
            ContactSubmission.organization_name, ContactSubmission.message))))
    if date_from:
        query = query.filter(ContactSubmission.created_at >= datetime.combine(date_from, time.min))
    if date_to:
        query = query.filter(ContactSubmission.created_at < datetime.combine(date_to + timedelta(days=1), time.min))
    return query.order_by(ContactSubmission.created_at.desc(), ContactSubmission.id.desc())
