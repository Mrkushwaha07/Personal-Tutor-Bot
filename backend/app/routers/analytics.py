from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas, crud
from ..auth import get_current_user

router = APIRouter()

@router.get("/progress", response_model=schemas.ProgressAnalytics)
async def get_student_progress(
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    analytics = crud.get_student_analytics(db, current_user.id)
    if not analytics:
        return {
            "total_study_time": 0,
            "average_proficiency": 0,
            "completed_topics": 0,
            "total_topics": 0,
            "subject_breakdown": {},
            "weekly_progress": []
        }
    return analytics

@router.post("/progress")
async def log_progress(
    progress_log: schemas.ProgressLogCreate,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    return crud.create_progress_log(db, progress_log, current_user.id)

@router.get("/progress/history")
async def get_progress_history(
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    return crud.get_student_progress(db, current_user.id)