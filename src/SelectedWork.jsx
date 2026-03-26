import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "FinRAG – Multimodal Financial Document QA System",
      date: "Mar 2026",
      short: "Built a production-ready RAG system achieving 94–100% accuracy on real 10-K filings using hybrid retrieval, dynamic table extraction, and vision-language models.",
      tags: ["Python", "FastAPI", "React", "FAISS", "Qwen2-VL", "RoBERTa", "Docker"],
      problem: "Financial professionals spend hours manually extracting data from lengthy 10-K filings and annual reports. Generic LLMs hallucinate numbers, and traditional RAG systems fail on complex financial tables with multi-year columns.",
      role: "Sole developer — designed and built the entire end-to-end system: hybrid retrieval pipeline (BM25 + FAISS + cross-encoder reranking), dynamic table discovery engine, multi-model QA routing (table extraction, extractive QA, vision-language), and a React chat interface with PDF upload and markdown rendering.",
      solution: "Engineered a multi-stage pipeline: documents are chunked with sentence-aware splitting and indexed into both Whoosh (BM25) and FAISS (semantic). Retrieval merges results via Reciprocal Rank Fusion and cross-encoder reranking. Answers are routed through table extraction (instant for numeric lookups), RoBERTa-SQuAD2 (extractive spans), or Qwen2-VL-2B (vision-language reasoning) — selecting the highest-confidence, non-hallucinated response.",
      outcome: "Achieved 100% accuracy on Tandy Leather, Aaron's Holdings, and Materion Corp 10-Ks, and 94% on Apple's 10-K. Table lookups return in ~50ms with zero hallucination. Deployed on Hugging Face Spaces (backend) and Vercel (frontend) with Docker support.",
    },
    {
      id: 2,
      title: "Gait Analysis Using Inertial Measurement Unit Sensors and Machine Learning",
      date: "Jan 2024 – Jan 2025",
      short: "Led an interdisciplinary team to design a real-time gait analysis system using IMU sensors via Raspberry Pi.",
      tags: ["Python", "TensorFlow", "Raspberry Pi", "OpenSim", "I²C", "MEMS"],
      problem: "Traditional gait analysis is expensive, confined to lab environments, and requires bulky equipment — making it impractical for continuous rehabilitation monitoring by healthcare professionals.",
      role: "Led an interdisciplinary team of 3 under 3 professors. Developed data acquisition and filtering pipelines, implemented ML-based gait event detection, and integrated sensor data with OpenSim for 3D musculoskeletal simulation. Conducted hospital-based validation with physiotherapists.",
      solution: "Built a Python-based system integrating multiple IMU sensors with Raspberry Pi for real-time data collection, preprocessing, and gait event detection. Integrated processed data with OpenSim to simulate 3D musculoskeletal motion, enhancing visualization precision for clinical evaluation.",
      outcome: "Achieved over 92% accuracy in gait event detection and abnormality classification. Improved gait assessment consistency by 30% through hospital-based validation with physiotherapists, enabling data-driven rehabilitation tracking.",
    },
    {
      id: 3,
      title: "WeConnect – Non-Governmental Organization Collaboration Platform",
      date: "Jan – Apr 2024",
      short: "Engineered a scalable global platform enabling NGOs and social enterprises to collaborate on social and environmental projects.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      problem: "NGOs struggle to connect, collaborate, and share resources efficiently, resulting in duplicated efforts and slower execution of social and environmental projects.",
      role: "Designed and developed the full-stack platform using HTML, CSS, JavaScript, PHP, and MySQL. Built interactive modules for resource sharing, project matching, and idea exchange. Handled secure user authentication and efficient database management.",
      solution: "Engineered a scalable global platform enabling NGOs to register, post initiatives, find collaborators, and share resources. Implemented role-based access, dynamic search, and modular design architecture for scalability.",
      outcome: "Improved system scalability and data retrieval speed by 40% through optimized MySQL queries and modular architecture. Delivered a fully functional prototype ready for real-world deployment.",
    },
    {
      id: 4,
      title: "Ticket Booking Website",
      date: "Jan – Apr 2023",
      short: "Designed and deployed a dynamic event management web application used by multiple college councils.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      problem: "College councils lacked a reliable, centralized platform for event registration, promotion, and audience engagement — leading to fragmented and error-prone manual processes.",
      role: "Designed and developed the complete web application from scratch. Integrated real-time MySQL queries and sponsor listing features. Built a responsive front-end supporting hundreds of concurrent users during event peaks.",
      solution: "Developed a dynamic event management platform for registration, event promotion, and audience engagement. Implemented real-time seat availability, booking confirmation, and sponsor listing features.",
      outcome: "Reduced page load time by 35%, improving overall user experience and retention. Successfully supported hundreds of concurrent users during peak event periods across multiple college councils.",
    },
  ];

  const [selected, setSelected] = useState(projects[0]);

  return (
    <section
      id="projects"
      className="flex flex-col lg:flex-row items-start justify-center px-6 py-12 gap-10 scroll-mt-20"
    >
      {/* === LEFT PANEL === */}
      <div className="flex-1 flex flex-col">
        {/* Title Above Cards */}
          <h2 className="text-5xl font-abolition text-cyan-400 mb-5 mt-10 glow-text">
            Projects
          </h2>

        {/* Project List */}
        <div className="flex flex-col gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              onClick={() => setSelected(p)}
              whileHover={{ scale: 1.03 }}
              className={`cursor-pointer p-5 rounded-2xl border ${
                selected.id === p.id
                  ? "border-cyan-400 bg-[rgba(0,255,255,0.1)] shadow-[0_0_25px_rgba(0,255,255,0.5)]"
                  : "border-[rgba(0,255,255,0.15)] bg-[rgba(0,255,255,0.05)]"
              } transition-all duration-300`}
            >
              <h4 className="text-gray-400 text-sm font-semibold font-grotesk tracking-widest">{p.date}</h4>
              <h3 className="text-xl text-white font-semibold font-grotesk mt-1">{p.title}</h3>
              <p className="text-gray-300 mt-2 text-sm font-regular font-grotesk">{p.short}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === RIGHT PANEL === */}
      <div
        className="flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)]
                    rounded-2xl p-8 min-h-[400px] transition-all duration-500"
      ><AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[rgba(0,255,255,0.08)]
                             border border-[rgba(0,255,255,0.3)] text-cyan-300 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold font-grotesk text-white mb-6">
              {selected.title}
            </h3>

            {/* Details */}
            <div className="space-y-5 text-left">
              <div>
                <h4 className="text-sm text-gray-400 font-medium font-grotesk tracking-widest mb-1">
                  PROBLEM
                </h4>
                <p className="text-gray-200 text-sm leading-relaxed font-regular font-grotesk italic">
                  {selected.problem || "[Add the problem statement here]"}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 tracking-widest font-medium font-grotesk mb-1">
                  MY ROLE
                </h4>
                <p className="text-gray-200 text-sm leading-relaxed font-regular font-grotesk italic">
                  {selected.role || "[Describe your individual contribution here]"}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 tracking-widest font-medium font-grotesk mb-1">
                  SOLUTION
                </h4>
                <p className="text-gray-200 text-sm leading-relaxed italic font-regular font-grotesk">
                  {selected.solution || "[Explain your technical approach or system design]"}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 tracking-widest mb-1 font-medium font-grotesk">
                  OUTCOME (QUANTIFIED)
                </h4>
                <p className="text-gray-200 text-sm leading-relaxed italic font-regular font-grotesk">
                  {selected.outcome || "[Add measurable results or improvements here]"}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
