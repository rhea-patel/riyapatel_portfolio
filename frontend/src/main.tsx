import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Force dark theme for the entire site
try {
  document.documentElement.setAttribute('data-theme', 'dark');
} catch {
  // ignore: safe fallback if document is not available
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

