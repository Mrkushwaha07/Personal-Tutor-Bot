from sqlalchemy.orm import Session
from typing import List, Optional
from . import models, schemas

# Student CRUD
def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_student_by_email(db: Session, email: str):
    return db.query(models.Student).filter(models.Student.email == email).first()

def create_student(db: Session, student: schemas.StudentCreate):
    from .auth import get_password_hash
    hashed_password = get_password_hash(student.password)
    db_student = models.Student(
        email=student.email,
        hashed_password=hashed_password,
        full_name=student.full_name,
        grade_level=student.grade_level,
        learning_style=student.learning_style,
        weak_subjects=student.weak_subjects,
        learning_goals=student.learning_goals
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Curriculum CRUD
def create_curriculum(db: Session, curriculum_data: dict, student_id: int):
    db_curriculum = models.Curriculum(
        student_id=student_id,
        title=curriculum_data.get('title', 'Personalized Curriculum'),
        description=curriculum_data.get('description', ''),
        curriculum_data=curriculum_data,
        duration_weeks=len(curriculum_data.get('weekly_plans', []))
    )
    db.add(db_curriculum)
    db.commit()
    db.refresh(db_curriculum)
    
    # Create weekly plans
    for week_data in curriculum_data.get('weekly_plans', []):
        db_weekly_plan = models.WeeklyPlan(
            curriculum_id=db_curriculum.id,
            week_number=week_data['week_number'],
            focus_areas=week_data['focus_areas'],
            daily_breakdown=week_data['daily_breakdown'],
            learning_objectives=week_data['learning_objectives'],
            resources_needed=week_data['resources_needed']
        )
        db.add(db_weekly_plan)
    
    db.commit()
    return db_curriculum

def get_student_curricula(db: Session, student_id: int):
    return db.query(models.Curriculum).filter(
        models.Curriculum.student_id == student_id,
        models.Curriculum.is_active == True
    ).all()

def get_curriculum_with_weeks(db: Session, curriculum_id: int, student_id: int):
    return db.query(models.Curriculum).filter(
        models.Curriculum.id == curriculum_id,
        models.Curriculum.student_id == student_id
    ).first()

# Progress CRUD
def create_progress_log(db: Session, progress_log: schemas.ProgressLogCreate, student_id: int):
    db_progress = models.ProgressLog(
        student_id=student_id,
        weekly_plan_id=progress_log.weekly_plan_id,
        subject=progress_log.subject,
        topic=progress_log.topic,
        proficiency_score=progress_log.proficiency_score,
        time_spent_minutes=progress_log.time_spent_minutes,
        completed=progress_log.completed,
        feedback=progress_log.feedback
    )
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

def get_student_progress(db: Session, student_id: int):
    return db.query(models.ProgressLog).filter(
        models.ProgressLog.student_id == student_id
    ).all()

# Analytics
def get_student_analytics(db: Session, student_id: int):
    progress_logs = get_student_progress(db, student_id)
    
    if not progress_logs:
        return None
    
    total_study_time = sum(log.time_spent_minutes for log in progress_logs)
    completed_topics = sum(1 for log in progress_logs if log.completed)
    total_topics = len(progress_logs)
    
    # Calculate average proficiency for completed topics
    completed_scores = [log.proficiency_score for log in progress_logs 
                       if log.completed and log.proficiency_score is not None]
    average_proficiency = sum(completed_scores) / len(completed_scores) if completed_scores else 0
    
    # Subject breakdown
    subject_breakdown = {}
    for log in progress_logs:
        if log.subject not in subject_breakdown:
            subject_breakdown[log.subject] = {
                'total_time': 0,
                'completed': 0,
                'total': 0,
                'average_score': 0
            }
        subject_breakdown[log.subject]['total_time'] += log.time_spent_minutes
        subject_breakdown[log.subject]['total'] += 1
        if log.completed:
            subject_breakdown[log.subject]['completed'] += 1
    
    # Calculate average scores per subject
    for subject in subject_breakdown:
        subject_scores = [log.proficiency_score for log in progress_logs 
                         if log.subject == subject and log.proficiency_score is not None]
        subject_breakdown[subject]['average_score'] = (
            sum(subject_scores) / len(subject_scores) if subject_scores else 0
        )
    
    return {
        'total_study_time': total_study_time,
        'average_proficiency': average_proficiency,
        'completed_topics': completed_topics,
        'total_topics': total_topics,
        'subject_breakdown': subject_breakdown
    }