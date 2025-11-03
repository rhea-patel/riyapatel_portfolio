import { type Certificate } from "../types/types";

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Oracle Cloud Infrastructure 2025 DevOps Professional (1Z0-1109-25)",
    issuer: "Oracle",
    date: "October 2025",
    credentialId: "323468220OCI25DOPOCP",
    link: "https://education.oracle.com",
    category: "Certificate",
  },
  {
    id: 2,
    title:
      "Oracle Cloud Infrastructure 2025 Multicloud Architect Professional (1Z0-1151-25)",
    issuer: "Oracle",
    date: "September 2025",
    link: "https://education.oracle.com",
    category: "Certificate",
  },
  {
    id: 3,
    title:
      "A Literature Review on Cryptocurrency with Special Reference to Bitcoin",
    issuer: "GC Science Journal – Volume 8, Issue 12, Year 2021",
    date: "2021",
    category: "Publication",
  },
];

export default function CertificatesPage() {
  return (
    <div className="certificates-container">
      <h1 className="page-title">Certificates & Publications</h1>

      <div className="cert-grid">
        {certificates.map((item) => (
          <div
            key={item.id}
            className={`cert-card ${
              item.category === "Publication" ? "publication-card" : ""
            }`}
          >
            <div className="cert-tag">
              {item.category === "Publication" ? "📄 Publication" : "🏅 Certificate"}
            </div>

            <h2 className="cert-title">{item.title}</h2>
            <p className="cert-issuer">{item.issuer}</p>
            <p className="cert-date">{item.date}</p>

            {item.credentialId && (
              <p className="cert-id">Credential ID: {item.credentialId}</p>
            )}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
              >
                View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}