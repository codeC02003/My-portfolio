import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Gait Analysis Using Inertial Measurement Unit Sensors and Machine Learning",
      date: "Jan 2024 – Jan 2025",
      short: "Designed a real-time gait analysis system integrating multiple IMU sensors via Raspberry Pi.",
      tags: ["Python", "TensorFlow", "Raspberry Pi", "OpenSim", "I²C", "MEMS"],
      problem: "Traditional gait analysis methods are expensive, limited to lab environments, and require bulky equipment, making it difficult for healthcare professionals to continuously monitor patient rehabilitation progress.",
      role: "Led the development of the gait analysis system under guidance from multiple professors. Collected and processed IMU sensor data, implemented Python-based algorithms for gait event detection and temporal-spatial parameter extraction, and designed a clean visualization and report generation interface for physiotherapists.",
      solution: "Developed a Python-based system integrating IMU sensors with machine learning to analyze patient gait in real time. The setup used Raspberry Pi for data collection, preprocessing, event detection, and parameter computation such as step time, cadence, and walking speed. The system generated physiotherapist-friendly visual reports for remote monitoring.",
      outcome: "Achieved over 90% accuracy in detecting key gait events (heel strike and toe-off), provided automated gait parameter reports, and significantly reduced analysis time compared to manual lab-based systems.",
    },
    {
      id: 2,
      title: "WeConnect – Non-Governmental Organization Collaboration Platform",
      date: "Jan – Apr 2024",
      short: "Built a scalable global collaboration platform for NGOs and social enterprises.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      problem: "NGOs often struggle to connect, collaborate, and share resources efficiently, leading to duplicated efforts and slower project execution.",
      role: "Designed and developed the full-stack platform, handling both frontend and backend implementation using HTML, CSS, JavaScript, PHP, and MySQL. Focused on user authentication, data management, and seamless communication between organizations.",
      solution: "Built an interactive online platform that enables NGOs to register, post initiatives, find collaborators, and share resources. The system features role-based access, project posting, and a dynamic search interface to simplify partnership building.",
      outcome: "Successfully built a fully functional prototype that demonstrates how NGOs can collaborate online. The project improved data management efficiency and showcased the potential for real-world implementation.",
    },
    {
      id: 3,
      title: "Ticket Booking Website",
      date: "Jan – Apr 2023",
      short: "Developed a dynamic event management and registration platform.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      problem: "Users face fragmented and unreliable options for booking event tickets online, often dealing with poor UI/UX and lack of centralized concert listings.",
      role: "Designed and developed the complete website from scratch using HTML, CSS, JavaScript, PHP, and MySQL. Created a responsive interface, integrated secure booking logic, and handled backend database operations for user and event management.",
      solution: "Developed a web-based ticket booking platform where users can browse concerts, view event details, and book tickets securely. Implemented features like real-time seat availability, booking confirmation, and event search functionality.",
      outcome: "Improved booking efficiency by 40% through streamlined UI and optimized database queries, offering a smooth and reliable ticketing experience.",
    },
  ];

  const [selected, setSelected] = useState(projects[0]);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col lg:flex-row items-start justify-center px-6 py-20 gap-10"
    >
      {/* === LEFT PANEL === */}
      <div className="flex-1 flex flex-col">
        {/* Title Above Cards */}
          <h2 className="text-5xl font-abolition text-white mb-5 mt-10">
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
                <h4 className="text-sm text-gray-400 tracking-widest font-medium font-groteskmb-1">
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
