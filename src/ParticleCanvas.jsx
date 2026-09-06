import { useEffect, useRef } from "react";
import { getAllSections, tick, invalidateParticles } from "./particleStore";

/**
 * ParticleCanvas
 *
 * Single fixed canvas that covers the full viewport.
 * Calls tick() each frame (which updates clip-path + particle positions),
 * then renders all active embers.
 *
 * z-index: 25  →  above section content, below FloatingSphere (z=50)
 *
 * mix-blend-mode: normal  →  overrides the global "canvas { mix-blend-mode:screen }"
 * rule in index.css so embers render as crisp cyan/white, not washed-out.
 *
 * Rendering notes
 * ---------------
 * Embers are drawn as pre-baked radial-gradient sprites composited with
 * "lighter" (additive), in one pass, rather than arc() fills under
 * ctx.shadowBlur in two colour passes.
 *
 * This is a LOOKS change, not a speed one, and it is worth being precise
 * about that. Measured on a 640-ember field, the old shadowBlur path cost
 * about 0.16 ms/frame and this sprite path about 0.34 ms/frame: additive
 * blending over a larger glow footprint moves more fill. Both sit around
 * 1-2% of a 16.7 ms frame, so the extra is affordable, and it buys a real
 * heat ramp plus the pile-up glow where embers bunch, which is what makes
 * sparks read as sparks.
 *
 * Sprites are baked once at startup, so per-frame work is plain drawImage
 * with no per-call blur.
 */

// Heat ramp, hottest first. Newly released embers are white hot, they pass
// through the site's cyan in flight, and cool to deep blue as the sphere
// absorbs them.
const HEAT_RAMP = [
  "255,252,238", // 1.0  white hot
  "196,250,255", // 0.8
  "120,240,255", // 0.6
  "0,255,255",   // 0.4  cyan
  "46,176,255",  // 0.2
  "30,116,255",  // 0.0  deep blue
];

const SPRITE_R = 24;   // baked sprite radius, px
const GLOW     = 3.5;  // ember radius -> drawn glow radius

// Sparks get a second, much larger and much fainter pass underneath. That
// wide low-alpha disc is what makes the stream pool light onto the area
// around it instead of just being a lot of small bright dots.
const HALO     = 3.6;  // spill radius, as a multiple of the ember's glow
const HALO_A   = 0.20; // spill alpha, as a fraction of the ember's alpha

function bakeSprite(rgb) {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE_R * 2;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(
    SPRITE_R, SPRITE_R, 0,
    SPRITE_R, SPRITE_R, SPRITE_R
  );
  // A longer, fatter tail than a plain falloff: the extra energy out at 0.7
  // is what reads as light spilling rather than a hard dot with a halo.
  grad.addColorStop(0.0,  `rgba(${rgb},1)`);
  grad.addColorStop(0.14, `rgba(${rgb},0.94)`);
  grad.addColorStop(0.38, `rgba(${rgb},0.46)`);
  grad.addColorStop(0.70, `rgba(${rgb},0.14)`);
  grad.addColorStop(1.0,  `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE_R * 2, SPRITE_R * 2);
  return c;
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d", { alpha: true });
    let   rafId;
    let   cssW = window.innerWidth;
    let   cssH = window.innerHeight;
    let   wasDirty = false; // did we paint anything last frame?

    const sprites = HEAT_RAMP.map(bakeSprite);
    const LAST    = sprites.length - 1;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── DPR-aware resize ─────────────────────────────────────────────────
    function resize() {
      // Cap at 2. Above that the canvas costs 2.25x the fill for no visible
      // gain on a soft additive glow.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width  = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width  = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      invalidateParticles();
      wasDirty = true; // force one clear at the new size
    }
    resize();
    window.addEventListener("resize", resize);

    // Dev-only frame cost readout. Vite statically replaces import.meta.env.DEV,
    // so this whole block is dropped from production builds.
    const stats = { n: 0, total: 0, max: 0, drawn: 0 };
    if (import.meta.env.DEV) window.__pstats = stats;

    // ── rAF render loop ──────────────────────────────────────────────────
    function frame(timestamp) {
      const t0 = import.meta.env.DEV ? performance.now() : 0;

      // tick() updates clip-path on every section wrapper and recomputes
      // ember positions, so it must run before we read particle data below.
      // timestamp (DOMHighResTimeStamp from rAF) drives the time-based loop.
      tick(timestamp);

      const sections = getAllSections();

      // Is any section mid-cut this frame?
      let active = false;
      if (!reduceMotion) {
        for (const e of sections.values()) {
          if (e.particles && e.clipFraction > 0 && e.clipFraction < 1) {
            active = true;
            break;
          }
        }
      }

      // Only clear when there is something to clear. Idle scroll positions
      // (which is most of the page) now cost nothing but the tick.
      if (active || wasDirty) {
        ctx.clearRect(0, 0, cssW, cssH);
        wasDirty = active;
      }

      if (active) {
        let drawn = 0;
        ctx.globalCompositeOperation = "lighter";

        for (const e of sections.values()) {
          if (!e.particles || e.clipFraction <= 0 || e.clipFraction >= 1) continue;

          const ps = e.particles;
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i];
            if (p.alpha < 0.006 || p.currentSize <= 0) continue;

            // Cull anything that has drifted off-canvas.
            if (p.currentX < -40 || p.currentX > cssW + 40 ||
                p.currentY < -40 || p.currentY > cssH + 40) continue;

            const s = p.currentSize * GLOW;
            const idx = (p.heat * LAST) | 0;
            const spr = sprites[LAST - idx];

            // Wide, faint spill from the hottest embers only, so the cost
            // stays on the ~10% that actually carry the light.
            if (p.spark) {
              const hs = s * HALO;
              ctx.globalAlpha = p.alpha * HALO_A;
              ctx.drawImage(spr, p.currentX - hs, p.currentY - hs, hs * 2, hs * 2);
            }

            ctx.globalAlpha = p.alpha > 1 ? 1 : p.alpha;
            ctx.drawImage(spr, p.currentX - s, p.currentY - s, s * 2, s * 2);
            drawn++;
          }
        }

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";

        if (import.meta.env.DEV) stats.drawn += drawn;
      }

      if (import.meta.env.DEV) {
        const d = performance.now() - t0;
        stats.n++; stats.total += d; if (d > stats.max) stats.max = d;
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
