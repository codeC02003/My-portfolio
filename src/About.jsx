import React from "react";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    ><DisintegrateOnScroll>
      <h2 className="text-5xl font-abolition mb-6 bg-clip-text">
        About Me
      </h2>
      </DisintegrateOnScroll>
      <DisintegrateOnScroll>
      <p className="max-w-4xl text-gray-300 text-lg leading-relaxed font-grotesk">
        I’m <span className="text-cyan-400 font-semibold">Chinmay Mhatre</span>, an innovative and
        adaptable Computer Science student passionate about building intelligent, human-centered
        systems. With a strong foundation in{" "}
        <span className="text-cyan-400 font-semibold">
          software development, data structures, algorithms, and AI
        </span>
        , I love solving real-world problems that combine logic with creativity.
      </p>

      <p className="max-w-4xl text-gray-300 text-lg leading-relaxed font-grotesk mt-6">
        I’ve led interdisciplinary projects like a{" "}
        <span className="text-cyan-400 font-semibold">
          Gait Analysis System using IMU sensors and Machine Learning
        </span>
        , achieving 92% accuracy in motion detection, and developed platforms like{" "}
        <span className="text-cyan-400 font-semibold">WeConnect</span>, enabling NGOs to collaborate
        globally on impactful initiatives. These experiences have strengthened my technical
        expertise and leadership skills.
      </p>

      <p className="max-w-4xl text-gray-300 text-lg leading-relaxed font-grotesk mt-6">
        Skilled in <span className="text-cyan-400 font-semibold">Python, C++, JavaScript</span>,
        and frameworks like <span className="text-cyan-400 font-semibold">React and Node.js</span>,
        I also explore <span className="text-cyan-400 font-semibold">cloud computing, UI/UX design</span>,
        and embedded systems. My approach blends analytical thinking with visual design, reflecting my
        background as both a developer and creative designer.
      </p>

      <p className="max-w-4xl text-gray-300 text-lg leading-relaxed font-grotesk mt-6">
        Beyond academics, I’ve been part of{" "}
        <span className="text-cyan-400 font-semibold">KJSCE Insignia</span> and{" "}
        <span className="text-cyan-400 font-semibold">Codecell</span>, where I led creative teams
        and managed event design, merging art with technology. I thrive in collaborative spaces
        that challenge me to innovate, learn, and lead.
      </p>
      </DisintegrateOnScroll>
    </section>
  );
}
