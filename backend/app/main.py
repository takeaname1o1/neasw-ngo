from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import router as api_router
from app.core.database import engine, Base, SessionLocal
from app.core.database_seeder import seed_db

# Create all database tables
Base.metadata.create_all(bind=engine)

# Seed database with initial default data
db = SessionLocal()
try:
    seed_db(db)
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for the NEASW Welfare Foundation Website",
    version="1.0.0"
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

@app.get("/")
async def root():
    return {"message": "Welcome to NEASW Welfare Foundation API. Visit /docs for OpenAPI documentation."}
