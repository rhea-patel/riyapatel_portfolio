/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'; // Import your ProjectCard
import type { Project } from "../types/types"; // Import the type
import { fetchProjects } from '../api'; // Your API fetching function
import ProjectsSection from '../components/projects';
const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                setError("Failed to load projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (projects.length === 0) {
        return <div className="no-projects">No projects to display.</div>;
    }

    return (
        <div className="projects-page">
            <ProjectsSection />
        </div>
    );
};

export default ProjectsPage;