import { lazy, Suspense, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const Tesseract = lazy(() => import("./Tesseract"));

/*
 * Stable refs outside the component so framer-motion doesn't re-run
 * animations when the parent re-renders (it compares by reference).
 */

// Teleport IN — fast cubic-bezier with back-ease overshoot.
// Deterministic: scale is EXACTLY 1.0 at t=0.32s, no oscillation.
// [0.34, 1.56, 0.64, 1] overshoots ~10 % then snaps to 1 → "pop" feel.
const IN_ANIMATE = { scale: 1, opacity: 1 };
const IN_TRANSITION = {
  scale:   { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
  opacity: { duration: 0.14, ease: "easeOut" },
};

// Teleport OUT — quick pulse then collapse (0.22 s total)
const OUT_ANIMATE = {
  scale:   [1, 1.14, 0],
  opacity: [1, 1,    0],
  transition: {
    duration: 0.22,
    times:    [0, 0.18, 1],
    ease:     "easeIn",
  },
};

/* ─────────────────────────────────────────────────────────────────
 * TeleportEffects
 * Renders the expanding ring + flash that play once on every mount
 * (i.e. once on every teleport-IN).  They have no exit props so they
 * simply vanish with the parent's exit animation.
 * ───────────────────────────────────────────────────────────────── */
function TeleportEffects() {
  return (
    <>
      {/* Primary cyan ring — expands outward fast */}
      <motion.div
        initial={{ scale: 0.6,  opacity: 1   }}
        animate={{ scale: 2.7,  opacity: 0   }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.4, 1] }}
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "50%",
          border:       "2.5px solid rgba(0, 200, 255, 0.95)",
          boxShadow:    "0 0 18px rgba(0,200,255,0.9), 0 0 40px rgba(0,200,255,0.45)",
          pointerEvents:"none",
        }}
      />

      {/* Secondary ring — delayed, thinner */}
      <motion.div
        initial={{ scale: 0.6,  opacity: 0.65 }}
        animate={{ scale: 2.0,  opacity: 0    }}
        transition={{ duration: 0.50, delay: 0.08, ease: "easeOut" }}
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "50%",
          border:       "1px solid rgba(120, 220, 255, 0.75)",
          pointerEvents:"none",
        }}
      />

      {/* Cyan radial flash — fades in ~300 ms */}
      <motion.div
        initial={{ opacity: 0.75 }}
        animate={{ opacity: 0    }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,220,255,0.60) 0%, rgba(0,180,255,0.14) 55%, transparent 80%)",
          pointerEvents:"none",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * FloatingSphere — the single source of truth for the Tesseract.
 * Only ONE canvas is ever mounted at a time (AnimatePresence mode="wait"
 * ensures the old one fully exits before the new one enters).
 * ───────────────────────────────────────────────────────────────── */
export default function FloatingSphere() {
  const isMobile = window.innerWidth < 768;
  const [phase, setPhase] = useState("hero"); // "hero" | "mini"

  // Compute start geometry once on mount from viewport dimensions
  const geo = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Fill the right ~42 % column of the content area (sidebar = 100 px)
    const size  = Math.min(520, Math.max(300, Math.round(vw * 0.36)));
    // Centre of right column from right edge
    const right = Math.max(16, Math.round((vw - 100) * 0.21 - size / 2));
    const top   = Math.round((vh - size) / 2);
    // Teleport fires after scrolling 45 % of one viewport height
    const threshold = Math.round(vh * 0.45);
    return { size, top, right, threshold };
  }, []);

  // Cooldown ref: block new phase changes while a teleport is in-flight.
  // Total animation time = exit (0.22 s) + enter (0.32 s) = 0.54 s → use 600 ms.
  const phaseRef  = useRef("hero");
  const cooldown  = useRef(0);
  const COOLDOWN  = 620; // ms

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    if (isMobile) return; // mobile always stays mini — no phase switching
    const now = Date.now();
    if (now - cooldown.current < COOLDOWN) return;

    const cur = phaseRef.current;
    let next = cur;
    if (cur === "hero" && v > geo.threshold)        next = "mini";
    if (cur === "mini" && v < geo.threshold * 0.55) next = "hero";

    if (next !== cur) {
      phaseRef.current  = next;
      cooldown.current  = now;
      setPhase(next);
    }
  });

  const fixed = { position: "fixed", zIndex: 50, pointerEvents: "none" };

  // On mobile, always render mini at top-right — no hero phase
  if (isMobile) {
    return (
      <motion.div
        key="mini-mobile"
        initial={{ scale: 0, opacity: 0 }}
        animate={IN_ANIMATE}
        transition={IN_TRANSITION}
        style={{ ...fixed, top: 8, right: 8, width: 72, height: 72 }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={null}><Tesseract /></Suspense>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "hero" ? (
        <motion.div
          key="hero"
          initial={{ scale: 0, opacity: 0 }}
          animate={IN_ANIMATE}
          transition={IN_TRANSITION}
          exit={OUT_ANIMATE}
          style={{ ...fixed, top: geo.top, right: geo.right, width: geo.size, height: geo.size }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <Suspense fallback={null}><Tesseract /></Suspense>
          </div>
          <TeleportEffects />
        </motion.div>
      ) : (
        <motion.div
          key="mini"
          initial={{ scale: 0, opacity: 0 }}
          animate={IN_ANIMATE}
          transition={IN_TRANSITION}
          exit={OUT_ANIMATE}
          style={{ ...fixed, top: 16, right: 16, width: 120, height: 120 }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <Suspense fallback={null}><Tesseract /></Suspense>
          </div>
          <TeleportEffects />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
