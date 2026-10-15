from pathlib import Path
from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_mail import ConnectionConfig
from pydantic import SecretStr, Field
from dotenv import dotenv_values

BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_DIR = BACKEND_DIR.parent


class Settings(BaseSettings):
    PROJECT_NAME: str = "NEASW Welfare Foundation API"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = f"sqlite:///{BACKEND_DIR / 'neasw.db'}"
    DATABASE_URL_UNPOOLED: str | None = None
    MAIL_ENABLED: bool = True
    MAIL_PROVIDER: Literal["brevo", "smtp"] = "brevo"
    BREVO_API_KEY: SecretStr = SecretStr("")
    ADMIN_USERNAME: str = ""
    ADMIN_PASSWORD: SecretStr = SecretStr("")
    ADMIN_COOKIE_SECURE: bool = True
    ADMIN_SESSION_SECONDS: int = Field(default=28800, ge=300, le=86400)
    CORS_ORIGINS: list[str] = [
        "https://neaswwelfarefoundation.in",
        "https://www.neaswwelfarefoundation.in",
        "http://localhost:3000",
        "http://localhost:5173"
    ]


    # Shared sender settings and optional legacy SMTP configuration.
    MAIL_USERNAME: str = "neaswsubmission@zohomail.in"
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "notifications@neaswwelfarefoundation.in"
    MAIL_FROM_NAME: str = "NEASW Welfare Foundation"
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

    def admin_credentials(self) -> tuple[str, str]:
        # Legacy USER is read from dotenv files only: the OS also defines USER.
        legacy = {}
        for path in self.model_config["env_file"]:
            if Path(path).is_file():
                legacy.update(dotenv_values(path))
        return (
            self.ADMIN_USERNAME or legacy.get("USER") or "",
            self.ADMIN_PASSWORD.get_secret_value() or legacy.get("PASSWORD") or "",
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
