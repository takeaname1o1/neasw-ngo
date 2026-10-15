from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_mail import ConnectionConfig

BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_DIR = BACKEND_DIR.parent


class Settings(BaseSettings):
    PROJECT_NAME: str = "NEASW Welfare Foundation API"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = f"sqlite:///{BACKEND_DIR / 'neasw.db'}"
    DATABASE_URL_UNPOOLED: str | None = None
    MAIL_ENABLED: bool = True
    CORS_ORIGINS: list[str] = [
        "*",
        "https://neaswwelfarefoundation.in",
        "https://www.neaswwelfarefoundation.in",
        "http://localhost:3000",
        "http://localhost:5173"
    ]


    # FastAPI-Mail / Zoho SMTP configuration
    MAIL_USERNAME: str = "neaswsubmission@zohomail.in"
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "neaswsubmission@zohomail.in"
    MAIL_FROM_NAME: str = "NEASW Submission"
    MAIL_SERVER: str = "smtp.zoho.in"
    MAIL_PORT: int = 587
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    MAIL_TO_ADMIN: str = "neaswsubmission@zohomail.in"



    model_config = SettingsConfigDict(
        # Neon pulls to the project root; backend-specific files override it.
        # Process environment (including Render settings) takes precedence.
        env_file=(
            PROJECT_DIR / ".env",
            PROJECT_DIR / ".env.local",
            BACKEND_DIR / ".env",
            BACKEND_DIR / ".env.local",
        ),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    def get_mail_config(self) -> ConnectionConfig:
        return ConnectionConfig(
            MAIL_USERNAME=self.MAIL_USERNAME,
            MAIL_PASSWORD=self.MAIL_PASSWORD,
            MAIL_FROM=self.MAIL_FROM,
            MAIL_FROM_NAME=self.MAIL_FROM_NAME,
            MAIL_SERVER=self.MAIL_SERVER,
            MAIL_PORT=self.MAIL_PORT,
            MAIL_STARTTLS=self.MAIL_STARTTLS,
            MAIL_SSL_TLS=self.MAIL_SSL_TLS,
            USE_CREDENTIALS=self.USE_CREDENTIALS,
            VALIDATE_CERTS=self.VALIDATE_CERTS,
        )

settings = Settings()
