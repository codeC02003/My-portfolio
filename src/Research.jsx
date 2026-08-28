import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Research() {
  const research = [
    {
      role: "Graduate Researcher",
      title: "Chart Understanding and Reasoning with Vision-Language Models",
      advisor: "Supervised by Prof. Takanori Fujiwara",
      lab: { name: "D-REP Lab", url: "https://d-rep.org/" },
      institution: "University of Arizona",
      period: null,
      ongoing: true,
      bullets: [
        "Looking at how large language models and vision-language models actually read a chart: what they pull out correctly, what they get wrong, and where they're reasoning rather than pattern matching.",
        "Working across the usual chart understanding tasks. Getting the data back out, captioning, visual question answering, visualization literacy, and generating the code that would draw the chart.",
        "Trying to improve automated chart understanding through multimodal learning, retrieval, and giving the model something more structured to work with than raw pixels.",
        "Reading and writing up recent work on chart reasoning, visualization refinement, accessibility, and how people and these systems end up working together.",
        "Exploring ways to turn a chart into a representation interpretable enough to support analysis and description further down the line.",
      ],
      tagsLabel: "Research Areas",
      tags: [
        "Data Visualization",
        "Vision-Language Models (VLMs)",
        "Large Language Models (LLMs)",
        "Multimodal AI",
        "Chart Understanding",
        "Human-AI Interaction",
        "Information Retrieval",
      ],
    },
    {
      role: "Research Assistant / Team Lead",
      title: "Gait Analysis Using Inertial Measurement Unit Sensors and Machine Learning",
      advisor: "Advised by three faculty members from three different departments",
      institution: "K. J. Somaiya School of Engineering",
      period: "Jan 2024 – Jan 2025",
      ongoing: false,
      bullets: [
        "Led a team of three building a real-time gait analysis system from several IMU sensors wired to a Raspberry Pi.",
        "Wrote the data acquisition, preprocessing and machine learning pipelines in Python and TensorFlow, getting past 92% accuracy on gait event detection and abnormality classification.",
        "Fed the processed motion data into OpenSim to generate 3D musculoskeletal simulations, which is what made the output useful to clinicians rather than just plots on a screen.",
        "Ran validation in a hospital alongside physiotherapists. Assessment consistency improved by about 30%, which was the number that mattered.",
        "The wider question behind it was whether wearable sensing and MEMS hardware can make gait assessment objective at a cost that actually scales.",
      ],
      tagsLabel: "Technologies",
      tags: [
        "Python",
        "TensorFlow",
        "Raspberry Pi",
        "OpenSim",
        "IMU Sensors",
        "MEMS Technology",
        "I²C Communication",
        "Machine Learning",
      ],
    },
  ];

  return (
    <section
      id="research"
      className="flex flex-col items-center px-6 lg:px-10 py-12 bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-6xl">
      <SectionHeading index="04 / RESEARCH" title="Research Experience" />

      <div className="w-full flex flex-col gap-8">
        {research.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ ...SPRING, delay: i * 0.1 }}
          >
            <div className="panel panel-corner p-8 md:p-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-cyan-400 text-xl md:text-2xl font-semibold font-grotesk">
                    {r.role}
                  </h3>
                  {r.ongoing && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300/80 text-xs font-grotesk tracking-[2px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ONGOING
                    </span>
                  )}
                </div>
                {r.period && (
                  <span className="text-gray-400 font-grotesk text-sm md:text-base shrink-0">
                    {r.period}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-2xl md:text-3xl font-semibold font-grotesk text-white mb-3">
                {r.title}
              </h4>

              {/* Advisor + lab + institution */}
              <p className="text-gray-400 font-grotesk italic text-sm md:text-base mb-6">
                {r.advisor} at{" "}
                {r.lab && (
                  <>
                    <a
                      href={r.lab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 not-italic font-semibold hover:text-cyan-300 hover:underline transition-colors"
                    >
                      {r.lab.name}
                    </a>
                    {", "}
                  </>
                )}
                {r.institution}
              </p>

              {/* Bullets */}
              <ul className="font-regular font-grotesk text-gray-300 space-y-2.5 leading-relaxed mb-7">
                {r.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-cyan-400/45 shrink-0 mt-0.5">/</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div>
                <h5 className="text-xs text-cyan-400/70 font-semibold font-grotesk tracking-[0.22em] uppercase mb-2">
                  {r.tagsLabel}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((t, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full bg-[rgba(0,255,255,0.08)]
                                 border border-[rgba(0,255,255,0.3)] text-cyan-300 text-sm font-grotesk"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
