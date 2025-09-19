import { useEffect, useState } from "react";
import type { Contact } from "../types/types";
import { fetchContact } from "../api";
import "../index.css";

export default function ContactSection() {
    const [contact, setContact] = useState<Contact | null>(null);

    useEffect(() => {
    fetchContact().then(setContact);
    }, []);

    if (!contact) return <p>Loading Contact...</p>;

    return (
    <section className="contact-section"><main>
            <h2>Contact Me</h2>
            
        <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p>Phone: {contact.phone}</p>
        <p>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin}</a></p>
        <p>GitHub: <a href={contact.github} target="_blank" rel="noreferrer">{contact.github}</a></p></main>
    </section>
    );
}
