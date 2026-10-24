"""Read-only administration with opaque, revocable process-local sessions."""
from datetime import date, datetime, timedelta, timezone
from functools import lru_cache
import hashlib
import hmac
import secrets

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.core.admin_security import AdminSession, admin_security
from app.services.submission_queries import submission_query
from app.services.export_service import ExportResponse, generate_export

COOKIE = "neasw_admin_session"
COOKIE_PATH = "/api/admin"


def now():
    return datetime.now(timezone.utc).replace(tzinfo=None)


def browser_guard(request: Request):
    # This non-simple header requires CORS preflight from another origin.
    if request.headers.get("x-admin-request") != "1":
        raise HTTPException(403, "Invalid admin request")
    origin = request.headers.get("origin")
    if origin and origin not in settings.CORS_ORIGINS:
        raise HTTPException(403, "Origin is not allowed")


router = APIRouter(dependencies=[Depends(browser_guard)])


@lru_cache(maxsize=1)
def credential_key(username: str, password: str) -> bytes:
    return hashlib.scrypt(password.encode(), salt=hashlib.sha256(username.encode()).digest(),
                          n=16384, r=8, p=1)


def configured_credentials():
    username, password = settings.admin_credentials()
    if not username or not password:
        raise HTTPException(503, "Admin login is not configured")
    return username, password


def session_tag(token_hash: str):
    username, password = configured_credentials()
    return hmac.new(credential_key(username, password), token_hash.encode(), hashlib.sha256).hexdigest()


def require_admin(request: Request):
    token = request.cookies.get(COOKIE, "")
    if not token or len(token) > 128:
        raise HTTPException(401, "Please sign in")
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    session = admin_security.get_session(token_hash, now())
    if (not session or session.expires_at <= now()
            or not hmac.compare_digest(session.credential_tag, session_tag(token_hash))):
        raise HTTPException(401, "Session expired. Please sign in again")
    return session


class LoginInput(BaseModel):
    username: str = Field(min_length=1, max_length=256)
    password: str = Field(min_length=1, max_length=1024)


@router.post("/login")
def login(data: LoginInput, request: Request, response: Response):
    username, password = configured_credentials()
    current = now()
    # Do not trust a caller-supplied X-Forwarded-For header here.
    client = request.client.host if request.client else "unknown"
    client_hash = hashlib.sha256(client.encode()).hexdigest()
    # Atomic process-local counters; single-worker deployment is required.
    if not admin_security.record_attempt(client_hash, current):
        raise HTTPException(429, "Too many login attempts. Try again in 15 minutes",
                            headers={"Retry-After": "900"})
    user_matches = hmac.compare_digest(data.username.encode(), username.encode())
    password_matches = hmac.compare_digest(
        credential_key(username, data.password), credential_key(username, password))
    if not (user_matches and password_matches):
        raise HTTPException(401, "Invalid username or password")
    previous = request.cookies.get(COOKIE, "")
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    expires = current + timedelta(seconds=settings.ADMIN_SESSION_SECONDS)
    admin_security.create_session(
        AdminSession(token_hash=token_hash, credential_tag=session_tag(token_hash), expires_at=expires),
        current, hashlib.sha256(previous.encode()).hexdigest() if previous else None,
    )
    response.set_cookie(COOKIE, token, max_age=settings.ADMIN_SESSION_SECONDS,
                        path=COOKIE_PATH, secure=settings.ADMIN_COOKIE_SECURE,
                        httponly=True, samesite="lax")
    return {"username": username, "expires_at": expires.replace(tzinfo=timezone.utc)}


@router.get("/session")
def get_session(session: AdminSession = Depends(require_admin)):
    return {"username": configured_credentials()[0],
            "expires_at": session.expires_at.replace(tzinfo=timezone.utc)}


@router.post("/logout")
def logout(request: Request, response: Response):
    token_hash = hashlib.sha256(request.cookies.get(COOKIE, "").encode()).hexdigest()
    admin_security.revoke_session(token_hash)
    response.delete_cookie(COOKIE, path=COOKIE_PATH, secure=settings.ADMIN_COOKIE_SECURE,
                           httponly=True, samesite="lax")
    return {"status": "signed_out"}


@router.get("/submissions")
def submissions(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100),
                search: str = Query("", max_length=200),
                date_from: date | None = None, date_to: date | None = None,
                session: AdminSession = Depends(require_admin), db: Session = Depends(get_db)):
    query = submission_query(db, search, date_from, date_to)
    total = query.order_by(None).count()
    rows = query.offset((page - 1) * page_size).limit(page_size).all()
    return {"items": [{"id": row.id, "name": row.name, "email": row.email,
                       "phone_number": row.phone_number, "organization_name": row.organization_name,
                       "preferred_date": row.preferred_date, "message": row.message,
                       "created_at": row.created_at.replace(tzinfo=timezone.utc) if row.created_at else None}
                      for row in rows], "total": total, "page": page, "page_size": page_size}


@router.get("/submissions/export")
def export_submissions(search: str = Query("", max_length=200),
                       date_from: date | None = None, date_to: date | None = None,
                       session: AdminSession = Depends(require_admin), db: Session = Depends(get_db)):
    return ExportResponse(generate_export(db, search, date_from, date_to))
