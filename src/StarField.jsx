import { useRef, useEffect } from "react";

// Star colour palette — weighted toward blue-white (like real stars)
const COLORS = [
  [255, 255, 255],  // pure white      (most common)
  [214, 236, 255],  // blue-white
  [188, 222, 255],  // pale blue
  [160, 208, 255],  // light blue
  [200, 255, 255],  // pale cyan
  [255, 248, 210],  // warm white      (rare — adds variety)
];

function rnd(a, b) { return Math.random() * (b - a) + a; }

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const cx = cv.getContext("2d");
    let W, H, stars, nebulae;

    function init() {
      W = cv.width  = window.innerWidth;
      H = cv.height = window.innerHeight;

      // ── Nebula clouds ─────────────────────────────────────────────
      nebulae = [
        { x: W * 0.22, y: H * 0.32, r: W * 0.22, c: [18,  55, 120], a: 0.062 },
        { x: W * 0.75, y: H * 0.58, r: W * 0.17, c: [55,  18, 100], a: 0.045 },
        { x: W * 0.52, y: H * 0.10, r: W * 0.15, c: [8,   80, 140], a: 0.052 },
        { x: W * 0.12, y: H * 0.78, r: W * 0.13, c: [30,  10,  90], a: 0.038 },
        { x: W * 0.88, y: H * 0.20, r: W * 0.12, c: [10,  60, 130], a: 0.040 },
      ];

      // ── Stars ─────────────────────────────────────────────────────
      // ~1 star per 2 600 px² → ~600–900 on a 1080p screen
      const count = Math.floor(W * H / 2600);
      stars = [];

      for (let i = 0; i < count; i++) {
        const roll     = Math.random();
        const isBright = roll > 0.978;          // ~2 %  → feature stars
        const isMed    = !isBright && roll > 0.87; // ~11 % → medium

        // 38 % of stars cluster in a Milky Way diagonal band
        let x, y;
        if (Math.random() < 0.38) {
          const t = Math.random();
          x = t * W       + rnd(-W * 0.10, W * 0.10);
          y = H * (0.85 - t * 0.70) + rnd(-H * 0.13, H * 0.13);
          x = Math.max(0, Math.min(W, x));
          y = Math.max(0, Math.min(H, y));
        } else {
          x = Math.random() * W;
          y = Math.random() * H;
        }

        const radius = isBright ? rnd(1.8, 3.0)
                     : isMed    ? rnd(0.9, 1.7)
                                : rnd(0.2, 0.9);

        // Warm-white (index 5) only 10 % of the time
        const ci = Math.random() < 0.10 ? 5 : Math.floor(Math.random() * 5);

        stars.push({
          x, y,
          r:       radius,
          rgb:     COLORS[ci],
          base:    isBright ? rnd(0.70, 1.00) : rnd(0.15, 0.80),
          isBright,
          // Only bright stars + 22 % of others twinkle
          tw:      isBright || Math.random() < 0.22,
          twS:     rnd(0.30, 2.00),   // twinkle speed (rad/s)
          twP:     rnd(0, Math.PI * 2), // twinkle phase offset
        });
      }
    }

    init();
    window.addEventListener("resize", init);

    // ── Draw a feature star: radial glow + core dot + cross beams ──
    function drawSparkle(x, y, r, a, [rv, gv, bv]) {
      // Outer soft halo
      const halo = cx.createRadialGradient(x, y, 0, x, y, r * 5.5);
      halo.addColorStop(0,   `rgba(${rv},${gv},${bv},${+(a * 0.55).toFixed(3)})`);
      halo.addColorStop(0.4, `rgba(${rv},${gv},${bv},${+(a * 0.18).toFixed(3)})`);
      halo.addColorStop(1,   `rgba(${rv},${gv},${bv},0)`);
      cx.beginPath();
      cx.arc(x, y, r * 5.5, 0, Math.PI * 2);
      cx.fillStyle = halo;
      cx.fill();

      // Core dot
      cx.beginPath();
      cx.arc(x, y, r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(${rv},${gv},${bv},${a})`;
      cx.fill();

      // Cross diffraction spikes
      cx.save();
      cx.strokeStyle = `rgba(${rv},${gv},${bv},1)`;
      cx.lineWidth   = 0.55;

      cx.globalAlpha = a * 0.50;
      const L = r * 6.5;
      cx.beginPath(); cx.moveTo(x - L, y); cx.lineTo(x + L, y); cx.stroke();
      cx.beginPath(); cx.moveTo(x, y - L); cx.lineTo(x, y + L); cx.stroke();

      cx.globalAlpha = a * 0.20;
      const D = r * 3.8;
      cx.beginPath(); cx.moveTo(x - D, y - D); cx.lineTo(x + D, y + D); cx.stroke();
      cx.beginPath(); cx.moveTo(x + D, y - D); cx.lineTo(x - D, y + D); cx.stroke();

      cx.restore();
    }

    let raf;

    function draw(ts) {
      cx.clearRect(0, 0, W, H);
      const t = ts * 0.001;

      // ── Nebulae ───────────────────────────────────────────────────
      for (const n of nebulae) {
        const grad = cx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0,   `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${n.a})`);
        grad.addColorStop(0.5, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${+(n.a * 0.30).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0)`);
        cx.beginPath();
        cx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        cx.fillStyle = grad;
        cx.fill();
      }

      // ── Stars ─────────────────────────────────────────────────────
      for (const s of stars) {
        let alpha = s.base;
        if (s.tw) {
          const pulse = 0.5 + 0.5 * Math.sin(t * s.twS + s.twP);
          alpha *= 0.35 + 0.65 * pulse;
        }

        if (s.isBright) {
          drawSparkle(s.x, s.y, s.r, alpha, s.rgb);
        } else {
          const [rv, gv, bv] = s.rgb;
          cx.beginPath();
          cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          cx.fillStyle = `rgba(${rv},${gv},${bv},${alpha})`;
          cx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        0,
        pointerEvents: "none",
        mixBlendMode:  "screen",   // bright stars glow over dark body bg; darks = transparent
      }}
    />
  );
}
