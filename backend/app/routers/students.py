from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas, crud
from ..auth import get_current_user

router = APIRouter()

@router.get("/{student_id}", response_model=schemas.Student)
async def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    if current_user.id != student_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this student")
    
    student = crud.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.put("/{student_id}", response_model=schemas.Student)
async def update_student(
    student_id: int,
    student_update: schemas.StudentBase,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    if current_user.id != student_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this student")
    
    # Update student fields
    for field, value in student_update.dict().items():
        setattr(current_user, field, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user