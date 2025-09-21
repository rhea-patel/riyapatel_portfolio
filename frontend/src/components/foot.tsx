// src/components/foot.tsx
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  // Generates 128 bubbles with random inline styles
  const bubbles = Array.from({ length: 128 }).map((_, i) => (
    <div
      key={i}
      className="bubble"
      style={{
        '--size': `${2 + Math.random() * 4}rem`,
        '--distance': `${6 + Math.random() * 4}rem`,
        '--position': `${-5 + Math.random() * 110}%`,
        '--time': `${2 + Math.random() * 2}s`,
        '--delay': `${-1 * (2 + Math.random() * 2)}s`,
      } as React.CSSProperties} // Type assertion to handle CSS variables
    />
  ));

  return (
    <div className="footer-wrapper">
      <div className="bubbles">
        {bubbles}
      </div>
      
      <div className="content">
        <div>
          {/* Your actual content here */}
          <p>&copy; {new Date().getFullYear()} Riya Patel. All Rights Reserved.</p>
        </div>

      <div className="social-links">
  <a
    href="https://www.linkedin.com/in/riya-patel-846780214/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin size={25} />
  </a>
  <a
    href="https://github.com/rhea-patel"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub size={25} />
  </a>
  <a href="mailto:riya.patel2430@gmail.com">
    <FaEnvelope size={25} />
  </a>
</div>
      </div>
    </div>
  );
};

export default Footer;