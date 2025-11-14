#  Personal Tutor Bot – Your Smart Learning Partner

##  What Is This Project?

Think of this as having your own personal teacher available anytime.
The **Personal Tutor Bot** is an AI-based learning system that explains lessons, tracks how well you're learning, and helps you reach your study goals.

##  What Can It Do?

###  Smart AI Tutoring

* **Explains topics in your style** (visual, auditory, etc.)
* **Answers your questions instantly**
* **Changes its teaching method** based on how you learn

###  Track Your Learning

* **Beautiful charts** showing your progress
* **Insights** about your strengths and weaknesses
* **Tracks your achievements** as you learn more

###  Personalized Learning

* Works for **all learning styles**
* Lets you choose **your grade level**
* Gives lessons **based on your current knowledge**

###  Chat with Your Tutor

* Chat naturally like talking to a real teacher
* The AI **remembers what you learned earlier**
* Explains tough concepts in simple steps

---

##  How to Start

### Option 1: Using Docker (Easiest Method)

1. **Download the project**

```bash
git clone https://github.com/your-username/personal-tutor-bot.git
cd personal-tutor-bot
```

2. **Set up environment**

```bash
cp .env.example .env
# Add your OpenAI API key inside this file
```

3. **Start the project**

```bash
docker-compose up -d
```

4. **Open in browser**

* Website → [http://localhost:3000](http://localhost:3000)
* API Docs → [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Manual Setup (Advanced / Developers)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

export DATABASE_URL="postgresql://postgres:password@localhost:5432/tutor_bot"
export OPENAI_API_KEY="your-api-key"

uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  What’s Inside?

###  Frontend (User Interface)

* Clean and modern React design
* Interactive progress charts
* Real-time AI chat
* Works on all devices

###  Backend (Server)

* Built with **FastAPI**
* **PostgreSQL** for storing data
* **JWT** for secure login
* **OpenAI** for intelligent replies
* Organized **REST APIs**

###  Database

Stores:

* User profiles
* Learning progress
* Subjects and topics
* Chat history with AI

---

##  How to Use the App

### 1. Create an account

Tell the app your grade and learning style.

### 2. Start learning

Ask anything:

* “Explain photosynthesis”
* “Solve this algebra question”
* “Difference between atoms and molecules?”

### 3. Check your progress

See how much you’ve learned and what you should learn next.

### 4. Continue anytime

The bot remembers everything from your past sessions.

---

##  Common Issues & Fixes

### App not starting?

```bash
docker ps
docker-compose logs
docker-compose down && docker-compose up -d
```

### AI not responding?

* Add OpenAI API key to `.env`
* Check your internet
* Make sure the key has credits

### Database errors?

```bash
docker-compose down -v
docker-compose up -d
```

### Website not loading?

* Ensure frontend is at port 3000
* Backend at port 8000
* Clear browser cache

---

##  Who Can Use It?

###  Students

Perfect for homework help, test prep, and learning tough topics.

###  Teachers

Track students' progress and give better support.

###  Anyone

Learn new topics anytime, at your own pace.

---

##  For Developers

### Available APIs:

```
POST /auth/register
POST /auth/login
GET  /students/me
POST /students/progress
GET  /analytics/progress-summary
```

### Example usage:

```python
import requests

response = requests.post("http://localhost:8000/auth/login", 
    data={"username": "student@example.com", "password": "yourpassword"})
token = response.json()["access_token"]

headers = {"Authorization": f"Bearer {token}"}
progress = requests.get("http://localhost:8000/students/progress", headers=headers)
```

---

##  Why This Project is Special

* Available anytime
* Never gets angry or tired
* Teaches you in your learning style
* Shows full progress analytics
* 100% Free & Open Source

---

##  Future Plans

* Multi-language support
* Voice chat with the tutor
* More advanced subjects
* Group learning
* Mobile apps

---
