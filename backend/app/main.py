import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.admin_logging import configure_admin_logging

from app.api.endpoints import router as api_router
from app.api.admin import router as admin_router
from app.core.database import initialize_database
from app.core.site_content import load_site_content
from app.services.email_service import EmailService

configure_admin_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.services.export_service import clean_stale_exports
    clean_stale_exports()
    initialize_database()
    load_site_content()
    # Trigger startup email notification asynchronously in the background
    asyncio.create_task(EmailService.send_startup_email())
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for the NorthEast Association for Social Welfare Website",
    version="1.0.0",
    lifespan=lifespan
)


# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=f"{settings.API_V1_STR}/admin")


@app.middleware("http")
async def private_admin_responses(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith(f"{settings.API_V1_STR}/admin"):
        response.headers["Cache-Control"] = "no-store"
        response.headers["Pragma"] = "no-cache"
        response.headers["X-Content-Type-Options"] = "nosniff"
    return response

@app.get("/")
async def root():
    return {"message": "Welcome to NorthEast Association for Social Welfare API. Visit /docs for OpenAPI documentation."}
