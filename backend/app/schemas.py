from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from .models import LearningStyle

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    student_id: int

class TokenData(BaseModel):
    email: Optional[str] = None

# Student Schemas
class StudentBase(BaseModel):
    email: EmailStr
    full_name: str
    grade_level: int
    learning_style: LearningStyle
    weak_subjects: List[str]
    learning_goals: Optional[str] = None

class StudentCreate(StudentBase):
    password: str

class Student(StudentBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    grade_level: Optional[int] = None
    learning_style: Optional[LearningStyle] = None
    weak_subjects: Optional[List[str]] = None
    learning_goals: Optional[str] = None

# Curriculum Schemas
class CurriculumBase(BaseModel):
    title: str
    description: Optional[str] = None

class CurriculumCreate(CurriculumBase):
    pass

class Curriculum(CurriculumBase):
    id: int
    student_id: int
    duration_weeks: int
    curriculum_data: Dict[str, Any]
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

# Weekly Plan Schemas
class WeeklyPlanBase(BaseModel):
    week_number: int
    focus_areas: List[str]
    daily_breakdown: Dict[str, Any]
    learning_objectives: List[str]
    resources_needed: List[str]
    completed: bool = False

class WeeklyPlanCreate(WeeklyPlanBase):
    curriculum_id: int

class WeeklyPlan(WeeklyPlanBase):
    id: int
    curriculum_id: int

    class Config:
        from_attributes = True

class CurriculumWithWeeks(Curriculum):
    weekly_plans: List[WeeklyPlan] = []

# Progress Tracking Schemas
class ProgressLogBase(BaseModel):
    subject: str
    topic: str
    proficiency_score: Optional[float] = None
    time_spent_minutes: int = 0
    completed: bool = False
    feedback: Optional[str] = None

class ProgressLogCreate(ProgressLogBase):
    weekly_plan_id: int

class ProgressLog(ProgressLogBase):
    id: int
    student_id: int
    weekly_plan_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Chat Schemas
class ChatMessageBase(BaseModel):
    content: str
    is_user: bool
    message_type: Optional[str] = None
    message_metadata: Optional[Dict[str, Any]] = None  # Fixed: renamed from metadata

class ChatMessageCreate(ChatMessageBase):
    session_id: int

class ChatMessage(ChatMessageBase):
    id: int
    session_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ChatSessionBase(BaseModel):
    session_title: Optional[str] = None

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id: int
    student_id: int
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessage] = []

    class Config:
        from_attributes = True

# Analytics & Dashboard Schemas
class SubjectBreakdown(BaseModel):
    total_time: int
    completed: int
    total: int
    average_score: float

class ProgressAnalytics(BaseModel):
    total_study_time: int
    average_proficiency: float
    completed_topics: int
    total_topics: int
    subject_breakdown: Dict[str, SubjectBreakdown]
    weekly_progress: List[Dict[str, Any]] = []

class DashboardStats(BaseModel):
    total_study_time: int
    average_proficiency: float
    completed_topics: int
    total_topics: int
    current_week: int
    curriculum_progress: float

# AI & Curriculum Generation Schemas
class AICurriculumRequest(BaseModel):
    grade_level: int
    learning_style: LearningStyle
    weak_subjects: List[str]
    learning_goals: Optional[str] = None

class AIChatRequest(BaseModel):
    message: str
    session_id: Optional[int] = None
    student_context: Optional[Dict[str, Any]] = None

class AIChatResponse(BaseModel):
    response: str
    session_id: int
    message_id: int

class PracticeQuestionRequest(BaseModel):
    topic: str
    difficulty: str = "medium"

class PracticeQuestion(BaseModel):
    question: str
    options: Dict[str, str]
    correct_answer: str
    explanation: str
    hint: str

# Response Schemas
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None

# Health Check Schema
class HealthCheck(BaseModel):
    status: str
    database: str
    version: str
    timestamp: datetime

# Export all schemas for easy import
__all__ = [
    # Authentication
    "Token", "TokenData",
    
    # Student
    "Student", "StudentCreate", "StudentUpdate", "StudentBase",
    
    # Curriculum
    "Curriculum", "CurriculumCreate", "CurriculumBase", "CurriculumWithWeeks",
    
    # Weekly Plans
    "WeeklyPlan", "WeeklyPlanCreate", "WeeklyPlanBase",
    
    # Progress Tracking
    "ProgressLog", "ProgressLogCreate", "ProgressLogBase",
    
    # Chat
    "ChatSession", "ChatSessionCreate", "ChatSessionBase",
    "ChatMessage", "ChatMessageCreate", "ChatMessageBase",
    
    # Analytics
    "ProgressAnalytics", "DashboardStats", "SubjectBreakdown",
    
    # AI
    "AICurriculumRequest", "AIChatRequest", "AIChatResponse", 
    "PracticeQuestionRequest", "PracticeQuestion",
    
    # Responses
    "SuccessResponse", "ErrorResponse", "HealthCheck"
]