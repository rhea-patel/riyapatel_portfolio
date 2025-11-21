from fastapi import FastAPI, Request, BackgroundTasks
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from fastapi import FastAPI, Request # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]
from dotenv import load_dotenv
import os
from mangum import Mangum

load_dotenv("main.env")


EMAIL_USER = os.getenv("EMAIL_USER")  
EMAIL_PASS = os.getenv("EMAIL_PASS")   
EMAIL_TO = os.getenv("EMAIL_TO")      
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://riyapatel-portfolio.vercel.app")


app = FastAPI()


origins = [
    "https://riyapatel-portfolio.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://riyapatel-portfolio.vercel.app"],      # Allowed deployed link for development
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],        
)


# Contact Information
contact = {
    "email": "riya.patel2430@gmail.com",
    "phone": "+1 (902) 993-0161",
    "linkedin": "https://www.linkedin.com/in/riya-patel-846780214/",
    "github": "https://github.com/rhea-patel"
}
# About Me
about = {
    "name": "Riya Patel",
    "role": "Full Stack Developer",
    "location": "Toronto, Canada",
    "summary": "I'm an Associate Full Stack Developer with a passion for building visually appealing and intuitive software. I specialize in bridging the gap between front-end and back-end, with a foundational understanding of cloud services and application deployment. I believe in the power of teamwork and leverage strong listening and communication skills to collaborate effectively with designers and fellow developers, ensuring every project is a success."
}

skills = [
    {
        "category": "Programming Languages",
        "items": ["Java", "Python", "TypeScript", "JavaScript"]
    },
    {
        "category": "Web Technologies",
        "items": ["React.js","Node.js"]
    },
    {
        "category": "Frameworks",
        "items": ["SpringBoot", "Django", "FastAPI"]
    },
    {
        "category": "Database Management",
        "items": ["Postman", "PostgreSQL", "MySQL", "NoSQL"]
    },
    {
        "category": "Methodologies",
        "items": ["Agile methodology", "Design Patterns", "Scrum", "Requirements Gathering"]
    },
    {
        "category": "Soft Skills",
        "items": ["Listening", "Communication", "Teamwork", "Adaptability", "Time-Management"]
    },
    {
        "category": "Automation Tools",
        "items": ["Docker", "GitLab CI/CD", "BitBucket CI/CD", "Splunk", "Cypress", "Terraform"]
    },
    {
        "category": "Cloud Infrastructure",
        "items": ["AWS", "Firestore", "OCI"]
    }
]



#Technical Experience
projects = [
    {
        "id": 1,
        "title": "Brownie Point",
        "description": "Android app using SOLID principles and code optimizations, reducing loading times by 25% and improving overall performance. Automated regression tests with JUnit ensured stability across updates.",
        "Link": "https://github.com/rhea-patel/Brownie_Point"
    },
    {
        "id": 2,
        "title": "CineVerse",
        "description": "Movie ticket booking system with features like 'Movie Description', 'FAQs', and 'Party Module', increasing repeat bookings by 20%. Built with MERN stack.",
        "Link": "https://csci-5709-group-08.netlify.app"
    },
    {
        "id": 3,
        "title": "WeatherAlert",
        "description": "Scalable weather alert system on AWS using SQS, SNS, and Lambda, improving user engagement by 25% and reducing alert delivery delay by 50%.",
        "Link": "https://github.com/rhea-patel/Advance_Cloud_Computing_Projects/tree/main/TermAssignment"
    },
    {
        "id": 4,
        "title": "AWS Serverless Table-Tracker",
        "description": "Full-stack serverless application for table reservations, integrating AWS Lambda and SNS to deliver real-time notifications.",
        "Link": "https://github.com/rhea-patel/aws-serverless-table-tracker"
    },
    {
        "id": 5,
        "title": "HealthCard NovaScotia",
        "description": "Native Kotlin Android app for managing digital Nova Scotia health cards, with secure authentication and intuitive user experience using Firebase and Firestore.",
        "Link": "https://github.com/rhea-patel/healthcard_Nova_Scotia-kotlin"
    },
    {
        "id": 6,
        "title": "Credit Card Fraud Detection using Machine Learning",
        "description": "Machine learning solution for detecting fraudulent credit card transactions. Implemented data preprocessing, class imbalance handling, and trained models like Logistic Regression and Random Forest, evaluated with precision, recall, and F1-score.",
        "Link": "https://github.com/rhea-patel/credit-card-fraud-smote-ml"
    },
    {
        "id": 7,
        "title": "Hurricane Fiona Power Restoration Path Optimization",
        "description": "Developed optimized path-planning system for Nova Scotia Power to restore poles damaged by Hurricane Fiona. Used Dijkstra’s algorithm and Prim’s MST for efficient repair routes, minimizing fuel, equipment, and redundant travel. Framework: Core Java, DSA.",
        "Link": "https://github.com/rhea-patel/hub-repair-dijkstra"
    }
]


