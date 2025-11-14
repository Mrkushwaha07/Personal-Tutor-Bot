from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas, crud
from ..auth import get_current_user
from ..ai_utils import ai_tutor

router = APIRouter()

@router.post("/generate", response_model=schemas.Curriculum)
async def generate_curriculum(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    """Generate personalized curriculum using AI"""
    
    # Prepare student data for AI
    student_data = {
        "grade_level": current_user.grade_level,
        "learning_style": current_user.learning_style,
        "weak_subjects": current_user.weak_subjects or [],
        "learning_goals": current_user.learning_goals or ""
    }
    
    try:
        # Generate curriculum using AI
        curriculum_data = await ai_tutor.generate_curriculum(student_data)
        
        # Save to database
        curriculum = crud.create_curriculum(
            db=db,
            curriculum_data=curriculum_data,
            student_id=current_user.id
        )
        
        return curriculum
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate curriculum: {str(e)}"
        )

@router.get("/", response_model=List[schemas.Curriculum])
async def get_student_curricula(
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    """Get all curricula for current student"""
    return crud.get_student_curricula(db, current_user.id)

@router.get("/{curriculum_id}", response_model=schemas.CurriculumWithWeeks)
async def get_curriculum_detail(
    curriculum_id: int,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    """Get detailed curriculum with weekly plans"""
    curriculum = crud.get_curriculum_with_weeks(db, curriculum_id, current_user.id)
    if not curriculum:
        raise HTTPException(status_code=404, detail="Curriculum not found")
    return curriculum