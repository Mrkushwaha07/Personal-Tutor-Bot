import openai
import json
from typing import Dict, List, Any
from .config import settings
from .models import LearningStyle

openai.api_key = settings.OPENAI_API_KEY

class AITutor:
    def __init__(self):
        self.client = openai

    async def generate_curriculum(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized 8-week curriculum using GPT"""
        
        prompt = self._build_curriculum_prompt(student_data)
        
        try:
            response = await self.client.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert educational curriculum designer for grades 4-9."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            curriculum_text = response.choices[0].message.content
            return self._parse_curriculum_response(curriculum_text, student_data)
            
        except Exception as e:
            raise Exception(f"AI curriculum generation failed: {str(e)}")

    def _build_curriculum_prompt(self, student_data: Dict[str, Any]) -> str:
        """Build detailed prompt for curriculum generation"""
        
        learning_style_map = {
            LearningStyle.VISUAL: "visual aids, diagrams, videos",
            LearningStyle.AUDITORY: "explanations, discussions, audio materials",
            LearningStyle.KINESTHETIC: "hands-on activities, experiments, physical examples",
            LearningStyle.READ_WRITE: "reading materials, writing exercises, notes"
        }
        
        learning_preferences = learning_style_map.get(
            student_data.get('learning_style', LearningStyle.VISUAL),
            "varied teaching methods"
        )

        prompt = f"""
        Create a comprehensive 8-week personalized study plan for a grade {student_data['grade_level']} student.

        STUDENT PROFILE:
        - Grade Level: {student_data['grade_level']}
        - Learning Style: {student_data['learning_style'].value}
        - Weak Subjects: {', '.join(student_data['weak_subjects'])}
        - Learning Goals: {student_data.get('learning_goals', 'Improve overall academic performance')}
        - Preferred Methods: {learning_preferences}

        CURRICULUM REQUIREMENTS:
        - 8-week duration with weekly focus areas
        - Daily breakdown (Monday-Friday, 60-90 minutes daily)
        - Include {', '.join(student_data['weak_subjects'])} as primary focus
        - Balance with reinforcement of strong subjects
        - Progressive difficulty (simple to complex)
        - Include practice exercises and assessments
        - Incorporate {learning_preferences} for engagement

        RESPONSE FORMAT (JSON):
        {{
            "title": "Personalized Learning Curriculum",
            "description": "Overview of the curriculum",
            "weekly_plans": [
                {{
                    "week_number": 1,
                    "focus_areas": ["subject1", "subject2"],
                    "learning_objectives": ["objective1", "objective2"],
                    "daily_breakdown": {{
                        "monday": {{"subject": "Math", "topic": "Basic Arithmetic", "activities": [...]}},
                        "tuesday": {{"subject": "Science", "topic": "Introduction to Biology", "activities": [...]}},
                        // ... rest of the week
                    }},
                    "resources_needed": ["textbook1", "online_resource2"]
                }}
            ]
        }}

        Make it engaging, age-appropriate, and effective for knowledge retention.
        """
        return prompt

    def _parse_curriculum_response(self, response_text: str, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse AI response into structured curriculum data"""
        try:
            # Extract JSON from response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            json_str = response_text[start_idx:end_idx]
            curriculum_data = json.loads(json_str)
            
            # Add metadata
            curriculum_data['student_metadata'] = {
                'grade_level': student_data['grade_level'],
                'learning_style': student_data['learning_style'].value,
                'weak_subjects': student_data['weak_subjects']
            }
            
            return curriculum_data
            
        except json.JSONDecodeError:
            # Fallback: create basic structure
            return self._create_fallback_curriculum(student_data)

    def _create_fallback_curriculum(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a basic curriculum if AI fails"""
        return {
            "title": f"Grade {student_data['grade_level']} Personalized Curriculum",
            "description": f"Focus on improving {', '.join(student_data['weak_subjects'])}",
            "weekly_plans": [
                {
                    "week_number": i + 1,
                    "focus_areas": student_data['weak_subjects'],
                    "learning_objectives": [f"Master basic concepts in {subject}" for subject in student_data['weak_subjects']],
                    "daily_breakdown": {
                        day: {
                            "subject": subject,
                            "topic": f"Introduction to {subject}",
                            "activities": ["Reading", "Practice problems", "Review"]
                        } for day, subject in zip(
                            ["monday", "tuesday", "wednesday", "thursday", "friday"],
                            student_data['weak_subjects'] * 2
                        )
                    },
                    "resources_needed": ["Textbooks", "Online resources", "Practice worksheets"]
                } for i in range(8)
            ]
        }

    async def generate_practice_question(self, topic: str, difficulty: str = "medium") -> Dict[str, Any]:
        """Generate practice questions using AI"""
        
        prompt = f"""
        Create a {difficulty} difficulty practice question about {topic} for middle school students.
        
        Include:
        - A clear question
        - Multiple choice options (A, B, C, D)
        - Detailed explanation of the correct answer
        - Hint for struggling students
        
        Format as JSON:
        {{
            "question": "question text",
            "options": {{
                "A": "option A",
                "B": "option B", 
                "C": "option C",
                "D": "option D"
            }},
            "correct_answer": "A",
            "explanation": "detailed explanation",
            "hint": "helpful hint"
        }}
        """
        
        try:
            response = await self.client.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful tutor creating educational content."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=500
            )
            
            question_text = response.choices[0].message.content
            return json.loads(question_text[question_text.find('{'):question_text.rfind('}')+1])
            
        except Exception as e:
            raise Exception(f"Failed to generate practice question: {str(e)}")

    async def chat_assistance(self, message: str, context: Dict[str, Any]) -> str:
        """Provide AI tutoring assistance"""
        
        context_str = json.dumps(context, indent=2)
        
        prompt = f"""
        You are a friendly, patient tutor for grade {context.get('grade_level', 6)} students.
        
        Student Context:
        {context_str}
        
        Current Question: {message}
        
        Provide:
        - Clear, age-appropriate explanation
        - Step-by-step guidance if it's a problem
        - Encouraging tone
        - Related examples if helpful
        - Ask follow-up questions to check understanding
        
        Keep responses under 300 words.
        """
        
        try:
            response = await self.client.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert tutor who explains concepts clearly and patiently."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            return f"I'm having trouble responding right now. Please try again later. Error: {str(e)}"

# Global AI tutor instance
ai_tutor = AITutor()