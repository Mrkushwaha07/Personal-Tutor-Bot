# 🎓 Personal Tutor Bot - AI-Powered Learning Companion

## 📖 What is This Project?

Imagine having a personal tutor available 24/7 that understands your learning style and helps you master any subject. That's exactly what Personal Tutor Bot is! It's an intelligent learning platform that uses AI to provide personalized tutoring, track your progress, and help you achieve your academic goals.

## ✨ What Can It Do?

### 🧠 Smart AI Tutoring
- **Personalized Learning**: Get explanations tailored to your grade level and learning style
- **Instant Help**: Ask questions anytime and get detailed, easy-to-understand answers
- **Adaptive Teaching**: The AI adjusts its teaching approach based on your needs

### 📊 Progress Tracking
- **Visual Dashboards**: See your learning journey with beautiful charts and graphs
- **Performance Insights**: Track completion rates, proficiency levels, and learning patterns
- **Achievement Monitoring**: Watch your improvement over time

### 🎯 Personalized Experience
- **Learning Style Adaptation**: Visual, auditory, reading/writing, or kinesthetic learners supported
- **Grade-Level Content**: Appropriate material for Elementary, Middle School, High School, or College
- **Custom Learning Paths**: Content that matches your current knowledge level

### 💬 Interactive Chat
- **Natural Conversations**: Chat with your AI tutor like you would with a human teacher
- **Context-Aware Help**: The tutor remembers what you're learning and provides relevant guidance
- **Step-by-Step Explanations**: Break down complex topics into manageable pieces

## 🚀 Quick Start Guide

### Option 1: Easy Docker Setup (Recommended for Beginners)

1. **Get the code:**
```bash
git clone https://github.com/your-username/personal-tutor-bot.git
cd personal-tutor-bot
```

2. **Set up your environment:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit the file and add your OpenAI API key
# Get a free API key from https://platform.openai.com/
```

3. **Start everything with one command:**
```bash
docker-compose up -d
```

4. **Open your browser and go to:**
   - 🌐 **Website**: http://localhost:3000
   - 📚 **API Documentation**: http://localhost:8000/docs

### Option 2: Manual Setup (For Developers)

**Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://postgres:password@localhost:5432/tutor_bot"
export OPENAI_API_KEY="your-api-key-here"

# Start the backend server
uvicorn app.main:app --reload
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ What's Inside the Project?

### 🎨 Frontend (What You See)
- **Modern React App** with beautiful, responsive design
- **Interactive Charts** to visualize your learning progress
- **Real-time Chat Interface** for talking with your AI tutor
- **Mobile-Friendly** design that works on all devices

### ⚙️ Backend (The Brain)
- **FastAPI** - High-performance Python framework
- **PostgreSQL Database** - Secure data storage
- **JWT Authentication** - Safe and secure login system
- **OpenAI Integration** - Powers the intelligent tutoring
- **RESTful API** - Clean and well-documented interfaces

### 🗄️ Database (Your Learning Memory)
- **Student Profiles** - Your personal information and preferences
- **Progress Tracking** - Every lesson completed and skill mastered
- **Curriculum Content** - Learning materials organized by subject and level
- **Learning Sessions** - History of all your tutoring sessions

## 📱 How to Use the App

### 1. **Get Started**
   - Create your free account
   - Tell us your grade level and how you learn best
   - Choose your subjects of interest

### 2. **Start Learning**
   - Use the chat to ask questions about any topic
   - "Can you explain photosynthesis?"
   - "Help me solve this algebra problem"
   - "What's the difference between atoms and molecules?"

### 3. **Track Your Progress**
   - Check your dashboard to see improvement over time
   - View completed lessons and subjects mastered
   - Get suggestions for what to learn next

### 4. **Continue Growing**
   - Return anytime to pick up where you left off
   - The AI tutor remembers your previous sessions
   - Challenge yourself with more advanced topics

## 🐛 Troubleshooting Common Issues

### "I can't start the application"
```bash
# Check if all services are running
docker ps

# View error logs
docker-compose logs

# Restart everything
docker-compose down && docker-compose up -d
```

### "The AI tutor isn't responding"
- Make sure you added your OpenAI API key to the `.env` file
- Check that the API key has sufficient credits
- Verify your internet connection

### "I'm getting database errors"
```bash
# Reset the database
docker-compose down -v
docker-compose up -d
```

### "The website won't load"
- Ensure frontend is running on http://localhost:3000
- Check that backend is running on http://localhost:8000
- Try clearing your browser cache

## 🎯 Who Is This For?

### 👨‍🎓 Students
- Get homework help anytime
- Prepare for tests with personalized study plans
- Understand difficult concepts with patient explanations

### 👩‍🏫 Teachers
- Provide additional support to students
- Track student progress and identify areas needing help
- Offer personalized learning paths

### 🧠 Lifelong Learners
- Learn new subjects at your own pace
- Get expert explanations without expensive tutors
- Track your learning journey over time

## 🔧 Advanced Features for Developers

### API Endpoints Available:
```
POST /auth/register     # Create new account
POST /auth/login        # Login to existing account
GET  /students/me       # Get current user info
POST /students/progress # Update learning progress
GET  /analytics/progress-summary # Get learning analytics
```

### Example API Usage:
```python
import requests

# Login
response = requests.post("http://localhost:8000/auth/login", 
    data={"username": "student@example.com", "password": "yourpassword"})
token = response.json()["access_token"]

# Get progress
headers = {"Authorization": f"Bearer {token}"}
progress = requests.get("http://localhost:8000/students/progress", headers=headers)
```

## 🌟 Why This Project Stands Out

### ✅ **Always Available**
No appointments needed - learn whenever inspiration strikes

### ✅ **Patient and Encouraging**
The AI tutor never gets frustrated and always provides positive reinforcement

### ✅ **Personalized Approach**
Adapts to your unique learning style and pace

### ✅ **Comprehensive Tracking**
Watch your knowledge grow with detailed progress analytics

### ✅ **Completely Free**
Open source means no subscription fees or hidden costs

## 🛣️ Roadmap - What's Coming Next

- [ ] **Multi-language Support** - Learn in your native language
- [ ] **Voice Interactions** - Talk to your tutor naturally
- [ ] **Subject Specializations** - Advanced topics in STEM, humanities, etc.
- [ ] **Collaborative Learning** - Study groups with other students
- [ ] **Mobile App** - Learn on the go with native mobile applications

## 🤝 Want to Contribute?

We love community contributions! Whether you're a developer, designer, educator, or just passionate about learning, there are many ways to help:

- **Report bugs** or suggest new features
- **Improve documentation** or translate content
- **Add new subjects** to the curriculum
- **Enhance the AI** teaching capabilities
- **Create better visuals** or UI improvements

Check out our `CONTRIBUTING.md` file for guidelines.

## 📞 Need Help?

- **📚 Documentation**: Check the `/docs` folder for detailed guides
- **🐛 Issues**: Report problems on our GitHub Issues page
- **💬 Discussions**: Join the conversation in our community forum
- **📧 Email**: Reach out to our team at support@tutorbot.com

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details. That means you're free to use, modify, and distribute this software for any purpose.

---

**Ready to start your learning journey?** 🚀

Visit http://localhost:3000 after setup and meet your new personal AI tutor! Whether you're struggling with homework, preparing for exams, or just curious about the world, we're here to help you learn better and smarter.

*"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela*