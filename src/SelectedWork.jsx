import React from "react";
import DisintegrateOnScroll from "./DisintegrateOnScroll";
export default function SelectedWork() {
  const projects = [
    {
      title:
        "Gait Analysis Using Inertial Measurement Unit Sensors and Machine Learning",
      date: "Jan 2024 – Jan 2025",
      tech: "Python, TensorFlow, Raspberry Pi, OpenSim, I²C Communication, MEMS Technology",
      details: [
        "Led an interdisciplinary team of 3 under 3 professors to design a real-time gait analysis system using multiple IMU sensors integrated via Raspberry Pi.",
        "Developed and optimized data acquisition and filtering pipelines, achieving over 92% accuracy in gait event detection and abnormality classification.",
        "Integrated processed data with OpenSim to simulate 3D musculoskeletal motion, enhancing visualization precision for clinical evaluation.",
        "Conducted hospital-based validation with physiotherapists, improving gait assessment consistency by 30% and enabling data-driven rehabilitation tracking.",
      ],
    },
    {
      title: "WeConnect – Non-Governmental Organization Collaboration Platform",
      date: "Jan – Apr 2024",
      tech: "HTML, CSS, JavaScript, PHP, MySQL",
      details: [
        "Engineered a scalable global platform enabling NGOs and social enterprises to collaborate on social and environmental projects.",
        "Built interactive modules for resource sharing, project matching, and idea exchange with secure user authentication and efficient MySQL data handling.",
        "Improved system scalability and data retrieval speed by 40% through optimized database queries and modular design architecture.",
      ],
    },
    {
      title: "Ticket Booking Website",
      date: "Jan – Apr 2023",
      tech: "HTML, CSS, JavaScript, PHP, MySQL",
      details: [
        "Designed and deployed a dynamic event management web application used by multiple college councils for registration, event promotion, and audience engagement.",
        "Developed and integrated real-time MySQL queries and sponsor listing features, supporting hundreds of concurrent users during event peaks.",
        "Enhanced front-end responsiveness and reduced page load time by 35%, improving overall user experience and retention.",
      ],
    },
  ];

  return (
    <section
      id="work"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-transparent"
    ><DisintegrateOnScroll>
      <h2 className="text-5xl font-abolition mb-12 text-center bg-clip-text">
        Selected Work
      </h2></DisintegrateOnScroll>
      <DisintegrateOnScroll>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 font-grotesk text-gray-300">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="group bg-[rgba(0,255,255,0.05)] backdrop-blur-md border border-[rgba(0,255,255,0.2)] rounded-2xl p-8 transition-all duration-500 ease-out transform hover:border-[rgba(0,255,255,0.7)] hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] hover:bg-[rgba(0,255,255,0.08)]"
          >
            <h3 className="text-cyan-400 text-2xl font-semibold mb-2 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-all">
              {proj.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{proj.date}</p>
            <p className="text-sm text-cyan-300 mb-4">
              <strong>Technologies:</strong> {proj.tech}
            </p>
            <ul className="list-disc text-left ml-5 space-y-2 text-[0.95rem]">
              {proj.details.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </DisintegrateOnScroll>
    </section>
  );
}
