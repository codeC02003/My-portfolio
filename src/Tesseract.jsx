import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import energyVertex from "./shaders/energyVertex.glsl";
import energyFragment from "./shaders/energyFragment.glsl";
import { extend } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const EnergyMaterial = shaderMaterial(
  { uTime: 0 },
  energyVertex,
  energyFragment
);
extend({ EnergyMaterial });

function AnimatedCube() {
  const cubeRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    materialRef.current.uTime = clock.getElapsedTime();
    cubeRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    cubeRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <energyMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Tesseract() {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{
        width: "300px",   // smaller visible region
        height: "300px",
        overflow: "hidden", // hides any background beyond cube
        borderRadius: "50%", // optional, makes it circular crop
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [3, 3, 3], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent render
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={1.2}
          />
        </EffectComposer>

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#00ffff" />

        <AnimatedCube />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
