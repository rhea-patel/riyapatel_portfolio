import smtplib, ssl
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

# Load your main.env
load_dotenv("main.env")

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_TO   = os.getenv("EMAIL_TO")

print("📧 EMAIL_USER:", EMAIL_USER)
print("🔑 EMAIL_PASS length:", len(EMAIL_PASS) if EMAIL_PASS else None)
print("📥 EMAIL_TO:", EMAIL_TO)

# Create a simple email
subject = "SMTP Test Email"
body = "Hello! This is a test email sent from Python via Gmail SMTP."
msg = MIMEText(body, "plain")
msg["Subject"] = subject
msg["From"] = EMAIL_USER
msg["To"] = EMAIL_TO

# Try sending
try:
    context = ssl.create_default_context()
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls(context=context)
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())
    print("✅ Email sent successfully!")
except Exception as e:
    print("❌ Error sending email:", e)
