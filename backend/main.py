from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ==========================
# Load environment variables
# ==========================
load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")   # Gmail address used to send
EMAIL_PASS = os.getenv("EMAIL_PASS")   # Gmail App Password
EMAIL_TO = os.getenv("EMAIL_TO")       # Destination inbox
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Portfolio data
# ==========================
contact = {
    "email": "riya.patel2430@gmail.com",
    "phone": "+1 (902) 993-0161",
    "linkedin": "https://www.linkedin.com/in/riya-patel-846780214/",
    "github": "https://github.com/rhea-patel"
}

about = {
    "name": "Riya Patel",
    "role": "Full Stack Developer",
    "location": "Toronto, Canada",
    "summary": "I'm an Associate Full Stack Developer with a passion for building visually appealing and intuitive software. ..."
}

skills = [
    {"category": "Programming Languages", "items": ["Python", "Java", "TypeScript", "JavaScript"]},
    {"category": "Web Technologies", "items": ["React.js", "Node.js", "FastAPI"]},
    {"category": "API & Database", "items": ["REST", "Postman", "SQL", "MySQL", "NoSQL"]},
    {"category": "Cloud & DevOps", "items": ["AWS", "Firestore", "GCP", "Docker", "CI/CD"]},
    {"category": "Methodologies", "items": ["Agile", "Scrum", "SDLC", "Requirements Gathering"]},
    {"category": "Tools & Platforms", "items": ["Git", "GitHub", "Jira", "VS Code", "Figma"]}
]

projects = [
    {"id": 1, "title": "Billsync", "description": "Bill splitting app built with FastAPI + React"},
    {"id": 5, "title": "AWS Serverless Table-Tracker", "description": "Serverless solution with AWS Lambda + SNS.", "Link": "https://github.com/rhea-patel/aws-serverless-table-tracker"},
    {"id": 2, "title": "Brownie Point", "description": "Android app with SOLID principles + regression tests.", "Link": "https://github.com/rhea-patel/Brownie_Point"},
    {"id": 3, "title": "CineVerse", "description": "Movie Ticket Booking System (MERN).", "Link": "https://csci-5709-group-08.netlify.app"},
    {"id": 4, "title": "WeatherAlert", "description": "Scalable AWS-based weather alert system.", "Link": "https://github.com/rhea-patel/Advance_Cloud_Computing_Projects/tree/main/TermAssignment"},
    {"id": 6, "title": "HealthCard NovaScotia", "description": "Native Kotlin Android application.", "Link": "https://github.com/rhea-patel/healthcard_Nova_Scotia-kotlin"}
]

education = [
    {"institution": "Dalhousie University", "degree": "Masters of Applied Computer Science", "duration": "Sep 2022 - May 2024", "location": "Halifax, Canada"},
    {"institution": "Indus University", "degree": "Bachelor of Technology in Information Technology Engineering", "duration": "June 2018 - May 2022", "location": "Ahmedabad, India"}
]

# ==========================
# API Endpoints
# ==========================
@app.get("/contact")
def get_contact():
    return contact

@app.get("/about")
def get_about():
    return about

@app.get("/skills")
def get_skills():
    return skills

@app.get("/projects")
def get_projects():
    return projects

# @app.get("/employment")
# def get_employment():
#     return employment

@app.get("/education")
def get_education():
    return education


# ==========================
# Contact Form Submission
# ==========================
@app.post("/contact")
async def handle_contact(request: Request):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Build the email
    subject = f"Portfolio Contact Form: {name}"
    body = f"""
    You received a new message from your portfolio contact form:

    Name: {name}
    Email: {email}

    Message:
    {message}
    """

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_TO
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        # Gmail prefers TLS (587)
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # upgrade to secure connection
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())

        return {"status": "success", "message": "Thanks for reaching out! Your message has been sent."}
    except Exception as e:
        print("❌ Error sending email:", str(e))
        return {"status": "error", "message": "Failed to send your message. Please try again later."}
