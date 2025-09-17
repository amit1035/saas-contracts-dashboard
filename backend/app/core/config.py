from typing import Any, Dict, Optional
from pydantic_settings import BaseSettings
from pydantic import field_validator

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "SaaS Contracts Dashboard"
    
    # Database
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DATABASE_URL: Optional[str] = None

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: Optional[str], info: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return f"postgresql://{info.data.get('POSTGRES_USER')}:{info.data.get('POSTGRES_PASSWORD')}@{info.data.get('POSTGRES_SERVER')}/{info.data.get('POSTGRES_DB')}"

    # JWT
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    model_config = {"env_file": ".env"}

settings = Settings()