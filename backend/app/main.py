from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, get_db
from . import models
from .routers import students, curriculum, analytics, chat, auth
from .config import settings

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Personal Tutor Bot API",
    description="AI-powered educational platform for personalized learning",
    version="1.0.0"
)

# CORS middleware - FIXED: Use the property method
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,  # Use the property method
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(curriculum.router, prefix="/curriculum", tags=["curriculum"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Personal Tutor Bot API", "status": "active"}

@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Test database connection
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail="Service unavailable")