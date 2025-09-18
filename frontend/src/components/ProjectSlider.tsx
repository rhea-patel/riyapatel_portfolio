import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api';
import type { Project } from '../types/types';
import ProjectCard from './projects';
import '../index.css';


const ProjectSlider: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="slider-container">
      <div className="slider">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
