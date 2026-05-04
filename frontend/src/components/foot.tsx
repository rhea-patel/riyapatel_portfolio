// src/components/foot.tsx
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="footer-wrapper">
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