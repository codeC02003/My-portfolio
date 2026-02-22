/* ─────────────────────────────────────────────────────────────────────────
 * particleStore.js — clip-line disintegration
 *
 * A fixed horizontal threshold sits at LINE_Y px from the viewport top.
 * As sections scroll upward past that line:
 *   • clip-path: inset() hides the portion that has crossed the line.
 *   • Glowing particles emerge from the line and arc toward the sphere.
 * Scrolling back down reverses everything automatically.
 *
 * Particle travel is TIME-BASED (not scroll-based), so particles keep
 * flowing continuously even when the user stops scrolling.
 * clipFraction only controls which particles are visible (spawnAt gate).
 *
 * tick(nowMs) is called from ParticleCanvas's rAF loop with the rAF
 * timestamp.  No React state; all mutations are in-place.
 * ───────────────────────────────────────────────────────────────────────── */

export const LINE_Y = 80; // viewport-y of the disintegration threshold

const SINK_X = () => window.innerWidth - 76; // FloatingSphere mini centre-x
const SINK_Y = 76;                            // FloatingSphere mini centre-y

// ── Mulberry32 seeded PRNG ────────────────────────────────────────────────
function seeded(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const COLORS         = ["cyan", "cyan", "cyan", "white", "light"];
const PARTICLE_COUNT = 600;
const FLIGHT_MS      = 1400; // ms for one complete home → sink loop

// ── Store: id → { wrapEl, particles, clipFraction } ──────────────────────
const store = new Map();

export function registerSection(id, wrapEl) {
  if (store.has(id)) return;
  store.set(id, { wrapEl, particles: null, clipFraction: 0 });
}

export function unregisterSection(id) {
  const entry = store.get(id);
  if (entry?.wrapEl) entry.wrapEl.style.clipPath = "";
  store.delete(id);
}

/** Called by ParticleCanvas on every animation frame with the rAF timestamp. */
export function tick(nowMs) {
  for (const entry of store.values()) {
    const { wrapEl } = entry;
    if (!wrapEl) continue;

    const rect    = wrapEl.getBoundingClientRect();
    // Pixels of the element hidden above LINE_Y
    const clipTop = Math.max(0, LINE_Y - rect.top);
    // Fraction [0,1] of element height that has been consumed
    const clipFraction = Math.min(1, clipTop / Math.max(rect.height, 1));

    // Apply (or remove) clip-path directly on the wrapper element
    wrapEl.style.clipPath = clipTop > 0 ? `inset(${clipTop}px 0 0 0)` : "";

    // Generate particles lazily on first clip
    if (clipFraction > 0 && !entry.particles) {
      entry.particles = buildParticles(rect);
    }

    entry.clipFraction = clipFraction;
    if (entry.particles) computePositions(entry.particles, clipFraction, nowMs);
  }
}

/** Canvas reads from this every frame. */
export function getAllSections() {
  return store;
}

/**
 * Call on window resize so particles regenerate with correct section geometry.
 * The old homeX values would be stale after a layout shift.
 */
export function invalidateParticles() {
  for (const entry of store.values()) {
    entry.particles = null;
  }
}

// ── Particle builder ───────────────────────────────────────────────────────
function buildParticles(sectionRect) {
  const sinkX     = SINK_X();
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const seed = i;

    // homeX: random across section width; homeY: always AT the clip line.
    const homeX = sectionRect.left + seeded(seed) * sectionRect.width;
    const homeY = LINE_Y;

    // Quadratic Bézier control point — arcs the particle left or right
    const midX   = (homeX + sinkX) * 0.5;
    const midY   = (homeY + SINK_Y) * 0.5;
    const dx     = sinkX  - homeX;
    const dy     = SINK_Y - homeY;
    const len    = Math.sqrt(dx * dx + dy * dy) || 1;
    const perpX  = -dy / len;
    const perpY  =  dx / len;
    const wobble = (seeded(seed + 10) - 0.5) * 220; // ±110 px arc offset

    particles.push({
      homeX, homeY,
      ctrlX: midX + perpX * wobble,
      ctrlY: midY + perpY * wobble,
      sinkX,
      sinkY: SINK_Y,
      // clipFraction threshold at which this particle becomes visible
      spawnAt:     seeded(seed + 20),
      size:        0.8  + seeded(seed + 40) * 2.2,
      color:       COLORS[Math.floor(seeded(seed + 50) * COLORS.length)],
      // Time-based looping: each particle has a random start offset so
      // they're staggered across the loop and don't all pulse in sync.
      phaseOffset: seeded(seed + 60) * FLIGHT_MS,       // ms offset [0, FLIGHT_MS)
      speed:       0.75 + seeded(seed + 70) * 0.5,      // 0.75× – 1.25× speed variation
      // Mutable — written every frame:
      currentX: homeX, currentY: homeY, alpha: 0, currentSize: 0,
    });
  }

  return particles;
}

// ── Per-frame position math ────────────────────────────────────────────────
function easeInCubic(t) { return t * t * t; }

function computePositions(particles, clipFraction, nowMs) {
  for (const p of particles) {
    // Particle is invisible until the section has scrolled past its spawnAt
    if (clipFraction < p.spawnAt) {
      p.alpha       = 0;
      p.currentSize = 0;
      continue;
    }

    // Time-based looping progress [0, 1) — advances every frame regardless
    // of whether the user is scrolling.
    const lp = ((nowMs * p.speed + p.phaseOffset) % FLIGHT_MS) / FLIGHT_MS;

    const t  = easeInCubic(lp); // accelerates toward sphere
    const mt = 1 - t;

    // Quadratic Bézier: home ──ctrl──► sink
    p.currentX = mt * mt * p.homeX + 2 * mt * t * p.ctrlX + t * t * p.sinkX;
    p.currentY = mt * mt * p.homeY + 2 * mt * t * p.ctrlY + t * t * p.sinkY;

    // Quick flash on launch, sustained bright, fade into sphere
    p.alpha =
      lp < 0.08 ? lp / 0.08 :
      lp > 0.82 ? (1 - lp) / 0.18 : 1;

    p.currentSize = p.size * Math.max(0.1, 1 - t * 0.82);
  }
}
