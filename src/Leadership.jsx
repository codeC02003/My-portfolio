import React from "react";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function Leadership() {
  const experiences = [
    {
      title: "KJSCE Insignia - Art Team Member",
      details:
        "Contributed to the creation of art decorations for college events, applying creativity and teamwork skills to enhance event aesthetics and atmosphere.",
    },
    {
      title: "KJSCE Insignia - Head of Art Team",
      details:
        "Directed a team to produce visually impactful decorations for major college events, demonstrating strong leadership, organizational, and creative skills. Successfully executed complex projects, earning recognition for effective team management and strategic vision.",
    },
    {
      title: "KJSCE Codecell – Creative Member",
      details:
        "Played a key role in event design and execution, including the creation of logos, banners, and digital assets, as well as logistics and media management. Assisted in conducting a college hackathon, further developing event management skills. Enhanced technical proficiency in web design and competitive programming, showcasing the ability to blend creativity with technical expertise in high-stakes environments.",
    },
  ];

  return (
    <section
      id="leadership"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-transparent"
    ><DisintegrateOnScroll>
      <h2 className="text-5xl font-abolition mb-12 text-center bg-clip-text">
        Leadership & Teamwork
      </h2></DisintegrateOnScroll>
      <DisintegrateOnScroll>
      <div className="max-w-5xl mx-auto flex flex-col gap-10 font-grotesk text-gray-300">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group bg-[rgba(0,255,255,0.05)] backdrop-blur-md border border-[rgba(0,255,255,0.2)] rounded-2xl p-8
                       transition-all duration-500 ease-out transform hover:border-[rgba(0,255,255,0.7)]
                       hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] hover:bg-[rgba(0,255,255,0.08)]"
          >
            <h3 className="text-cyan-400 text-2xl font-semibold mb-3 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-all">
              {exp.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-[1rem]">
              {exp.details}
            </p>
          </div>
        ))}
      </div>
      </DisintegrateOnScroll>
    </section>
  );
}
