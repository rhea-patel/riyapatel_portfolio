import React from "react";
import type { Certificate } from "../types/types";

interface CertificateCardProps {
  certificate: Certificate;
  isPublication?: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isPublication = false,
}) => {
  return (
    <div
      className={`certificate-card ${isPublication ? "publication" : ""}`}
      title={isPublication ? "Click to view full paper" : ""}
    >
      {certificate.link ? (
        <a href={certificate.link} target="_blank" rel="noopener noreferrer">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="certificate-image"
          />
        </a>
      ) : (
        <img
          src={certificate.imageUrl}
          alt={certificate.title}
          className="certificate-image"
        />
      )}
      <div className="certificate-info">
        <h3>
          {certificate.link ? (
            <a href={certificate.link} target="_blank" rel="noopener noreferrer">
              {certificate.title}
            </a>
          ) : (
            certificate.title
          )}
        </h3>
        <p>{certificate.code}</p>
        {certificate.year && <p className="year">{certificate.year}</p>}
      </div>
    </div>
  );
};

export default CertificateCard;