import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function About() {
  return (
    <section id="about" className="px-10 lg:px-24 py-12 scroll-mt-20">
      <div className="md:w-3/5 flex flex-col space-y-8 font-grotesk text-gray-300 text-lg leading-relaxed">

        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={SPRING}
          className="text-5xl font-abolition text-cyan-400"
        >
          <span className="inline-block w-fit leading-none glow-text">About Me</span>
        </motion.h2>

        {[
          <>
            I&apos;m <span className="text-cyan-400 font-semibold">Chinmay Mhatre</span>, a Computer
            Science graduate student at the University of Arizona, focused on building{" "}
            <span className="text-cyan-400 font-semibold">
              intelligent, scalable, and human-centered systems
            </span>
            . I love designing technologies that blend precision with creativity, from
            low-level logic to user-first interfaces.
          </>,
          <>
            My technical work revolves around{" "}
            <span className="text-cyan-400 font-semibold">
              Artificial Intelligence, Machine Learning, and Software Development
            </span>
            . I&apos;ve engineered solutions in{" "}
            <span className="text-cyan-400 font-semibold">Python, C++, and JavaScript</span> using
            frameworks like{" "}
            <span className="text-cyan-400 font-semibold">React, Node.js, and TensorFlow</span>. I
            enjoy working on projects that merge{" "}
            <span className="text-cyan-400 font-semibold">
              data, design, and distributed systems
            </span>{" "}
            to solve real-world challenges.
          </>,
          <>
            My development philosophy centers on{" "}
            <span className="text-cyan-400 font-semibold">
              clean architecture, iterative improvement, and collaboration
            </span>
            . I believe the best systems balance{" "}
            <span className="text-cyan-400 font-semibold">
              performance, clarity, and adaptability
            </span>
            — whether that means optimizing algorithms or simplifying complex workflows. I value
            deep work, continuous learning, and the art of elegant problem-solving.
          </>,
          <>
            Outside of code, I&apos;m driven by{" "}
            <span className="text-cyan-400 font-semibold">design, innovation, and curiosity</span>.
            I love exploring UI/UX, creating digital art, and understanding how human behaviour
            shapes technology. When not in front of a screen, you&apos;ll find me sketching,
            tinkering with hardware, or chasing new learning paths.
          </>,
          <>
            I&apos;m currently open to{" "}
            <span className="text-cyan-400 font-semibold">
              research collaborations, AI-driven internships, or software development roles
            </span>{" "}
            that challenge me to grow and build impactful systems. Feel free to explore my
            projects and connect — I&apos;d love to collaborate on something meaningful.
          </>,
        ].map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ ...SPRING, delay: i * 0.07 }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
