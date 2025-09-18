import React from "react";
import { Link, useLocation } from "react-router-dom";

const DraggableNav: React.FC = () => {
    const location = useLocation();

    const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
//    { name: "Employment", path: "/employment" }, 
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
    ];

    return (
    <nav className="navbar">
        <ul className="nav-list">
        {navItems.map((item) => (
            <li className="nav-item" key={item.name}>
            <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
                <span className="nav-text">{item.name}</span>
            </Link>
            </li>
        ))}
        </ul>
    </nav>
    );
};

export default DraggableNav;

