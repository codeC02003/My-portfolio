import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Tesseract from "./Tesseract";

const CUBE_SIZE = 300;
const DOCK_MARGIN = 16;
const START_TOP = 90;

export default function Hero() {
  const [isDocked, setIsDocked] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);

  const centerX = useMemo(() => (vw - CUBE_SIZE) / 2, [vw]);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    const onScroll = () => setIsDocked(window.scrollY > 1);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const wrapperStyle = isDocked
    ? {
        position: "fixed",
        top: DOCK_MARGIN,
        left: DOCK_MARGIN,
        transform: "translate(0, 0)",
      }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${centerX}px, ${START_TOP}px)`,
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
    >
      {/* Cube */}
      <motion.div
        style={{
          ...wrapperStyle,
          zIndex: 5,
          width: `${CUBE_SIZE}px`,
          height: `${CUBE_SIZE}px`,
          pointerEvents: "none",
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), top 0.6s, left 0.6s",
        }}
      >
        <Tesseract />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 mt-64">
        <h1 className="text-6xl font-abolition font-bold bg-gradient-to-r from-[#00FFFF] via-[#00FF88] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.9)]">
          Chinmay Mhatre
        </h1>
        <p className="mt-3 text-white/85 font-grotesk font-bold">
          <span className="text-cyan-400 font-semibold">AI</span> and{" "}
          <span className="text-cyan-400 font-semibold">Software</span>{" "}
          Enthusiast
        </p>
        <p className="mt-3 max-w-3xl mx-auto text-white font-grotesk font-heavy">
          Seeking a challenging and{" "}
          <span className="text-cyan-400 font-semibold">
            growth-oriented internship
          </span>{" "}
          opportunity in the field of{" "}
          <span className="text-cyan-400 font-semibold">
            Computer Science
          </span>
          , with an interest in{" "}
          <span className="text-cyan-400 font-semibold">
            Artificial Intelligence and Machine Learning
          </span>
          .
        </p>

        {/* Location */}
        <div className="flex items-center justify-center mt-6 text-cyan-400 font-grotesk text-lg drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
          <FaMapMarkerAlt className="mr-2 text-xl" />
          <span>Tucson, Arizona, USA</span>
        </div>
      </div>
    </section>
  );
}
