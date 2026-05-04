import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";


const DraggableNav: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  const shaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    // dynamically import shader mount and shader; mount into shaderRef
    let mount: any = null;
    if (!shaderRef.current) return;
    (async () => {
      try {
        const mod = await import(/* @vite-ignore */ "https://esm.sh/@paper-design/shaders");
        const ShaderMount = (mod && (mod as any).ShaderMount) || (mod && (mod as any).default);
        const liquid = (mod && (mod as any).liquidMetalFragmentShader) || (mod && (mod as any).liquidMetalFragmentShader);
        if (!ShaderMount || !liquid) return;
        mount = new ShaderMount(shaderRef.current, liquid, {
          u_repetition: 1.5,
          u_softness: 0.5,
          u_shiftRed: 0.3,
          u_shiftBlue: 0.3,
          u_distortion: 0,
          u_contour: 0,
          u_angle: 100,
          u_scale: 1.2,
          u_shape: 1,
          u_offsetX: 0,
          u_offsetY: 0,
        });
      } catch (err) {
        // fail silently if remote fails
      }
    })();

    return () => {
      try {
        if (mount && typeof mount.dispose === 'function') mount.dispose();
      } catch {}
    };
  }, []);

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
        <button
          className={`theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          <span className="toggle-track" aria-hidden>
            <span className="toggle-thumb" />
            <div ref={shaderRef as any} className="shader-mount" />
          </span>
          <span className="toggle-icons" aria-hidden>
            <svg className="icon-sun" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg className="icon-moon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          </span>
        </button>
      </div>

      <ul className={`nav-list ${open ? "open" : ""}`}>
        {navItems.map((item) => (
          <li className="nav-item" key={item.name}>
      <Link
  to={item.path}
  className={`nav-link ${
    location.pathname === item.path ? "active-link" : ""
  }`}
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
