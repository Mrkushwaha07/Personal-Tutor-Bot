from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "mysql+pymysql://tutor_user:tutor_pass@database:3306/personal_tutor_bot"
    
    # Security
    SECRET_KEY: str = "your-super-secure-secret-key-change-this-in-production-2024"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # OpenAI
    OPENAI_API_KEY: str = "your-actual-openai-api-key-here"
    
    # CORS - Fix: Handle as comma-separated string
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173"
    
    # App
    DEBUG: bool = True
    
    # Method to get CORS origins as list
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"

settings = Settings()