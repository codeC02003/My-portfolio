import { lazy, Suspense, useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { registerSink, unregisterSink } from "./particleStore";

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
 * DragHint
 * A one-off nudge under the mini atom telling people it can be moved.
 * Mounts with the mini atom, so the timer starts when it actually appears
 * rather than at page load. Module-level flag keeps it to the first time in
 * a session: repeating it on every teleport would nag.
 * ───────────────────────────────────────────────────────────────── */
let hintUsed = false;

function DragHint() {
  const [show, setShow] = useState(!hintUsed);

  useEffect(() => {
    if (!show) return;
    hintUsed = true;
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.45 }}
      style={{
        position:      "absolute",
        top:           "100%",
        // Anchored to the atom's right edge, not centred under it. The atom
        // rests 8-16px from the viewport edge, so a centred label runs off
        // screen and gets clipped to "DRAG M". Growing inward keeps it whole
        // both at rest and wherever it gets dragged.
        right:         0,
        marginTop:     -2,
        whiteSpace:    "nowrap",
        pointerEvents: "none",
        fontFamily:    "var(--font-grotesk, sans-serif)",
        fontSize:      9,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color:         "rgba(103, 232, 249, 0.8)",
        textShadow:    "0 0 10px rgba(0,190,255,0.55)",
      }}
    >
      drag me
    </motion.div>
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

  /* Whichever atom is mounted becomes the target the disintegration embers
   * fly toward. particleStore reads this element's centre every frame, so a
   * dragged atom drags the whole stream along with it. */
  const mounted = useRef(null);
  const sinkRef = useCallback((el) => {
    if (el) {
      registerSink(el);
      mounted.current = el;
    } else if (mounted.current) {
      unregisterSink(mounted.current);
      mounted.current = null;
    }
  }, []);

  /* Let the mini atom be thrown anywhere on screen, but not off it. Framer's
   * constraints are offsets from the element's laid-out position. */
  const dragBounds = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = isMobile ? 72 : 120;
    const inset = isMobile ? 8 : 16;
    return {
      left:   -(vw - size - inset * 2),
      right:  inset,
      top:    -inset,
      bottom: vh - size - inset * 2,
    };
  }, [isMobile]);

  const dragProps = {
    drag: true,
    dragConstraints: dragBounds,
    dragMomentum: false,
    dragElastic: 0.06,
    whileDrag: { scale: 1.12 },
  };

  // Overrides the shared pointerEvents:"none" so the atom can be grabbed.
  const grabbable = {
    pointerEvents: "auto",
    cursor: "grab",
    touchAction: "none",
  };

  // On mobile, always render mini at top-right — no hero phase
  if (isMobile) {
    return (
      <motion.div
        key="mini-mobile"
        ref={sinkRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={IN_ANIMATE}
        transition={IN_TRANSITION}
        {...dragProps}
        style={{ ...fixed, ...grabbable, top: 8, right: 8, width: 72, height: 72 }}
      >
        <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
          <Suspense fallback={null}><Tesseract /></Suspense>
        </div>
        <DragHint />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "hero" ? (
        <motion.div
          key="hero"
          ref={sinkRef}
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
          ref={sinkRef}
          initial={{ scale: 0, opacity: 0 }}
          animate={IN_ANIMATE}
          transition={IN_TRANSITION}
          exit={OUT_ANIMATE}
          {...dragProps}
          style={{ ...fixed, ...grabbable, top: 16, right: 16, width: 120, height: 120 }}
        >
          {/* pointerEvents off inside, so the drag is never stolen by the
              canvas and the whole 120px square stays grabbable. */}
          <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
            <Suspense fallback={null}><Tesseract /></Suspense>
          </div>
          <TeleportEffects />
          <DragHint />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
