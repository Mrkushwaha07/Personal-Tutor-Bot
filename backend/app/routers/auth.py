from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from ..database import get_db
from .. import models, schemas
from ..auth import authenticate_user, create_access_token, get_current_user
from ..config import settings

router = APIRouter()

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "student_id": user.id
    }

@router.post("/register", response_model=schemas.Student)
async def register_student(
    student_data: schemas.StudentCreate,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_student = db.query(models.Student).filter(
        models.Student.email == student_data.email
    ).first()
    
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new student
    from ..auth import get_password_hash
    hashed_password = get_password_hash(student_data.password)
    
    db_student = models.Student(
        email=student_data.email,
        hashed_password=hashed_password,
        full_name=student_data.full_name,
        grade_level=student_data.grade_level,
        learning_style=student_data.learning_style,
        weak_subjects=student_data.weak_subjects,
        learning_goals=student_data.learning_goals
    )
    
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    
    return db_student

@router.get("/me", response_model=schemas.Student)
async def read_current_user(
    current_user: models.Student = Depends(get_current_user)
):
    return current_user