import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Education() {
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Arizona",
      location: "Tucson, AZ, USA",
      duration: "2025 – Expected May 2027",
      gpa: "GPA: 3.167 / 4.0",
      coursework: [
        "Design & Analysis of Algorithms",
        "Software Engineering",
        "Computer Networks",
      ],
      highlights: [
        "Coursework has leaned toward algorithms and building things that hold up at scale.",
        "Graduate researcher in the D-REP Lab with Prof. Takanori Fujiwara, on chart understanding with vision-language models.",
      ],
    },
    {
      degree: "B.Tech in Information Technology",
      institution: "K. J. Somaiya School of Engineering",
      location: "Mumbai, India",
      duration: "2021 – 2025",
      gpa: "GPA: 8.27 / 10.0",
      coursework: [
        "Internet of Things (IoT)",
        "Data Structures in C++",
        "Theory of Computation",
      ],
      highlights: [
        "Capstone was the gait analysis work, run under three faculty advisors.",
      ],
    },
    {
      degree: "Higher Secondary Education (HSC)",
      institution: "Pace Junior Science College",
      location: "Thane (W), India",
      duration: "2019 – 2021",
      gpa: "Score: 84.67%",
      coursework: [],
      highlights: [],
    },
    {
      degree: "Secondary Education (SSC)",
      institution: "Sri Ma Vidyalaya",
      location: "Thane (W), India",
      duration: "2018 – 2019",
      gpa: "Score: 85.80%",
      coursework: [],
      highlights: [],
    },
  ];

  return (
    <section
      id="education"
      className="flex flex-col items-center px-6 lg:px-10 py-12 bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-6xl">
      <SectionHeading index="02 / BACKGROUND" title="Education" />

      <div className="w-full flex flex-col gap-8">
      {educationData.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ ...SPRING, delay: i * 0.1 }}
        >
          <div className="panel panel-corner p-8 md:p-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold font-grotesk text-white">
                  {edu.degree}
                </h3>
                <span className="text-cyan-400 font-semibold font-grotesk text-lg">
                  {edu.duration}
                </span>
              </div>

              {/* Institution Info */}
              <p className="text-gray-400 text-lg font-regular font-grotesk mb-2">
                {edu.institution}, {edu.location}
              </p>
              {edu.gpa && (
                <p className="text-gray-400 font-regular font-grotesk italic text-sm mb-4">{edu.gpa}</p>
              )}

              {/* Coursework + highlights sit side by side on wide screens so
                  the card reads as filled rather than mostly margin. */}
              {(edu.coursework.length > 0 ||
                (edu.highlights && edu.highlights.length > 0)) && (
                <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[rgba(0,200,255,0.12)]">
                  {edu.coursework.length > 0 && (
                    <div>
                      <h4 className="text-xs text-cyan-400/70 font-semibold font-grotesk tracking-[0.22em] uppercase mb-2">
                        Key Coursework
                      </h4>
                      <ul className="font-regular font-grotesk text-gray-300 space-y-1.5 text-[0.95rem]">
                        {edu.coursework.map((c, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-cyan-400/50 shrink-0">/</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {edu.highlights && edu.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs text-cyan-400/70 font-semibold font-grotesk tracking-[0.22em] uppercase mb-2">
                        Academic Highlights
                      </h4>
                      <ul className="font-regular font-grotesk text-gray-300 space-y-1.5 text-[0.95rem]">
                        {edu.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-cyan-400/50 shrink-0">/</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
        </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
