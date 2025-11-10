import React from "react";

export default function Education() {
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Arizona",
      location: "Tucson, AZ, USA",
      duration: "Aug 2025 – May 2027 (Expected)",
      gpa: "- / 4.0",
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
      degree: "Bachelor of Engineering in Information Technology",
      institution: "K. J. Somaiya College of Engineering",
      location: "Mumbai, India",
      duration: "Aug 2021 – June 2025",
      gpa: "GPA: 8.27 / 10.0",
      coursework: [
        "Internet of Things (IoT)",
        "Data Structures in C++",
        "Control Systems",
      ],
      highlights: [
        "Capstone: Gait Analysis System using IMU Sensors and Machine Learning.",
        ],
    },
  ];

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col items-center justify-center px-10 lg:px-24 py-24 bg-transparent"
    >
      {/* Title */}
        <h2 className="text-5xl font-abolition text-cyan-400 mb-12 text-center">
          Education
        </h2>
      {/* Education Cards */}
      <div className="w-full max-w-6xl flex flex-col gap-10">
      {educationData.map((edu, i) => (
        <div key={i}>
          <div
            className="rounded-2xl p-8 md:p-10 flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)] 
           transition-all duration-300"
          >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold font-grotesk text-white">
                  {edu.degree}
                </h3>
                <span className="text-cyan-400 font-semibold font-semibold font-grotesk text-lg">
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
              <div className="mb-4">
                <h4 className="text-cyan-400 font-semibold font-semibold font-grotesk mb-1">Key Coursework:</h4>
                <ul className="list-disc list-inside font-regular font-grotesk text-gray-300 space-y-1">
                  {edu.coursework.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              {edu.highlights && (
                <div>
                  <h4 className="text-cyan-400 font-semibold font-semibold font-grotesk mb-1">
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
          </div>
        ))}
      </div>
    </section>
  );
}
