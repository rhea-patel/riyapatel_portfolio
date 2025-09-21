import { useEffect, useState, useRef } from "react";
import type { Project } from "../types/types";
import { fetchProjects } from "../api";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  }, []);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section className="projects-container">
      <h2 className="projects-title">Projects</h2>

      {/* Horizontal scroll wrapper */}
    <div
  className="projects-scroll"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <div className="projects-track" ref={trackRef}>
    {/* Duplicate the projects twice for seamless scroll */}
    {[...projects, ...projects].map((project, idx) => (
      <div key={idx} className="project-card">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.Link && (
          <a
            href={project.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            View Demo
          </a>
        )}
      </div>
    ))}
  </div>
</div>
    </section>
  );
}
