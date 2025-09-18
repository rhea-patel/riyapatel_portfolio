import ContactSection from "../components/contact";
import "../index.css";

export default function ContactPage() {
    return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
        <ContactSection />

        <a
        href="/Riya_Patel_Resume.pdf"
        target="_blank"
        download
        className="resume-btn"
        >
        Download Resume
        </a>
    </div>
    );
}

