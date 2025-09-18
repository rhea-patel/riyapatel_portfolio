import { useEffect, useState } from 'react';
import type { Skills } from '../types/types';
import { fetchSkills } from '../api';

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skills[]>([]);

  useEffect(() => {
    fetchSkills().then((data) => setSkills(data));
  }, []);

  return (
    <section className="skills-container">
      <div className="skills-grid">
        {skills.map((category, index) => (
          <div key={index} className="skills-card">
            <h3 className="skills-category">{category.category}</h3>
            <div className="skills-items">
              {category.items.map((item, idx) => (
                <span key={idx} className="skill-badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

