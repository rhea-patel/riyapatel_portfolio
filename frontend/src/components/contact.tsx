import { useEffect, useState } from "react";
import type { Contact } from "../types/types";
import { fetchContact } from "../api";

export default function ContactSection() {
    const [contact, setContact] = useState<Contact | null>(null);

    useEffect(() => {
    fetchContact().then(setContact);
    }, []);

    if (!contact) return <p>Loading Contact...</p>;

    return (
    <section style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Contact</h2>
        <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p>Phone: {contact.phone}</p>
        <p>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin}</a></p>
        <p>GitHub: <a href={contact.github} target="_blank" rel="noreferrer">{contact.github}</a></p>
    </section>
    );
}
