-- Personal Tutor Bot Database Schema

CREATE DATABASE IF NOT EXISTS personal_tutor_bot;
USE personal_tutor_bot;

-- Students table
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 4 AND 9),
    learning_style ENUM('visual', 'auditory', 'kinesthetic', 'read_write') DEFAULT 'visual',
    weak_subjects JSON,
    learning_goals TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_grade (grade_level)
);

-- Curricula table
CREATE TABLE curricula (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_weeks INT DEFAULT 8,
    curriculum_data JSON NOT NULL,
    ai_generated_prompt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_student (student_id)
);

-- Weekly plans table
CREATE TABLE weekly_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    curriculum_id INT NOT NULL,
    week_number INT NOT NULL,
    focus_areas JSON,
    daily_breakdown JSON,
    learning_objectives JSON,
    resources_needed JSON,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (curriculum_id) REFERENCES curricula(id) ON DELETE CASCADE,
    UNIQUE KEY unique_week (curriculum_id, week_number),
    INDEX idx_curriculum (curriculum_id)
);

-- Progress logs table
CREATE TABLE progress_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    weekly_plan_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    proficiency_score FLOAT CHECK (proficiency_score BETWEEN 0 AND 100),
    time_spent_minutes INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (weekly_plan_id) REFERENCES weekly_plans(id) ON DELETE CASCADE,
    INDEX idx_student_progress (student_id),
    INDEX idx_week_progress (weekly_plan_id)
);

-- Chat sessions table
CREATE TABLE chat_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    session_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_student_chat (student_id)
);

-- Chat messages table
CREATE TABLE chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    content TEXT NOT NULL,
    is_user BOOLEAN NOT NULL,
    message_type VARCHAR(50),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- Insert sample data
INSERT INTO students (email, hashed_password, full_name, grade_level, learning_style, weak_subjects, learning_goals) VALUES
('demo@student.com', '$2b$12$examplehash', 'Demo Student', 7, 'visual', '["Mathematics", "Science"]', 'Improve math problem-solving skills and science concepts');