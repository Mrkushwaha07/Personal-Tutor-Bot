from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import models, schemas, crud
from ..auth import get_current_user
from ..ai_utils import ai_tutor

router = APIRouter()

@router.post("/sessions", response_model=schemas.ChatSession)
async def create_chat_session(
    session_data: dict,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    db_session = models.ChatSession(
        student_id=current_user.id,
        session_title=session_data.get('session_title', 'Learning Session')
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.get("/sessions", response_model=List[schemas.ChatSession])
async def get_chat_sessions(
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    return db.query(models.ChatSession).filter(
        models.ChatSession.student_id == current_user.id
    ).order_by(models.ChatSession.updated_at.desc()).all()

@router.post("/message")
async def send_chat_message(
    message_data: dict,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    # Create message in database
    db_message = models.ChatMessage(
        session_id=message_data['session_id'],
        content=message_data['content'],
        is_user=True,
        message_type='question'
    )
    db.add(db_message)
    
    # Get AI response
    response = await ai_tutor.chat_assistance(
        message_data['content'],
        message_data.get('student_context', {})
    )
    
    # Save AI response
    ai_message = models.ChatMessage(
        session_id=message_data['session_id'],
        content=response,
        is_user=False,
        message_type='explanation'
    )
    db.add(ai_message)
    
    db.commit()
    
    return {"response": response}

@router.post("/practice-question")
async def generate_practice_question(
    question_data: dict,
    db: Session = Depends(get_db)
):
    question = await ai_tutor.generate_practice_question(
        question_data['topic'],
        question_data.get('difficulty', 'medium')
    )
    return question