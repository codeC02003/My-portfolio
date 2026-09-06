import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────
 * Atom
 *
 * Three things carry the "this is a real object" read:
 *
 *   1. A nucleus with structure. A smooth glowing ball reads as a light
 *      source; a packed cluster of nucleons reads as matter. They jitter
 *      slightly, which is what sells it as held together rather than drawn.
 *
 *   2. Electrons that respect depth. Previously every dot used additive
 *      blending with depth writes off, so nothing ever passed behind
 *      anything. Now the nucleus writes depth and electrons test against it,
 *      so they genuinely disappear round the back.
 *
 *   3. Motion that is not uniform. Orbits are slightly elliptical, electrons
 *      speed up near the nucleus, and each orbital plane precesses on its own
 *      slow cycle so the arrangement never freezes into a logo.
 *
 * On bloom: @react-three/postprocessing is installed and a Bloom pass was
 * tried here, including the usual HalfFloatType workaround. Its EffectComposer
 * writes an opaque frame, which paints a hard-edged rectangle over the page
 * because this Canvas is transparent and floats above the layout. Until that
 * is solved the glow stays in-scene, via a small number of additive shells.
 * Keep the shell count low: past three they stop reading as light and start
 * reading as a blurry ball.
 * ───────────────────────────────────────────────────────────────────────── */

