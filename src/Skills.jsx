import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import {
  SiCplusplus, SiJavascript, SiMongodb, SiTailwindcss, SiTensorflow,
  SiFigma, SiCanva
} from "react-icons/si";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { icon: <SiCplusplus color="#00599C" />, name: "C++" },
        { icon: <FaPython color="#3776AB" />, name: "Python" },
        { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { icon: <FaReact color="#61DAFB" />, name: "React.js" },
        { icon: <FaNodeJs color="#68A063" />, name: "Node.js" },
        { icon: <SiTailwindcss color="#38B2AC" />, name: "Tailwind CSS" },
      ],
    },
    {
      title: "Tools & Cloud",
      skills: [
        { icon: <FaDocker color="#0db7ed" />, name: "Docker" },
        { icon: <FaAws color="#FF9900" />, name: "AWS" },
        { icon: <FaGitAlt color="#F1502F" />, name: "Git" },
      ],
    },
    {
      title: "Design",
      skills: [
        { icon: <SiFigma color="#F24E1E" />, name: "Figma" },
        { icon: <SiCanva color="#00C4CC" />, name: "Canva" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 relative"
    >

      {/* Section Title */}
      <DisintegrateOnScroll>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-abolition text-white mb-12 text-center z-10"
      >
        My{" "}
        <span className="text-cyan-400">
          Core Skills
        </span>
      </motion.h2></DisintegrateOnScroll>

      {/* Skill Bars */}
      
      <div className="w-full max-w-4xl flex flex-col gap-8 z-10">
        {skillCategories.map((category, i) => (
          <DisintegrateOnScroll>
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="rounded-2xl px-8 py-6 flex flex-col gap-4 lex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)] transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold font-grotesk text-cyan-400 mb-1">
              {category.title}
            </h3>

            <div className="flex flex-wrap items-center gap-5">
              {category.skills.map((skill, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400 
                        text-white font-grotesk text-lg relative overflow-hidden
                        transition-all duration-500 ease-out
                        shadow-[0_0_25px_rgba(0,255,255,0.2)]
                        hover:scale-105"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          </DisintegrateOnScroll>
        ))}
      </div>
      
    </section>
  );
}
