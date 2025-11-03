
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProjectsPage from "./pages/projectsPage";
import EducationPage from "./pages/educationpage";
// import EmploymentPage from "./pages/employmentpage";
import SkillsPage from "./pages/skillspage";
import ContactPage from "./pages/contactpage";
import CertificatesPage from "./pages/CertificatesPage";
import "./index.css";
import DraggableNav from "./components/DraggableNav";
import Footer from "./components/foot";



const App: React.FC = () => {

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
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/education" element={<EducationPage />} />
                        {/* <Route path="/employment" element={<EmploymentPage />} /> */}  
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/certificates" element={<CertificatesPage />} />
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
