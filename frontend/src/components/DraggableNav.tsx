import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DraggableNav: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-header">
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
          <span className={`bar ${open ? "open" : ""}`}></span>
        </button>
      </div>

      <ul className={`nav-list ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <Link
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => setOpen(false)} // closes menu on click
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DraggableNav;
