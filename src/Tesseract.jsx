import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Glow layers: bright white core → background-matching dark navy at edges
// so the glow bleeds seamlessly into the site's #040912 background
const GLOW_LAYERS = [
  { s: 0.30, ps: 0.06,  c: "#ffffff", o: 0.96 }, // pinpoint white core
  { s: 0.44, ps: 0.05,  c: "#b8f0ff", o: 0.82 }, // bright cyan
  { s: 0.60, ps: 0.04,  c: "#55ccff", o: 0.55 }, // cyan
  { s: 0.78, ps: 0.035, c: "#2299ee", o: 0.30 }, // blue-cyan
  { s: 1.00, ps: 0.030, c: "#1055aa", o: 0.18 }, // blue
  { s: 1.42, ps: 0.025, c: "#082244", o: 0.12 }, // dark blue  → approaching bg
  { s: 1.92, ps: 0.020, c: "#051530", o: 0.08 }, // very dark blue
  { s: 2.65, ps: 0.015, c: "#030a1c", o: 0.05 }, // near-background navy
  { s: 3.60, ps: 0.010, c: "#020812", o: 0.025 },// ≈ background (#040912)
];

// ─── Central glowing sphere ───────────────────────────────────────────────────
function GlowSphere() {
  const layerRefs = useRef([]);
  const lightRef  = useRef();

  // Alternate pulses so inner and outer layers breathe at different rates
  const PULSES = [1.6, 2.1, 1.6, 2.1, 1.6, 1.6, 2.1, 1.6, 1.6];
  const PHASES = [0.0, 1.0, 0.0, 1.0, 0.0, 0.5, 1.0, 0.3, 0.7];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    lightRef.current.intensity = 1.2 + (0.5 + 0.5 * Math.sin(t * 1.6)) * 1.0;

    GLOW_LAYERS.forEach((layer, i) => {
      const ref = layerRefs.current[i];
      if (!ref) return;
      const p = 0.5 + 0.5 * Math.sin(t * PULSES[i] + PHASES[i]);
      ref.scale.setScalar(layer.s * (1 + p * layer.ps));
      ref.material.opacity = layer.o * (0.80 + p * 0.20);
    });
  });

  return (
    <group>
      <pointLight ref={lightRef} color="#44aaff" intensity={1.2} distance={6} decay={2} />
      {GLOW_LAYERS.map((layer, i) => (
        <mesh key={i} ref={el => { layerRefs.current[i] = el; }}>
          <sphereGeometry args={[1, 28, 28]} />
          <meshBasicMaterial
            color={layer.c}
            transparent
            opacity={layer.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Single orbiting dot + glow ───────────────────────────────────────────────
function OrbitDot({ radius, startAngle, speed }) {
  const groupRef = useRef();
  const glowRef  = useRef();
  const angleRef = useRef(startAngle);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    angleRef.current += speed * delta;
    const a = angleRef.current;
    groupRef.current.position.set(radius * Math.cos(a), 0, radius * Math.sin(a));

    const p = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 3.5 + startAngle * 2);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.85 + p * 0.45);
      glowRef.current.material.opacity = 0.10 + p * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bright core dot */}
      <mesh>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color="#ffffff"
          depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Soft glow around dot */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#66ddff" transparent opacity={0.18}
          depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ─── Orbital ring (circle + dots) ─────────────────────────────────────────────
function OrbitalRing({ rotation, radius, speed, dots = 2, opacity = 0.70 }) {
  const ringPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      pts.push([radius * Math.cos(a), 0, radius * Math.sin(a)]);
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={rotation}>
      <Line
        points={ringPoints}
        color="#44ccff"
        lineWidth={1.8}
        transparent
        opacity={opacity}
      />
      {Array.from({ length: dots }, (_, i) => (
        <OrbitDot
          key={i}
          radius={radius}
          startAngle={(i / dots) * Math.PI * 2}
          speed={speed}
        />
      ))}
    </group>
  );
}

// ─── Floating sparkle particles ───────────────────────────────────────────────
function Particles() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      const r     = 1.6 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.material.opacity = 0.30 + 0.25 * Math.sin(clock.elapsedTime * 1.7);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#88ddff"
        size={0.042}
        transparent
        opacity={0.50}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Full atom scene ──────────────────────────────────────────────────────────
function AtomScene({ mouseRef }) {
  const groupRef   = useRef();
  const currentRot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    const { x, y } = mouseRef.current;
    // Smooth lazy follow — lerp factor 0.035 = ~2 s to settle
    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, -y * 0.38, 0.035);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y,  x * 0.52, 0.035);
    groupRef.current.rotation.x = currentRot.current.x;
    groupRef.current.rotation.y = currentRot.current.y;
  });

  return (
    <group ref={groupRef}>
      <GlowSphere />

      {/* 4 orbital rings at varied tilts — like an atom model */}
      <OrbitalRing rotation={[ 0.30,  0.00,  0.00]} radius={1.30} speed={ 0.70} dots={2} opacity={0.72} />
      <OrbitalRing rotation={[-0.50,  0.90,  0.00]} radius={1.45} speed={-0.50} dots={2} opacity={0.60} />
      <OrbitalRing rotation={[ 1.10,  0.40,  0.30]} radius={1.35} speed={ 0.85} dots={1} opacity={0.65} />
      <OrbitalRing rotation={[ 0.70, -1.20,  0.50]} radius={1.40} speed={-0.65} dots={2} opacity={0.55} />

      <Particles />
    </group>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
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
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.05} />
      <AtomScene mouseRef={mouseRef} />
    </Canvas>
  );
}
