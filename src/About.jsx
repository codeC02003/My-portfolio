import React from "react";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function About() {
  return (
    <section
      id="about"
      className="md:flex-row px-10 lg:px-24 py-24 gap-12"
    >
      {/* LEFT CONTENT */}
      <div className="md:w-3/5 min-h-screen flex flex-col space-y-8 font-grotesk text-gray-300 text-lg leading-relaxed flex-col"> 
        {/* === 1. Short Intro === */}
          <h2 className="text-5xl font-abolition mb-8 bg-clip-text text-cyan-400">
  <DisintegrateOnScroll>
    <span className="inline-block w-fit leading-none">About Me</span>
  </DisintegrateOnScroll>
</h2>

        <DisintegrateOnScroll>
          <p>
            I’m <span className="text-cyan-400 font-semibold">Chinmay Mhatre</span>, a Computer Science graduate student 
            at the University of Arizona, focused on building <span className="text-cyan-400 font-semibold">
            intelligent, scalable, and human-centered systems</span>.  
            I love designing technologies that blend precision with creativity, from 
            low-level logic to user-first interfaces.
          </p>
        </DisintegrateOnScroll>

        {/* === 2. Technical Identity === */}
        <DisintegrateOnScroll>
          <p>
            My technical work revolves around <span className="text-cyan-400 font-semibold">
            Artificial Intelligence, Machine Learning, and Software Development</span>.  
            I’ve engineered solutions in <span className="text-cyan-400 font-semibold">Python, C++, and JavaScript</span> 
            using frameworks like <span className="text-cyan-400 font-semibold">React, Node.js, and TensorFlow</span>.  
            I enjoy working on projects that merge <span className="text-cyan-400 font-semibold">
            data, design, and distributed systems</span> to solve real-world challenges.
          </p>
        </DisintegrateOnScroll>

        {/* === 3. Approach / Philosophy === */}
        <DisintegrateOnScroll>
          <p>
            My development philosophy centers on <span className="text-cyan-400 font-semibold">
            clean architecture, iterative improvement, and collaboration</span>.  
            I believe the best systems are those that balance <span className="text-cyan-400 font-semibold">
            performance, clarity, and adaptability</span>, whether that means optimizing algorithms or 
            simplifying complex workflows.  
            I value deep work, continuous learning, and the art of elegant problem-solving.
          </p>
        </DisintegrateOnScroll>

        {/* === 4. Personal Touch === */}
        <DisintegrateOnScroll>
          <p>
            Outside of code, I’m driven by <span className="text-cyan-400 font-semibold">
            design, innovation, and curiosity</span>.  
            I love exploring UI/UX, creating digital art, and understanding how human behavior 
            shapes technology.  
            When not in front of a screen, you’ll find me sketching, tinkering with hardware, 
            or chasing new learning paths.
          </p>
        </DisintegrateOnScroll>

        {/* === 5. Call to Action === */}
        <DisintegrateOnScroll>
          <p>
            I’m currently open to <span className="text-cyan-400 font-semibold">
            research collaborations, AI-driven internships, or software development roles</span> 
            that challenge me to grow and build impactful systems.  
            Feel free to explore my projects and connect, I’d love to collaborate on something meaningful.
          </p>
        </DisintegrateOnScroll>
      </div>
    </section>
  );
}
