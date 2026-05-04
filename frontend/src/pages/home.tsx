// src/pages/Home.tsx
import AboutSection from "../components/about";

const Hero: React.FC = () => {
    return (
        <section className="phq-hero">
            <div className="phq-hero-inner">
                <h1 className="phq-hero-title">CREATIVE&nbsp;&nbsp;SHAPESHIFTERS.</h1>
                <p className="phq-hero-sub">BELIEVE&nbsp;&nbsp;IN&nbsp;&nbsp;THE&nbsp;&nbsp;UNBELIEVABLE.</p>
                <div className="phq-hero-cta">SCROLL TO EXPLORE</div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div>
            <Hero />
            <AboutSection />
        </div>
    );
}