// ── Deterministic PRNG so the nucleus packs the same way every mount ──────
function seeded(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const NUCLEON_COUNT = 17;
const NUCLEUS_R     = 0.26; // packing radius
const NUCLEON_R     = 0.105;

/* ── Nucleus ───────────────────────────────────────────────────────────────
 * One instanced mesh, so the whole cluster is a single draw call. Protons
 * and neutrons differ only in tint; the point is the lumpy silhouette, not
 * particle physics.
 * ───────────────────────────────────────────────────────────────────────── */
function Nucleus() {
  const meshRef = useRef();
  const dummy   = useMemo(() => new THREE.Object3D(), []);

  // Rejection-sample a loose packing inside the sphere.
  const nucleons = useMemo(() => {
    const out = [];
    let seed = 0;
    while (out.length < NUCLEON_COUNT && seed < 4000) {
      const x = (seeded(seed++) - 0.5) * 2 * NUCLEUS_R;
      const y = (seeded(seed++) - 0.5) * 2 * NUCLEUS_R;
      const z = (seeded(seed++) - 0.5) * 2 * NUCLEUS_R;
      if (x * x + y * y + z * z > NUCLEUS_R * NUCLEUS_R) continue;
      const tooClose = out.some(
        (p) => (p.x - x) ** 2 + (p.y - y) ** 2 + (p.z - z) ** 2 < (NUCLEON_R * 1.35) ** 2
      );
      if (tooClose) continue;
      out.push({
        x, y, z,
        proton: out.length % 2 === 0,
        // Each nucleon vibrates on its own frequency and phase.
        f: 1.4 + seeded(seed++) * 2.2,
        p: seeded(seed++) * 6.283,
      });
    }
    return out;
  }, []);

  useEffect(() => {
    const m = meshRef.current;
    if (!m) return;
    const proton  = new THREE.Color("#eaf9ff");
    const neutron = new THREE.Color("#3ea8e8");
    nucleons.forEach((n, i) => m.setColorAt(i, n.proton ? proton : neutron));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [nucleons]);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    if (!m) return;
    const t = clock.elapsedTime;
    // Whole-nucleus breathing, plus per-nucleon jitter.
    const breathe = 1 + 0.028 * Math.sin(t * 1.15);

    for (let i = 0; i < nucleons.length; i++) {
      const n = nucleons[i];
      const j = 0.016;
      dummy.position.set(
        (n.x + Math.sin(t * n.f + n.p) * j) * breathe,
        (n.y + Math.sin(t * n.f * 1.31 + n.p * 1.7) * j) * breathe,
        (n.z + Math.cos(t * n.f * 0.87 + n.p * 0.6) * j) * breathe
      );
      dummy.scale.setScalar(1 + 0.05 * Math.sin(t * n.f * 0.5 + n.p));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NUCLEON_COUNT]}>
      <sphereGeometry args={[NUCLEON_R, 14, 14]} />
      {/* Opaque and depth-writing: this is the mass electrons hide behind. */}
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

/* ── Corona ────────────────────────────────────────────────────────────────
 * Three soft shells. This is the whole glow budget now that the bloom pass
 * is out, and it is deliberately small: past three they stop reading as
 * light and start reading as a blurry ball.
 * ───────────────────────────────────────────────────────────────────────── */
function Corona() {
  const inner = useRef();
  const mid   = useRef();
  const outer = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (inner.current) {
      const p = 0.5 + 0.5 * Math.sin(t * 1.5);
      inner.current.scale.setScalar(0.98 + p * 0.06);
      inner.current.material.opacity = 0.20 + p * 0.10;
    }
    if (mid.current) {
      const p = 0.5 + 0.5 * Math.sin(t * 1.2 + 0.6);
      mid.current.scale.setScalar(1.16 + p * 0.08);
      mid.current.material.opacity = 0.13 + p * 0.07;
    }
    if (outer.current) {
      const p = 0.5 + 0.5 * Math.sin(t * 0.95 + 1.1);
      outer.current.scale.setScalar(1.62 + p * 0.12);
      outer.current.material.opacity = 0.075 + p * 0.05;
    }
  });

  return (
    <group>
      <pointLight color="#5fc9ff" intensity={2.2} distance={7} decay={2} />
      <mesh ref={inner}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial
          color="#8fe6ff" transparent opacity={0.22} toneMapped={false}
          depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={mid}>
        <sphereGeometry args={[0.42, 22, 22]} />
        <meshBasicMaterial
          color="#4bb4ff" transparent opacity={0.15} toneMapped={false}
          depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={outer}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshBasicMaterial
          color="#1d6fd0" transparent opacity={0.09} toneMapped={false}
          depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ── Orbits ────────────────────────────────────────────────────────────────
 * Slightly elliptical, each plane precessing at its own rate.
 * ───────────────────────────────────────────────────────────────────────── */
const ORBITS = [
  { a: 1.30, ecc: 0.18, tilt: [ 0.30,  0.00, 0.00], speed:  0.95, n: 2, prec: 0.055 },
  { a: 1.46, ecc: 0.10, tilt: [-0.50,  0.90, 0.00], speed: -0.72, n: 2, prec: -0.041 },
  { a: 1.34, ecc: 0.24, tilt: [ 1.10,  0.40, 0.30], speed:  1.15, n: 1, prec: 0.068 },
  { a: 1.41, ecc: 0.14, tilt: [ 0.70, -1.20, 0.50], speed: -0.86, n: 2, prec: -0.030 },
];

const TRAIL_LEN  = 16;
const TRAIL_STEP = 0.052; // radians between trail samples

function OrbitPaths() {
  return (
    <>
      {ORBITS.map((o, i) => {
        const b   = o.a * Math.sqrt(1 - o.ecc * o.ecc);
        const pts = [];
        for (let k = 0; k <= 128; k++) {
          const th = (k / 128) * Math.PI * 2;
          pts.push([o.a * Math.cos(th), 0, b * Math.sin(th)]);
        }
        return (
          <group key={i} rotation={o.tilt}>
            <Line
              points={pts}
              color="#2f9fd8"
              lineWidth={1}
              transparent
              opacity={0.26}
              depthWrite={false}
            />
          </group>
        );
      })}
    </>
  );
}

/**
 * Every electron and every trail sample lives in one points buffer, so the
 * whole electron system is a single draw call. Trail positions are computed
 * analytically from the current angle rather than kept as history, which
 * means no per-frame allocation and nothing to reset when the tab is
 * backgrounded.
 */
function Electrons() {
  const ref = useRef();

  const { positions, colors, index } = useMemo(() => {
    const idx = [];
    ORBITS.forEach((o, oi) => {
      for (let e = 0; e < o.n; e++) {
        idx.push({ oi, start: (e / o.n) * Math.PI * 2 });
      }
    });
    const total = idx.length * TRAIL_LEN;
    const positions = new Float32Array(total * 3);
    const colors    = new Float32Array(total * 3);

    // Colour fade is fixed per trail slot, so it is written once.
    let c = 0;
    for (let i = 0; i < idx.length; i++) {
      for (let k = 0; k < TRAIL_LEN; k++) {
        const f = 1 - k / TRAIL_LEN;
        const b = f * f;
        if (k === 0) { colors[c++] = 1.9; colors[c++] = 2.0; colors[c++] = 2.0; }
        else         { colors[c++] = 0.22 * b; colors[c++] = 0.80 * b; colors[c++] = 1.25 * b; }
      }
    }
    return { positions, colors, index: idx };
  }, []);

  const mat = useMemo(() => new THREE.Matrix4(), []);
  const eul = useMemo(() => new THREE.Euler(), []);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t   = clock.elapsedTime;
    const arr = g.geometry.attributes.position.array;
    let w = 0;

    for (let i = 0; i < index.length; i++) {
      const { oi, start } = index[i];
      const o = ORBITS[oi];
      const b = o.a * Math.sqrt(1 - o.ecc * o.ecc);

      // Orbital plane precesses slowly about Y.
      eul.set(o.tilt[0], o.tilt[1] + t * o.prec, o.tilt[2]);
      mat.makeRotationFromEuler(eul);

      const base = start + t * o.speed;
      for (let k = 0; k < TRAIL_LEN; k++) {
        // Kepler-ish: sweep faster when nearer the nucleus. Cheap stand-in
        // for the real thing, but it kills the metronome feel.
        const raw = base - k * TRAIL_STEP * Math.sign(o.speed || 1);
        const th  = raw + o.ecc * Math.sin(raw);
        vec.set(o.a * Math.cos(th), 0, b * Math.sin(th)).applyMatrix4(mat);
        arr[w++] = vec.x; arr[w++] = vec.y; arr[w++] = vec.z;
      }
    }
    g.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      {/* depthTest on: electrons vanish behind the nucleus. */}
      <pointsMaterial
        size={0.085}
        sizeAttenuation
        vertexColors
        transparent
        toneMapped={false}
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Ambient field dust ────────────────────────────────────────────────────
function FieldDust() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(46 * 3);
    for (let i = 0; i < 46; i++) {
      const r     = 1.7 + seeded(i * 7 + 1) * 1.0;
      const theta = seeded(i * 7 + 2) * Math.PI * 2;
      const phi   = Math.acos(2 * seeded(i * 7 + 3) - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.material.opacity = 0.20 + 0.16 * Math.sin(clock.elapsedTime * 1.5);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7fd4ff" size={0.036} transparent opacity={0.30}
        toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Full atom scene ───────────────────────────────────────────────────────
function AtomScene({ mouseRef }) {
  const groupRef   = useRef();
  const currentRot = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const { x, y } = mouseRef.current;
    // Smooth lazy follow, lerp factor 0.035 = ~2 s to settle.
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, -y * 0.38, 0.035);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y,  x * 0.52, 0.035);
    groupRef.current.rotation.x = currentRot.current.x;
    // A slow constant drift so it still reads as alive with the mouse still.
    groupRef.current.rotation.y = currentRot.current.y + clock.elapsedTime * 0.045;
  });

  return (
    <group ref={groupRef}>
      <Nucleus />
      <Corona />
      <OrbitPaths />
      <Electrons />
      <FieldDust />
    </group>
  );
}

// ── Export ────────────────────────────────────────────────────────────────
export default function Tesseract() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.0], fov: 50 }}
      // MSAA matters again with no post pass to smooth the orbit lines.
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      // FloatingSphere animates this Canvas's wrapper with a scale transform.
      // R3F sizes itself from getBoundingClientRect, which reports the
      // TRANSFORMED box, so measuring mid-pop captured a shrunken size (about
      // 439px inside a 518px wrapper) and never corrected, because settling
      // back to scale 1 changes no layout and fires no resize. offsetSize
      // makes it measure offsetWidth/offsetHeight instead, which ignores
      // transforms.
      resize={{ offsetSize: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.05} />
      <AtomScene mouseRef={mouseRef} />
    </Canvas>
  );
}
