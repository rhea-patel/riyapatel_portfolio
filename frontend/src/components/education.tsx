import { useEffect, useState, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import type { Education } from "../types/types";
import { fetchEducation } from "../api";

import myImage1 from "../assets/dallogo.png";
import myImage from "../assets/indus_logo.jpeg";

const getInstitutionConfig = (institution: string) => {
  const name = institution.toLowerCase();
  if (name.includes("dalhousie")) {
    return { logo: myImage1, cardClass: "education-card masters-card slide-left" };
  }
  if (name.includes("indus")) {
    return { logo: myImage, cardClass: "education-card bachelors-card slide-right" };
  }
  return { logo: null, cardClass: "education-card" };
};

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchEducation().then((data) => setEducation(data));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = containerRef.current.querySelectorAll(".education-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [education]);

  return (
    <section className="education-container">
      <div className="education-grid" ref={containerRef}>
        {education.map((edu, index) => {
          const config = getInstitutionConfig(edu.institution);
          const isVisible = visibleCards.includes(index);

          return (
            <div
              key={index}
              data-index={index}
              className={`${config.cardClass} ${isVisible ? "show-card" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Horizontal Layout: Logo + Content side by side */}
              <div className="education-card-content">
                <div className="education-logo-wrapper">
                  {config.logo ? (
                    <img
                      src={config.logo}
                      alt={edu.institution}
                      className={`edu-logo ${isVisible ? "logo-animate" : ""}`}
                    />
                  ) : (
                    <FaGraduationCap
                      className={`edu-icon ${isVisible ? "logo-animate" : ""}`}
                    />
                  )}
                </div>

                <div className="education-info">
                  <h3 className="education-institution">{edu.institution}</h3>
                  <p className="education-degree">
                    {edu.degree} • {edu.location}
                  </p>
                  <p className="education-duration">{edu.duration}</p>

                  {edu.details.length > 0 && (
                    <ul className="education-details">
                      {edu.details[0]
                        .replace("Relevant Coursework:", "")
                        .split(",")
                        .map((course, idx) => (
                          <li
                            key={idx}
                            className={`detail-item ${
                              isVisible ? "show-detail" : ""
                            }`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                          >
                            {course.trim()}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
