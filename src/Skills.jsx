import React from "react";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-transparent"
    >
      {/* === Title === */}
      <DisintegrateOnScroll>
      <h2 className="text-5xl font-abolition mb-12 bg-clip-text">
        Skills
      </h2></DisintegrateOnScroll>

      {/* === Four Cards Grid === */}
      <DisintegrateOnScroll>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-grotesk text-lg text-gray-300">
        {/* Card Template */}
        
        {[
          {
            title: "Programming Languages",
            content: "Python, C, C++, JavaScript, SQL, PHP",
          },
          {
            title: "Frameworks & Tools",
            content: "React, Git, Node.js, OpenSim",
          },
          {
            title: "Web Development",
            content: "HTML, CSS, JavaScript, MySQL, REST APIs",
          },
          {
            title: "Other",
            content:
              "Cloud Computing, UI/UX Design (Figma, Adobe Illustrator), IoT Systems, MEMS Sensors",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group bg-[rgba(0,255,255,0.05)] backdrop-blur-md border border-[rgba(0,255,255,0.2)] rounded-2xl p-8
                       transition-all duration-500 ease-out transform hover:border-[rgba(0,255,255,0.7)]
                       hover:shadow-[0_0_35px_rgba(0,255,255,0.4)] hover:bg-[rgba(0,255,255,0.08)]"
          >
            <h3 className="text-cyan-400 text-2xl font-semibold mb-3 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-all">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
      </DisintegrateOnScroll>
    </section>
  );
}
