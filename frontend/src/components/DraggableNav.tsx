import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const DraggableNav: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
    { name: "Certificates", path: "/certificates" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-header"> 
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"} 
        >
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
        </button>

        <div className="theme-toggle">
          <input
            id="shimmer-theme-toggle"
            type="checkbox"
            className="shimmer-input"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          />
          <label htmlFor="shimmer-theme-toggle" className="shimmer-toggle" aria-hidden>
            <span className="shimmer-knob" />
          </label>
        </div>
      </div>

      <ul className={`nav-list ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active-link" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="current-indicator"> (current)</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DraggableNav;
