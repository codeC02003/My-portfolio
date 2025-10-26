import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function EnergyParticles() {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 6;
    return arr;
  }, []);

  const pointsRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.1;
      pointsRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.07}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function GlowingCube() {
  const cubeRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cubeRef.current.rotation.x = t * 0.5;
    cubeRef.current.rotation.y = t * 0.6;

    const pulse = (Math.sin(t * 3) + 1) / 2;
    const intensity = 2 + pulse * 2;
    if (innerRef.current) innerRef.current.material.emissiveIntensity = intensity;
  });

  const outerMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ccff,
    emissive: 0x00ffff,
    emissiveIntensity: 5,
    metalness: 0.2,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  return (
    <group ref={cubeRef}>
      {/* Outer glowing cube */}
      <mesh material={outerMaterial}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
      </mesh>

      {/* Inner light core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          emissive={new THREE.Color(0x00ffff)}
          emissiveIntensity={6}
          color={new THREE.Color(0x0088ff)}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <EnergyParticles />
    </group>
  );
}

export default function Tesseract() {
  return (
    <div
      className="w-[300px] h-[300px] mx-auto my-8 relative"
      style={{ filter: "drop-shadow(0 0 30px #00ffff)" }}
    >
      <Canvas
        camera={{ position: [3, 3, 3], fov: 60 }}
        style={{
          background: "transparent",
          cursor: "grab",
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#00ffff" />
        <pointLight position={[-3, -3, -3]} intensity={1.5} color="#0077ff" />
        <GlowingCube />
      </Canvas>

      {/* Shadow under the cube */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-40 h-4 rounded-full bg-cyan-500/40 blur-2xl opacity-60"></div>
    </div>
  );
}
