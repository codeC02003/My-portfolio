import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function EnergyBackground({ rotationSync }) {
  const count = 500;
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 10;
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Subtle orbit motion
      pointsRef.current.rotation.y = t * 0.05 + rotationSync.current.y * 0.3;
      pointsRef.current.rotation.x = t * 0.02 + rotationSync.current.x * 0.2;
    }
  });

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <Points ref={pointsRef} positions={positions}>
          <PointMaterial
            transparent
            color="#00ffff"
            size={0.08}
            sizeAttenuation
            depthWrite={false}
            opacity={0.6}
          />
        </Points>
      </Canvas>
    </div>
  );
}
