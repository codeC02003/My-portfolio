import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Tesseract from "./Tesseract";

export default function Hero() {
  return (
    <section
  id="hero"
  className="relative flex items-center justify-between px-10 lg:px-24 min-h-[90vh] mt-4 overflow-hidden"
>
  {/* === LEFT SIDE GLASS BOX === */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
    className="relative z-10 w-full lg:w-3/4 max-w-4xl rounded-3xl p-10 flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)] 
           hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] 
           transition-all duration-300"
  >
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-5xl lg:text-6xl font-abolition font-bold text-cyan-400 flex items-center gap-3">
            HI THERE!
          </h1>
          <h2 className="text-4xl lg:text-5xl font-abolition font-bold text-white mt-1">
            I’M <span className="font-abolition font-bold bg-gradient-to-r from-[#00FFFF] via-[#00FF88] to-[#00FFFF] bg-clip-text text-transparent
">CHINMAY MHATRE</span>
          </h2>
          <p className="text-cyan-300 text-2xl font-semibold font-grotesk mt-2">
            AI and Software Enthusiast
          </p>
        </div>

        {/* About */}
        <p className="text-gray-300 font-grotesk leading-relaxed mb-5">
          I’m a Computer Science graduate student passionate about creating
          intelligent, scalable systems that merge algorithms, design, and
          data-driven creativity. I value reliability, clean architecture, and
          thoughtful design.
        </p>

        {/* Location + Seeking */}
        <div className="flex items-center gap-3 text-cyan-400 text-lg font-grotesk mb-4">
          <FaMapMarkerAlt className="text-xl" />
          <span>Tucson, Arizona, USA</span>
        </div>

        <p className="text-gray-300 font-grotesk leading-relaxed mb-6">
          Currently seeking a <span className="text-cyan-400 font-semibold">growth-oriented internship</span>{" "}
          in <span className="text-cyan-400 font-semibold">AI, Machine Learning, or Software Engineering</span> 
        </p>

        {/* Learning Section */}
        <div>
          <h3 className="text-cyan-400 font-semibold font-grotesk text-2xl mb-3">
            What I’m Learning
          </h3>
          <ul className="text-gray-300 space-y-1 list-disc list-inside">
            <li>Advanced AI and Generative Models</li>
            <li>Cloud Deployment and Scalability (AWS, Docker)</li>
            <li>Modern React & Tailwind design systems</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 mt-10">
          {[
            { icon: <FaGithub />, text: "GitHub", link: "https://github.com/codeC02003" },
            { icon: <FaLinkedin />, text: "LinkedIn", link: "https://www.linkedin.com/in/chinmay-mhatre-857825193/" },
            { icon: <FaEnvelope />, text: "Email", link: "mailto:chinmaymhatre02003@gmail.com" },
            { icon: <FaFileAlt />, text: "Resume", link: "https://drive.google.com/file/d/1ghBRawoioKQO9AtGH8MinY_i2qfN9HCN/view?usp=sharing" },
          ].map((btn, i) => (
            <a
              key={i}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400 
                        text-cyan-300 font-grotesk text-lg relative overflow-hidden
                        transition-all duration-500 ease-out
                        shadow-[0_0_25px_rgba(0,255,255,0.2)]
                        hover:scale-105"
            >
              <span className="absolute inset-0 bg-cyan-400 opacity-10 blur-2xl animate-glow"></span>
              {btn.icon}
              {btn.text}
            </a>
          ))}
        </div>
      </motion.div>

      
     {/* === Right-side Tesseract (Hidden on Mobile) === */}
      <div
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 
                  w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] 
                  items-center justify-center pointer-events-none"
      >
        <Tesseract />
      </div>
    </section>
  );
}
