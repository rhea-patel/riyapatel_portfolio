import React, { useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import ProjectsPage from "./pages/projectsPage";
import EducationPage from "./pages/educationpage";
// import EmploymentPage from "./pages/employmentpage";
import SkillsPage from "./pages/skillspage";
import ContactPage from "./pages/contactpage";
import "./index.css";
import DraggableNav from "./components/DraggableNav";
import Footer from "./components/foot";
import type { CodeChar, Particle } from "./types/types";



const AnimationContainer: React.FC = () => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!particleCanvas || !scannerCanvas) {
      return;
    }

    const particleCtx = particleCanvas.getContext("2d");
    const scannerCtx = scannerCanvas.getContext("2d");

    if (!particleCtx || !scannerCtx) {
      return;
    }

    const resizeCanvas = () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
      scannerCanvas.width = window.innerWidth;
      scannerCanvas.height = window.innerHeight;
    };

    const createParticles = (): Particle[] => {
      const particleCount = 200;
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * particleCanvas.width,
          y: Math.random() * particleCanvas.height,
          size: Math.random() * 2,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: `rgba(255, 255, 255, ${Math.random()})`,
        });
      }
      return particles;
    };

    const createCodeChars = (): CodeChar[] => {
      const codeCharCount = 50;
      const codeChars: CodeChar[] = [];
      const codeCharsString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (let i = 0; i < codeCharCount; i++) {
        codeChars.push({
          x: Math.random() * scannerCanvas.width,
          y: Math.random() * scannerCanvas.height,
          text: codeCharsString[Math.floor(Math.random() * codeCharsString.length)],
        });
      }
      return codeChars;
    };

    const particles = createParticles();
    const codeChars = createCodeChars();

    const drawParticles = () => {
      particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      particles.forEach(particle => {
        particleCtx.fillStyle = particle.color;
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particleCtx.fill();
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > particleCanvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > particleCanvas.height) particle.speedY *= -1;
      });
    };

    const drawCodeChars = () => {
      scannerCtx.clearRect(0, 0, scannerCanvas.width, scannerCanvas.height);
      codeChars.forEach(codeChar => {
        scannerCtx.fillStyle = "rgb(0, 255, 255)";
        scannerCtx.font = "20px monospace";
        scannerCtx.fillText(codeChar.text, codeChar.x, codeChar.y);
        codeChar.y += 1;

        if (codeChar.y > scannerCanvas.height) {
          codeChar.y = 0;
          codeChar.x = Math.random() * scannerCanvas.width;
        }
      });
    };

    let animationFrameId: number;
    const animate = () => {
      drawParticles();
      drawCodeChars();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animation-wrapper">
      <canvas ref={particleCanvasRef} id="particleCanvas"></canvas>
      <canvas ref={scannerCanvasRef} id="scannerCanvas"></canvas>
      <div className="scanner"></div>
      <div className="card-stream">
        <div className="card-line"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
    const location = useLocation();
    const shouldShowAnimation = location.pathname === "/contact";

    return (
        <div className="page-wrapper">
            <DraggableNav />
            <svg style={{ position: 'fixed', top: '100vh' }} xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="blob"></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="blob"></feBlend>
                    </filter>
                </defs>
            </svg>
    
                <main>
                    {shouldShowAnimation && <AnimationContainer />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/education" element={<EducationPage />} />
                        {/* <Route path="/employment" element={<EmploymentPage />} /> */}
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </main>
            <Footer />
        </div>
    );
};


const AppWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper;
