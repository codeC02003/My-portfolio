import { useEffect, useRef } from "react";
import { getAllSections, tick, invalidateParticles } from "./particleStore";

/**
 * ParticleCanvas
 *
 * Single fixed canvas that covers the full viewport.
 * Calls tick() each frame (which updates clip-path + particle positions),
 * then renders all active particles.
 *
 * z-index: 25  →  above section content, below FloatingSphere (z=50)
 *
 * mix-blend-mode: normal  →  overrides the global "canvas { mix-blend-mode:screen }"
 * rule in index.css so particles render as crisp cyan/white, not washed-out.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let   rafId;
    let   cssW = window.innerWidth;
    let   cssH = window.innerHeight;

    // ── DPR-aware resize ─────────────────────────────────────────────────
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width  = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      invalidateParticles();
    }
    resize();
    window.addEventListener("resize", resize);

    // ── rAF render loop ──────────────────────────────────────────────────
    function frame(timestamp) {
      // tick() updates clip-path on every section wrapper and recomputes
      // particle positions — must run before we read particle data below.
      // timestamp (DOMHighResTimeStamp from rAF) drives the time-based loop.
      tick(timestamp);

      const sections = getAllSections();

      // Early-out: nothing to draw
      let active = false;
      for (const e of sections.values()) {
        if (e.clipFraction > 0 && e.clipFraction < 1 && e.particles) {
          active = true;
          break;
        }
      }

      // Always clear (removes last frame's particles when scrolling back)
      ctx.clearRect(0, 0, cssW, cssH);

      if (active) {
        // ── Pass 1: cyan + light-blue particles ──
        ctx.shadowBlur  = 8;
        ctx.shadowColor = "#00ffff";

        for (const e of sections.values()) {
          if (!e.particles || e.clipFraction <= 0 || e.clipFraction >= 1) continue;
          for (const p of e.particles) {
            if (p.alpha < 0.005 || p.color === "white") continue;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle   = p.color === "light" ? "#4db8ff" : "#00ffff";
            ctx.beginPath();
            ctx.arc(p.currentX, p.currentY, p.currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // ── Pass 2: white particles ───────────────────────────────────────
        ctx.shadowBlur  = 5;
        ctx.shadowColor = "#ffffff";

        for (const e of sections.values()) {
          if (!e.particles || e.clipFraction <= 0 || e.clipFraction >= 1) continue;
          for (const p of e.particles) {
            if (p.alpha < 0.005 || p.color !== "white") continue;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle   = "#ffffff";
            ctx.beginPath();
            ctx.arc(p.currentX, p.currentY, p.currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Reset state
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 0;
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        pointerEvents: "none",
        zIndex:        25,
      }}
    />
  );
}
