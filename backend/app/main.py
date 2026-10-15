import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import router as api_router
from app.api.admin import router as admin_router
from app.core.database import initialize_database, SessionLocal
from app.core.database_seeder import seed_db
from app.services.email_service import EmailService

@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()
    # Trigger startup email notification asynchronously in the background
    asyncio.create_task(EmailService.send_startup_email())
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for the NEASW Welfare Foundation Website",
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
    return {"message": "Welcome to NEASW Welfare Foundation API. Visit /docs for OpenAPI documentation."}
