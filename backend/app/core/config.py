from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_mail import ConnectionConfig

class Settings(BaseSettings):
    PROJECT_NAME: str = "NEASW Welfare Foundation API"
    API_V1_STR: str = "/api"
    CORS_ORIGINS: list[str] = ["*"]

    # FastAPI-Mail / Zoho SMTP configuration
    MAIL_USERNAME: str = "neaswsubmission@zohomail.in"
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "neaswsubmission@zohomail.in"
    MAIL_FROM_NAME: str = "NEASW Submission"
    MAIL_SERVER: str = "smtp.zoho.in"
    MAIL_PORT: int = 465
    MAIL_STARTTLS: bool = False
    MAIL_SSL_TLS: bool = True
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    MAIL_TO_ADMIN: str = "neaswsubmission@zohomail.in"


    model_config = SettingsConfigDict(
        env_file=".env",
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

