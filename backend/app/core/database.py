from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings


def create_database_engine(database_url: str):
    url = make_url(database_url)
    if url.drivername in {"postgres", "postgresql"}:
        url = url.set(drivername="postgresql+psycopg")

    if url.get_backend_name() == "sqlite":
        return create_engine(url, connect_args={"check_same_thread": False})
    if url.drivername != "postgresql+psycopg":
        raise ValueError("DATABASE_URL must use SQLite or PostgreSQL with Psycopg")

    return create_engine(
        url,
        pool_pre_ping=True,
        pool_size=2,
        max_overflow=3,
        pool_recycle=300,
        hide_parameters=True,
        connect_args={
            "sslmode": url.query.get("sslmode", "require"),
            "connect_timeout": 15,
            # Compatible with PgBouncer's transaction pooling.
            "prepare_threshold": None,
        },
    )


engine = create_database_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def initialize_database():
    """Use Neon's direct connection for DDL, pooled connection for app queries."""
    schema_engine = (
        create_database_engine(settings.DATABASE_URL_UNPOOLED)
        if engine.dialect.name == "postgresql" and settings.DATABASE_URL_UNPOOLED
        else engine
    )
    try:
        Base.metadata.create_all(bind=schema_engine)
    finally:
        if schema_engine is not engine:
            schema_engine.dispose()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
