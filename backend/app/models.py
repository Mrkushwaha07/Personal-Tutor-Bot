from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class LearningStyle(str, enum.Enum):
    VISUAL = "visual"
    AUDITORY = "auditory"
    KINESTHETIC = "kinesthetic"
    READ_WRITE = "read_write"

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    grade_level = Column(Integer, nullable=False)  # 4-9
    learning_style = Column(Enum(LearningStyle), default=LearningStyle.VISUAL)
    weak_subjects = Column(JSON)  # List of weak subjects
    learning_goals = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

    # Relationships
    curricula = relationship("Curriculum", back_populates="student")
    progress_logs = relationship("ProgressLog", back_populates="student")
    chat_sessions = relationship("ChatSession", back_populates="student")

class Curriculum(Base):
    __tablename__ = "curricula"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    duration_weeks = Column(Integer, default=8)
    curriculum_data = Column(JSON)  # Structured curriculum plan
    ai_generated_prompt = Column(Text)  # Prompt used to generate curriculum
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)

    # Relationships
    student = relationship("Student", back_populates="curricula")
    weekly_plans = relationship("WeeklyPlan", back_populates="curriculum")

class WeeklyPlan(Base):
    __tablename__ = "weekly_plans"

    id = Column(Integer, primary_key=True, index=True)
    curriculum_id = Column(Integer, ForeignKey("curricula.id"), nullable=False)
    week_number = Column(Integer, nullable=False)
    focus_areas = Column(JSON)  # Main topics for the week
    daily_breakdown = Column(JSON)  # Day-by-day schedule
    learning_objectives = Column(JSON)
    resources_needed = Column(JSON)
    completed = Column(Boolean, default=False)

    # Relationships
    curriculum = relationship("Curriculum", back_populates="weekly_plans")
    progress_logs = relationship("ProgressLog", back_populates="weekly_plan")

class ProgressLog(Base):
    __tablename__ = "progress_logs"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    weekly_plan_id = Column(Integer, ForeignKey("weekly_plans.id"), nullable=False)
    subject = Column(String(100), nullable=False)
    topic = Column(String(255), nullable=False)
    proficiency_score = Column(Float)  # 0-100
    time_spent_minutes = Column(Integer)
    completed = Column(Boolean, default=False)
    feedback = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    student = relationship("Student", back_populates="progress_logs")
    weekly_plan = relationship("WeeklyPlan", back_populates="progress_logs")

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    session_title = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    student = relationship("Student", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    content = Column(Text, nullable=False)
    is_user = Column(Boolean, nullable=False)  # True for student, False for AI
    message_type = Column(String(50))  # question, explanation, hint, etc.
    message_metadata = Column(JSON)  # FIXED: Additional context like topic, difficulty
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    session = relationship("ChatSession", back_populates="messages")