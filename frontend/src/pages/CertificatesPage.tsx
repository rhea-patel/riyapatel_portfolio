import React from "react";
import CertificateCard from "../components/certificatecard";
import type { Certificate } from "../types/types";

const CertificatesPage: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Oracle Cloud Infrastructure 2025 DevOps Professional",
      code: "(1Z0-1109-25)",
      imageUrl: "/images/oci-devops-badge.png",
      year: "2025",
    },
    {
      id: 2,
      title: "Oracle Cloud Infrastructure 2025 Multicloud Architect Professional",
      code: "(1Z0-1151-25)",
      imageUrl: "/images/oci-multicloud-badge.png",
      year: "2025",
    },
  ];

  const publication = {
    id: 3,
    title:
      "A Literature Review on Cryptocurrency with Special Reference to Bitcoin",
    code: "Published in GC Science Journal, Volume 8, Issue 12, 2021",
    imageUrl: "/images/publication-icon.png",
    year: "2021",
  };

  return (
    <div className="certificates-page">
      <h2>Certifications</h2>
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>

      <h2>Publication</h2>
      <div className="certificates-grid">
        <CertificateCard certificate={publication} />
      </div>
    </div>
  );
};

export default CertificatesPage;
