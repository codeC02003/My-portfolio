import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Education() {
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Arizona",
      location: "Tucson, AZ, USA",
      duration: "2025 – Expected May 2027",
      gpa: null,
      coursework: [
        "Design & Analysis of Algorithms",
        "Software Engineering",
        "Computer Networks",
      ],
      highlights: [
        "Graduate coursework emphasizing algorithmic problem-solving and scalable design.",
      ],
    },
    {
      degree: "B.Tech in Information Technology",
      institution: "K. J. Somaiya College of Engineering",
      location: "Mumbai, India",
      duration: "2021 – 2025",
      gpa: "GPA: 8.27 / 10.0",
      coursework: [
        "Internet of Things (IoT)",
        "Data Structures in C++",
        "Theory of Computation",
      ],
      highlights: [
        "Capstone: Gait Analysis System using IMU Sensors and Machine Learning.",
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
      className="flex flex-col items-center justify-center px-10 lg:px-24 py-12 bg-transparent scroll-mt-20"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={SPRING}
        className="text-5xl font-abolition text-cyan-400 mb-12 text-center glow-text"
      >
        Education
      </motion.h2>

      <div className="w-full max-w-6xl flex flex-col gap-10">
      {educationData.map((edu, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ ...SPRING, delay: i * 0.1 }}
        >
          <div
            className="rounded-2xl p-8 md:p-10 flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)]
           hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
           transition-all duration-300"
          >
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
                {edu.institution} — {edu.location}
              </p>
              {edu.gpa && (
                <p className="text-gray-400 font-regular font-grotesk italic text-sm mb-4">{edu.gpa}</p>
              )}

              {/* Coursework */}
              {edu.coursework.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-cyan-400 font-semibold font-grotesk mb-1">Key Coursework:</h4>
                  <ul className="list-disc list-inside font-regular font-grotesk text-gray-300 space-y-1">
                    {edu.coursework.map((c, j) => (
                      <li key={j}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div>
                  <h4 className="text-cyan-400 font-semibold font-grotesk mb-1">
                    Academic Highlights:
                  </h4>
                  <ul className="list-disc list-inside font-regular font-grotesk text-gray-300 space-y-1">
                    {edu.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
        </motion.div>
        ))}
      </div>
    </section>
  );
}
