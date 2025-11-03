import React from "react";
import CertificateCard from "../components/certificatecard";
import type { Certificate } from "../types/types";

const CertificatesPage: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Oracle Cloud Infrastructure 2025 DevOps Professional",
      code: "(1Z0-1109-25)",
      imageUrl: "frontend/public/OCI25DOPOCP.jpg",
      year: "2025",
      link: "https://www.linkedin.com/in/riya-patel-846780214/details/certifications/1762114038729/single-media-viewer/?profileId=ACoAADY4ILYBRkpGLClyhssmr96ERIsjF0I8iyM",
    },
    {
      id: 2,
      title: "Oracle Cloud Infrastructure 2025 Multicloud Architect Professional",
      code: "(1Z0-1151-25)",
      imageUrl: "frontend/public/OCI2025MCAOCP.jpeg",
      year: "2025",
      link: "https://www.linkedin.com/in/riya-patel-846780214/details/certifications/1762190908989/single-media-viewer/?profileId=ACoAADY4ILYBRkpGLClyhssmr96ERIsjF0I8iyM",
    },
  ];

const publication: Certificate = {
  id: 3,
  title: "A Literature Review on Cryptocurrency with Special Reference to Bitcoin",
  code: "GC Science Journal, Volume 8, Issue 12, ISSN: 1869-9391",
  imageUrl: "/images/pdf-icon.png", 
  year: "2021",
  link: "https://drive.google.com/file/d/1tp0eDJT7ZohIFLwL_KdPTd8GyH9P8bIl/view",
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
