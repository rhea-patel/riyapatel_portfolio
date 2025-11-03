import React from "react";
import type { Certificate } from "../types/types";

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="certificate-card">
      <img
        src={certificate.imageUrl}
        alt={certificate.title}
        className="certificate-image"
      />
      <div className="certificate-info">
        <h3>{certificate.title}</h3>
        <p>{certificate.code}</p>
        {certificate.year && <p className="year">{certificate.year}</p>}
      </div>
    </div>
  );
};



export default CertificateCard;
