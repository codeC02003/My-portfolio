import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaCode, FaDocker,
  FaBrain, FaDatabase, FaSearch, FaChartBar, FaLayerGroup,
  FaProjectDiagram, FaRobot,
} from "react-icons/fa";
import {
  SiCplusplus, SiJavascript, SiTypescript, SiPhp, SiMysql, SiSqlite,
  SiHtml5, SiCss3, SiFigma, SiAdobeillustrator, SiTensorflow, SiPytorch,
  SiFastapi, SiHuggingface, SiVite, SiD3Dotjs,
} from "react-icons/si";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { icon: <FaPython color="#3776AB" />, name: "Python" },
        { icon: <SiCplusplus color="#00599C" />, name: "C / C++" },
        { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript" },
        { icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
        { icon: <SiMysql color="#4479A1" />, name: "SQL" },
        { icon: <SiPhp color="#777BB4" />, name: "PHP" },
      ],
    },
    {
      title: "AI / ML",
      skills: [
        { icon: <FaProjectDiagram color="#00CFFF" />, name: "Multi-Agent Systems" },
        { icon: <FaRobot color="#00CFFF" />, name: "LLM Agents" },
        { icon: <SiPytorch color="#EE4C2C" />, name: "PyTorch" },
        { icon: <SiTensorflow color="#FF6F00" />, name: "TensorFlow" },
        { icon: <FaChartBar color="#00CFFF" />, name: "XGBoost" },
        { icon: <FaBrain color="#00CFFF" />, name: "SHAP" },
        { icon: <SiHuggingface color="#FFD21E" />, name: "Hugging Face Transformers" },
        { icon: <FaLayerGroup color="#00CFFF" />, name: "RAG Pipelines" },
      ],
    },
    {
      title: "Web Development",
      skills: [
        { icon: <FaReact color="#61DAFB" />, name: "React" },
        { icon: <FaNodeJs color="#68A063" />, name: "Node.js" },
        { icon: <SiFastapi color="#009688" />, name: "FastAPI" },
        { icon: <SiHtml5 color="#E34F26" />, name: "HTML" },
        { icon: <SiCss3 color="#1572B6" />, name: "CSS" },
        { icon: <FaCode color="#00CFFF" />, name: "REST APIs" },
        { icon: <SiVite color="#646CFF" />, name: "Vite" },
        { icon: <SiD3Dotjs color="#F9A03C" />, name: "D3.js" },
      ],
    },
    {
      title: "Databases & Retrieval",
      skills: [
        { icon: <SiMysql color="#4479A1" />, name: "MySQL" },
        { icon: <SiSqlite color="#6BB8DC" />, name: "SQLite FTS5" },
        { icon: <FaSearch color="#00CFFF" />, name: "BM25" },
        { icon: <FaSearch color="#00CFFF" />, name: "Semantic Search" },
        { icon: <FaDatabase color="#00CFFF" />, name: "Reciprocal Rank Fusion" },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { icon: <FaGitAlt color="#F1502F" />, name: "Git" },
        { icon: <FaDocker color="#2496ED" />, name: "Docker" },
        { icon: <SiHuggingface color="#FFD21E" />, name: "Hugging Face Spaces" },
        { icon: <SiFigma color="#F24E1E" />, name: "Figma" },
        { icon: <SiAdobeillustrator color="#FF9A00" />, name: "Adobe Illustrator" },
        { icon: <FaCode color="#00CFFF" />, name: "OpenSim" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="flex flex-col items-center px-6 lg:px-10 py-12 relative scroll-mt-20"
    >
      <div className="w-full max-w-5xl z-10">
      <SectionHeading index="03 / TOOLKIT" title="Core Skills" />

      <div className="w-full flex flex-col gap-6">
        {skillCategories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="panel panel-corner px-8 py-6 flex flex-col gap-3"
          >
            <h3 className="text-xs font-semibold font-grotesk text-cyan-400/70 tracking-[0.22em] uppercase">
              {category.title}
            </h3>

            <div className="flex flex-wrap items-center gap-5">
              {category.skills.map((skill, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full
                        border border-cyan-400/35 bg-[rgba(0,200,255,0.05)]
                        text-gray-200 font-grotesk text-[0.95rem]
                        transition-all duration-300 ease-out
                        hover:border-cyan-400 hover:text-white
                        hover:bg-[rgba(0,255,255,0.09)]
                        hover:shadow-[0_0_16px_rgba(0,255,255,0.25)]"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
