// src/pages/ContactPage.tsx
import ContactSection from "../components/contact";

export default function ContactPage() {
    return (
    <div>
        
        <ContactSection />

        <a
        href="frontend/Riya_Patel_Resume.pdf" 
        download
        style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#ed3030ff",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
        }}
        >
        Download Resume
        </a>
    </div>
    );
}
