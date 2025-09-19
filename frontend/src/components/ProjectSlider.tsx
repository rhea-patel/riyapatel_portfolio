import React from "react";
import type { Project } from "../types/types";
import "../index.css";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.Link && (
        <a href={project.Link} target="_blank" rel="noreferrer">
          View Project
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
