from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .database import get_db
from . import models
from .auth import get_current_user

async def get_current_active_user(
    current_user: models.Student = Depends(get_current_user)
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def verify_curriculum_access(
    curriculum_id: int,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_active_user)
):
    curriculum = db.query(models.Curriculum).filter(
        models.Curriculum.id == curriculum_id,
        models.Curriculum.student_id == current_user.id
    ).first()
    if not curriculum:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Curriculum not found"
        )
    return curriculum