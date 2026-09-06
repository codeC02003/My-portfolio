/* ─────────────────────────────────────────────────────────────────────────
 * particleStore.js  ·  clip-line disintegration
 *
 * A fixed horizontal threshold sits at LINE_Y px from the viewport top.
 * As sections scroll upward past that line:
 *   • clip-path: inset() hides the portion that has crossed the line.
 *   • Glowing embers peel off the line and drift toward the sphere.
 * Scrolling back down reverses everything automatically.
 *
 * Three ideas make it read as material being consumed rather than a
 * decorative particle fountain:
 *
 *   1. Embers are emitted from where CONTENT actually is. Each section is
 *      sampled once into horizontal slices holding the x-extents of the real
 *      headings, paragraphs and cards at that depth, so the stream traces the
 *      shape of the layout and goes quiet across empty margins.
 *
 *   2. Emission is a BAND that follows the line, not the whole consumed area.
 *      Material well above the line was eaten a while ago and has stopped
 *      shedding; only what the line is cutting right now burns brightly.
 *
 *   3. The band widens and brightens with scroll speed. Stop scrolling and
 *      the stream eases back to a slower, still-lit glow at the cut rather
 *      than running at full tilt like a tap left on.
 *
 * Everything stays a pure function of (clipFraction, time), with no
 * integrated velocity state, which is what keeps reverse scrolling correct
 * and free.
 *
 * tick(nowMs) is called from ParticleCanvas's rAF loop with the rAF
 * timestamp. No React state; all mutations are in-place.
 * ───────────────────────────────────────────────────────────────────────── */

export const LINE_Y = 80; // viewport-y of the disintegration threshold

/* ── Sink ──────────────────────────────────────────────────────────────────
 * Where the embers are flowing to. FloatingSphere registers whichever atom
 * is currently mounted, and tick() reads its centre every frame, so the
 * stream tracks the atom through teleports and while the user drags it. If
 * nothing is registered we fall back to the mini atom's resting corner.
 * ───────────────────────────────────────────────────────────────────────── */
const DEFAULT_SINK = () => ({ x: window.innerWidth - 76, y: 76 });

let sinkEl = null;
const sink = DEFAULT_SINK();

export function registerSink(el) { sinkEl = el; }
export function unregisterSink(el) { if (sinkEl === el) sinkEl = null; }

