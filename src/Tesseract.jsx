import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import energyVertex from "./shaders/energyVertex.glsl";
import energyFragment from "./shaders/energyFragment.glsl";

// Custom material
const EnergyMaterial = shaderMaterial({ uTime: 0 }, energyVertex, energyFragment);
extend({ EnergyMaterial });

function AnimatedCube() {
  const cubeRef = useRef();
  const materialRef = useRef();
  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.set(y * 0.6, x * 0.6);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (materialRef.current) materialRef.current.uTime = t;

    if (cubeRef.current) {
      cubeRef.current.rotation.x +=
        (targetRotation.current.x - cubeRef.current.rotation.x) * 0.08;
      cubeRef.current.rotation.y +=
        (targetRotation.current.y - cubeRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[3, 3, 3]} />
      <energyMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Tesseract() {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{
        width: "300px",
        height: "300px",
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [3, 3, 3], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[4, 4, 4]} intensity={1.1} />
          <AnimatedCube />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.7}
              luminanceSmoothing={0.25}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
