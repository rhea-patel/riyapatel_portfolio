// Tubes Cursor integration (based on "Tubes Cursor" by Kevin Levron — CC BY-NC-SA 4.0)
// Attribution: https://codepen.io/soju22/pen/qEbdVjK
import React, { useEffect, useRef } from "react";

const CDN = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const TubesCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const mod = await import(/* @vite-ignore */ CDN);
        const Tubes = (mod && (mod as any).default) || mod;
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize with a palette tuned to the site's accent
        const app = Tubes(canvas, {
          tubes: {
            colors: ["#ff77b6", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        // store for cleanup
        (canvas as any)._tubesApp = app;
      } catch (err) {
        // graceful fallback
        // console.error('TubesCursor load failed', err);
      }
    })();

    return () => {
      mounted = false;
      const canvas = canvasRef.current;
      const app = canvas && (canvas as any)._tubesApp;
      if (app && typeof app.dispose === "function") {
        try {
          app.dispose();
        } catch {}
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="tubes-canvas" aria-hidden />;
};

export default TubesCursor;