// ── Mulberry32 seeded PRNG ────────────────────────────────────────────────
function seeded(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const FLIGHT_MS = 1500; // ms for one complete home -> sink loop
const SLICES    = 24;   // vertical resolution of the content map

// Particle budget scales with viewport so phones do not pay desktop cost.
function particleBudget() {
  const w = window.innerWidth;
  if (w < 700)  return 420;
  if (w < 1200) return 780;
  return 1200;
}

// How quickly emission falls off behind the cut, in fractions of section
// height. Smaller divisor = tighter, more surgical band.
const BAND_TIGHT = 11;
const BAND_LOOSE = 4.5; // used at full scroll speed

// Scroll speed (px/ms of clip travel) that counts as "fully active".
const FULL_SPEED = 1.6;

// ── Store: id → entry ─────────────────────────────────────────────────────
const store = new Map();

export function registerSection(id, wrapEl) {
  if (store.has(id)) return;
  store.set(id, {
    wrapEl,
    particles:   null,
    slices:      null,
    clipFraction: 0,
    emission:     0,   // smoothed 0..1 scroll activity
    _prevClipTop: null,
    _prevTime:    0,
    _appliedClip: "",  // last clip-path string written, to avoid redundant writes
    _rect:        null,
  });
}

export function unregisterSection(id) {
  const entry = store.get(id);
  if (entry?.wrapEl) entry.wrapEl.style.clipPath = "";
  store.delete(id);
}

/**
 * Called by ParticleCanvas on every animation frame with the rAF timestamp.
 *
 * Reads and writes are split into two passes on purpose. Interleaving
 * getBoundingClientRect() with a style write forces the browser to flush
 * layout again on the next read, so a 7-section page paid 7 synchronous
 * layouts per frame. Batching gives one.
 */
export function tick(nowMs) {
  // ── Pass 1: read geometry only ──────────────────────────────────────────
  if (sinkEl) {
    const r = sinkEl.getBoundingClientRect();
    // Width is 0 mid-teleport while the element is scaled to nothing; keep
    // the last good position rather than snapping the stream to the corner.
    if (r.width > 0) {
      sink.x = r.left + r.width / 2;
      sink.y = r.top + r.height / 2;
    }
  }
  // With nothing registered (the brief gap mid-teleport) we deliberately keep
  // the last known position. Resetting to the corner here would make the
  // stream snap away and back on every phase change.

  for (const entry of store.values()) {
    if (!entry.wrapEl) continue;
    entry._rect = entry.wrapEl.getBoundingClientRect();
  }

  // ── Pass 2: compute, then write styles ──────────────────────────────────
  for (const entry of store.values()) {
    const rect = entry._rect;
    if (!rect) continue;

    const clipTop      = Math.max(0, LINE_Y - rect.top);
    const clipFraction = Math.min(1, clipTop / Math.max(rect.height, 1));

    // Scroll activity from how fast the cut is travelling through this
    // section. Smoothed so a single stuttery frame does not flicker it.
    const dt = entry._prevTime ? Math.max(1, nowMs - entry._prevTime) : 16;
    if (entry._prevClipTop !== null) {
      const speed  = Math.abs(clipTop - entry._prevClipTop) / dt;
      const target = Math.min(1, speed / FULL_SPEED);
      // Rise fast, fall slow: embers keep glowing briefly after you stop.
      const k = target > entry.emission ? 0.35 : 0.045;
      entry.emission += (target - entry.emission) * k;
    }
    entry._prevClipTop = clipTop;
    entry._prevTime    = nowMs;

    // Only touch the DOM when the clip actually changes.
    const clipStr = clipTop > 0 ? `inset(${clipTop.toFixed(1)}px 0 0 0)` : "";
    if (clipStr !== entry._appliedClip) {
      entry.wrapEl.style.clipPath = clipStr;
      entry._appliedClip = clipStr;
    }

    entry.clipFraction = clipFraction;

    const live = clipFraction > 0 && clipFraction < 1;

    // Build lazily, the first time this section is actually being cut.
    if (live && !entry.particles) {
      entry.slices    = sampleContent(entry.wrapEl, rect);
      entry.particles = buildParticles(rect, entry.slices);
    }

    // Sections fully consumed or not yet reached cost nothing per frame.
    if (live && entry.particles) {
      computePositions(entry.particles, clipFraction, entry.emission, nowMs, sink.x, sink.y);
    }
  }
}

/** Canvas reads from this every frame. */
export function getAllSections() {
  return store;
}

/**
 * Call on window resize so particles regenerate with correct section
 * geometry. The old homeX values and content map would be stale after a
 * layout shift.
 */
export function invalidateParticles() {
  for (const entry of store.values()) {
    entry.particles = null;
    entry.slices    = null;
  }
}

/* ── Content map ───────────────────────────────────────────────────────────
 * Bucket the section's real text and card boxes into horizontal slices.
 * Runs once per section, in a single batched read. Capped so a very dense
 * section cannot cause a hitch at the moment it first crosses the line.
 * ───────────────────────────────────────────────────────────────────────── */
function sampleContent(el, rect) {
  const slices = [];
  for (let i = 0; i < SLICES; i++) slices.push([]);

  const nodes = el.querySelectorAll(
    "h1,h2,h3,h4,h5,p,li,span,a,button,img,svg,input,textarea"
  );
  const height = Math.max(rect.height, 1);
  const limit  = Math.min(nodes.length, 160);

  for (let i = 0; i < limit; i++) {
    const r = nodes[i].getBoundingClientRect();
    if (r.width < 6 || r.height < 4) continue;

    const s0 = Math.max(0, Math.floor(((r.top - rect.top) / height) * SLICES));
    const s1 = Math.min(SLICES - 1, Math.floor(((r.bottom - rect.top) / height) * SLICES));
    if (s1 < 0 || s0 > SLICES - 1) continue;

    for (let s = s0; s <= s1; s++) {
      if (slices[s].length < 12) slices[s].push(r.left, r.right);
    }
  }

  // Empty slices are left empty on purpose. Padding and the gaps between
  // paragraphs contain no material, so nothing should peel off them. They
  // used to fall back to the full section box, which is why a half-width
  // column still threw embers across the entire viewport.
  return slices;
}

// ── Particle builder ───────────────────────────────────────────────────────
function buildParticles(sectionRect, slices) {
  const count     = particleBudget();
  const particles = [];

  // Only depths that contain something can emit. Picking from this list
  // rather than from [0,1) means the whole budget lands on real content
  // instead of a share of it being spent on padding.
  const filled = [];
  for (let s = 0; s < SLICES; s++) if (slices[s].length) filled.push(s);
  if (filled.length === 0) {
    // Nothing measurable in this section: fall back to its own box.
    slices[0] = [sectionRect.left, sectionRect.right];
    filled.push(0);
  }

  for (let i = 0; i < count; i++) {
    const seed = i;

    // Depth through the section decides both when this ember is reached by
    // the cut and which content slice it peels off.
    const si    = filled[Math.min(filled.length - 1,
                    Math.floor(seeded(seed + 20) * filled.length))];
    const depth = (si + seeded(seed + 21)) / SLICES;
    const band  = slices[si];
    const pair  = Math.floor(seeded(seed + 90) * (band.length / 2)) * 2;
    const left  = band[pair];
    const right = band[pair + 1];

    const homeX = left + seeded(seed) * Math.max(1, right - left);
    const homeY = LINE_Y;

    particles.push({
      homeX, homeY,
      // Signed perpendicular offset of this ember's Bezier control point.
      // The control point itself is derived per frame, because the sink can
      // move, and a baked arc would keep pointing at where the atom used to be.
      wobble: (seeded(seed + 10) - 0.5) * 240,

      depth,                                        // 0..1 down the section
      size:        0.7  + seeded(seed + 40) * 2.0,
      // A tenth of the embers are hotter, larger and faster: real sparks are
      // not uniform, and the outliers are what sell it.
      spark:       seeded(seed + 80) > 0.9,
      phaseOffset: seeded(seed + 60) * FLIGHT_MS,
      speed:       0.62 + seeded(seed + 70) * 0.85,  // wider spread than before
      // Cheap procedural turbulence, no accumulated state.
      turbAmp:     6 + seeded(seed + 30) * 20,
      turbFreq:    1.5 + seeded(seed + 31) * 3.5,
      turbPhase:   seeded(seed + 32) * 6.283,
      lift:        14 + seeded(seed + 33) * 30,      // early buoyancy, px
      // Deterministic dice for the density gate, so thinning out is stable
      // rather than flickering frame to frame.
      dice:        seeded(seed + 100),

      // Mutable, written every frame:
      currentX: homeX, currentY: homeY, alpha: 0, currentSize: 0, heat: 0,
    });
  }

  return particles;
}

// ── Per-frame position math ────────────────────────────────────────────────
function easeInCubic(t) { return t * t * t; }

function computePositions(particles, clipFraction, emission, nowMs, sinkX, sinkY) {
  // The cut widens its burn band as it moves faster.
  const falloff = BAND_TIGHT - (BAND_TIGHT - BAND_LOOSE) * emission;
  // At rest a good majority stay lit; at speed, all of them. Raising the
  // floor keeps the cut looking alive when the reader pauses.
  const gate = 0.62 + 0.38 * emission;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Not reached by the cut yet.
    const recency = clipFraction - p.depth;
    if (recency < 0) { p.alpha = 0; p.currentSize = 0; continue; }

    // Density thinning: a stable subset drops out when scrolling is slow.
    if (p.dice > gate) { p.alpha = 0; p.currentSize = 0; continue; }

    // Emission band trailing the cut. Material consumed long ago is spent.
    const bandI = Math.exp(-recency * falloff);
    if (bandI < 0.010) { p.alpha = 0; p.currentSize = 0; continue; }

    // Time-based looping progress [0,1). Keeps embers in flight even while
    // the user is momentarily still.
    const lp = ((nowMs * p.speed + p.phaseOffset) % FLIGHT_MS) / FLIGHT_MS;

    const t  = easeInCubic(lp); // accelerates toward the sphere
    const mt = 1 - t;

    // Control point, rebuilt against wherever the atom is right now. One
    // sqrt per ember per frame, which is nothing next to the draw cost, and
    // it means dragging the atom bends the whole stream toward it.
    const dx  = sinkX - p.homeX;
    const dy  = sinkY - p.homeY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const cx  = (p.homeX + sinkX) * 0.5 + (-dy / len) * p.wobble;
    const cy  = (p.homeY + sinkY) * 0.5 + ( dx / len) * p.wobble;

    // Quadratic Bezier: home ──ctrl──► sink
    let x = mt * mt * p.homeX + 2 * mt * t * cx + t * t * sinkX;
    let y = mt * mt * p.homeY + 2 * mt * t * cy + t * t * sinkY;

    // Turbulence, strongest just after release and damped as the sphere
    // takes hold. Two trig calls per particle, no state to integrate.
    const swirl = t * p.turbFreq * 6.283 + p.turbPhase;
    const decay = mt * mt;
    x += Math.sin(swirl) * p.turbAmp * decay;
    y += Math.cos(swirl * 0.7) * p.turbAmp * 0.55 * decay;

    // Buoyancy: embers lift slightly before the pull wins.
    y -= p.lift * t * mt * 2;

    p.currentX = x;
    p.currentY = y;

    // Heat drives colour: white hot at release, cyan in flight, deep blue as
    // it is absorbed. Sparks stay hotter for longer.
    p.heat = p.spark ? Math.max(0, 1 - t * 0.75) : Math.max(0, 1 - t * 1.15);

    // Flash in, burn, fade out, all scaled by how live this part of the cut
    // still is.
    const envelope =
      lp < 0.07 ? lp / 0.07 :
      lp > 0.80 ? (1 - lp) / 0.20 : 1;

    // Subtle per-ember flicker, kept shallow so the field reads as bright
    // rather than restless.
    const flicker = 0.91 + 0.09 * Math.sin(nowMs * 0.018 * p.turbFreq + p.turbPhase);

    p.alpha       = envelope * bandI * flicker * (p.spark ? 1.55 : 1.28);
    p.currentSize = p.size * (p.spark ? 1.6 : 1.08) * Math.max(0.14, 1 - t * 0.76);
  }
}
