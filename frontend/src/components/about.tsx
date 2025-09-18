import { useEffect, useState } from "react";
import type { About } from "../types/types";
import { fetchAbout } from "../api";
import myImage from '../assets/unnamed.jpg';
import Typewriter from "./typewriter";

export default function AboutSection() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!about) return <p className="text-center">No data available</p>;

  return (
      <section className="about-container">
      <div className="about-inner">
        <img src={myImage} alt={about.name} className="about-image" />
        <div className="about-text">
          <h1 className="about-title">{about.name}</h1>
          <h2 className="about-role">{about.role}</h2>
          <p className="about-location">{about.location}</p>
          <Typewriter text="I'm an Associate Full Stack Developer with a passion for building visually appealing and intuitive software. I specialize in bridging the gap between front-end and back-end, with a foundational understanding of cloud services and application deployment. I believe in the power of teamwork and leverage strong listening and communication skills to collaborate effectively with designers and fellow developers, ensuring every project is a success."  />
        </div>
      </div>
    </section>
  );
}