# Employment History
# employment = [
#     {"company": "Freelance", "role": "Full Stack Developer", "duration": "Jan 2025 - Present", "location":"Toronto, Canada","description": ["- Engineered a full-stack web application for managing shared expenses, implementing complex custom expense logic to support fractional splitting and percentage-based distribution of individual items using Python/Django and React.js/TypeScript. Achieved this by building a robust RESTful API with FastAPI for faster business logic calculations and reduced revert time to up to 50%. Optimized database queries using SQLAlchemy ORM, implementing eager loading and selective filtering, which reduced database calls and improved data retrieval performance. Utilized Pydantic to enforce strict data validation, ensuring clean and well-structured API requests and responses, which led to a 2% improvement in API reliability and designed responsive UI with TypeScript and modern CSS for Cross-Platform Responsiveness.Implemented Firestore database for real-time updates in all the users related to the expense and used for user login/ Signup using firebase Authentication with options of signing up or logging using Google or just email.Implemented SEO best practices to improve website visibility and search engine rankings."]},
#     {"company": "Voysn", "role": "Cloud Analyst Intern", "duration": "Sep 2024 - Dec 2024", "location":"Halifax, Canada","description": ["-Assisted the team in Cloud Architecture Optimization initiatives on Microsoft Azure, by supporting performance tuning and security audits. Supported the team's implementation of Infrastructure as Code (IaC) principles by writing and testing configuration scripts for review. Utilized Cloud Monitoring Tools to analyze system performance and assist in the initial diagnosis of issues. Researched and documented foundational concepts for Multi-cloud Strategies and best practices for Azure Security."]},
#     {"company": "Scotia Investment Ltd", "role": "IT Analyst Co-op", "duration": "Jan 2024 - May 2024", "location":"Halifax, Canada","description": ["- Implemented a system entry log application using Microsoft Power Apps to replace a manual, paper-based system, reducing human data entry errors by an estimated 90% and improving tracking accuracy for Scotia Recycling. Automated data collection workflows to streamline internal processes and reduce manual effort for recycling operations. This involved using Power Automate to capture recycling details, including images of recycled items, and centrally storing all data in a SharePoint database. Utilized Power Automate Flow to automatically convert the above uploaded image from various formats (such as JPG and HEIC/HEVC) into a Base64 string reducing the size to 60% of original maintaining the same quality utilizing 30% less space. Redesigned and updated the Minas Energy website, modernizing its structure and content to align with current industry trends. Migrated from a local server to Azure, improving scalability, security, and performance."]},
#     {"company": "Parikh Enterprise", "role": "Software Developer", "duration": "Jan 2022 - Nov 2022", "location":"Jhaghadia, India","description": ["- Inquiry Management System (Django, FastAPI, React, PostgreSQL, JavaScript) Built FastAPI REST endpoints to manage inquiries and their categories in the Inquiry Form, improving frontend integration and data handling. Optimized database queries, improving response times and allowing the system to manage a higher volume of department inquiries with the same infrastructure. Designed efficient PostgreSQL schemas with normalized tables and constraints to ensure data integrity and ACID Properties under heavy transactional loads.Created reusable React components following component-based architecture principles for faster development purpose and less code redundancy. Troubleshot and resolved Docker configuration issues during deployment for less image sizing saving bootup time and gained experience testing asynchronous API endpoints and React components for code smells."]},
#     {"company": "Cromoson Technology", "role": "Python Developer Intern", "duration": "May 2021 - Aug 2021", "location":"Ahmedabad, India","description": ["Contributed to the development and maintenance of Python/Flask web applications, resolving bugs and implementing minor features to enhance functionality. Wrote unit tests and updated documentation for API Development endpoints to ensure code quality and clarity. Collaborated in an Agile team, utilizing Jira for task management and GitHub for version control. Developed responsive user interfaces with HTML/CSS and the Bootstrap framework, working from initial wireframing to final implementation. Assisted with MongoDB database operations, including data seeding and maintenance tasks."]},
#     {"company": "Fab Advertising Firm", "role": "Web Designer Intern", "duration": "Jun 2019 - Aug 2019", "location":"Ahmedabad, India","description": ["Designed and developed responsive web pages using Bootstrap, enhancing website usability and visual appeal. Collaborated with the design team to create user-friendly interfaces aligned with client requirements. Conducted usability testing to ensure seamless user experience across various devices and browsers."]}
# ]

#Education

education = [
    {"institution": " Dalhousie University", "degree": "Masters of Applied Computer Science", "duration": "Sep 2022 - May 2024", "location":"Halifax, Canada","details": ["Relevant Coursework: Data Structures and Algorithms, Web Development, Database Management Systems, Cloud Computing, Software Engineering, Operating Systems, Computer Networks, Cloud Solution Architecture, Mobile App Development."]},
    {"institution": "Indus University", "degree": "Bachelor of Technology in Information Technology Engineering", "duration": "June 2018 - May 2022", "location":"Ahmedabad, India","details": ["Relevant Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Web Technologies, Software Engineering, Operating Systems, Computer Networks, Mathematics for Computer Science."]}
]



@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Lambda!"}

handler = Mangum(app)

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

def send_email_blocking(name: str, email: str, message: str):
    subject = f"Portfolio Contact Form: {name}"
    body = f"""
    You received a new message from your portfolio contact form:

    Name: {name}
    Email: {email}

    Message:
    {message}
    """

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER # type: ignore
    msg["To"] = EMAIL_TO # type: ignore
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS) # type: ignore
            server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string()) # type: ignore
        print("✅ Email sent successfully!")
    except Exception as e:
        print("❌ Error sending email:", e)

# Contact endpoint
@app.post("/contact")
async def handle_contact(request: Request, background_tasks: BackgroundTasks):
    data = await request.json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Optional debug logging
    print("📨 Incoming form data:", data)

    # Add the email sending function to background tasks
    background_tasks.add_task(send_email_blocking, name, email, message)

    # Return response immediately
    return {"status": "success", "message": "Thanks for reaching out! Your message is being sent."}