import { useEffect, useState } from "react";
import type { Contact, ContactFormData } from "../types/types";
import { fetchContact, sendContact } from "../api";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaDownload } from "react-icons/fa";
import "../index.css";

export default function ContactSection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  // Fetch contact info
  useEffect(() => {
    fetchContact().then(setContact);
  }, []);

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.message.trim()) return "Message cannot be empty.";
    if (formData.message.length < 10) return "Message should be at least 10 characters.";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus(validationError);
      return;
    }

    try {
      const res = await sendContact(formData);
      setStatus(res.message || "Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    }
  };

  if (!contact) return <p>Loading Contact...</p>;

  // Social links
  const socialLinks = [
    { icon: <FaEnvelope />, url: `mailto:${contact.email}`, color: "#d44638" },
    { icon: <FaPhoneAlt />, url: `tel:${contact.phone}`, color: "#34a853" },
    { icon: <FaLinkedin />, url: contact.linkedin, color: "#0077b5" },
    { icon: <FaGithub />, url: contact.github, color: "#000" },
  ];

  return (
    <section className="contact-section">
      <main>
        <h2>Contact Me</h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send</button>
        </form>

        {status && <p className="form-status">{status}</p>}

        {/* Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: link.color, fontSize: "2rem" }}
              title={link.url}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Resume Preview */}
        <div className="resume-section" style={{ marginTop: "2rem" }}>
          <h3>Preview My Resume</h3>
          <a
            href="/Riya_Patel_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-button"
          >
            <FaDownload style={{ marginRight: "0.5rem" }} />
            View / Download Resume
          </a>
        </div>
      </main>
    </section>
  );
}
