import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaCloud, FaCode, FaDocker } from "react-icons/fa";
import {
  SiCplusplus, SiJavascript, SiPhp, SiMysql,
  SiHtml5, SiCss3, SiFigma, SiAdobeillustrator, SiTensorflow,
  SiFastapi, SiHuggingface
} from "react-icons/si";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { icon: <FaPython color="#3776AB" />, name: "Python" },
        { icon: <SiCplusplus color="#00599C" />, name: "C / C++" },
        { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript" },
        { icon: <SiPhp color="#777BB4" />, name: "PHP" },
        { icon: <SiMysql color="#4479A1" />, name: "SQL" },
      ],
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { icon: <FaReact color="#61DAFB" />, name: "React" },
        { icon: <FaNodeJs color="#68A063" />, name: "Node.js" },
        { icon: <SiFastapi color="#009688" />, name: "FastAPI" },
        { icon: <SiTensorflow color="#FF6F00" />, name: "TensorFlow" },
        { icon: <SiHuggingface color="#FFD21E" />, name: "Hugging Face" },
        { icon: <FaGitAlt color="#F1502F" />, name: "Git" },
        { icon: <FaDocker color="#2496ED" />, name: "Docker" },
        { icon: <FaCode color="#00CFFF" />, name: "OpenSim" },
      ],
    },
    {
      title: "Web Development",
      skills: [
        { icon: <SiHtml5 color="#E34F26" />, name: "HTML" },
        { icon: <SiCss3 color="#1572B6" />, name: "CSS" },
        { icon: <SiMysql color="#4479A1" />, name: "MySQL" },
        { icon: <FaCode color="#00CFFF" />, name: "REST APIs" },
      ],
    },
    {
      title: "Design & Other",
      skills: [
        { icon: <SiFigma color="#F24E1E" />, name: "Figma" },
        { icon: <SiAdobeillustrator color="#FF9A00" />, name: "Adobe Illustrator" },
        { icon: <FaCloud color="#00BFFF" />, name: "Cloud Computing" },
        { icon: <FaCode color="#00CFFF" />, name: "NLP / RAG" },
        { icon: <FaCode color="#00CFFF" />, name: "FAISS" },
        { icon: <FaCode color="#00CFFF" />, name: "IoT Systems" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center px-6 py-12 relative scroll-mt-20"
    >

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-abolition text-white mb-12 text-center z-10"
      >
        My{" "}
        <span className="text-cyan-400 glow-text">
          Core Skills
        </span>
      </motion.h2>

      <div className="w-full max-w-4xl flex flex-col gap-8 z-10">
        {skillCategories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="rounded-2xl px-8 py-6 flex flex-col gap-4 flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)]
           hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
           transition-all duration-300"
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
        ))}
      </div>

    </section>
  );
}
