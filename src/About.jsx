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
            I&apos;m <span className="text-cyan-400 font-semibold">Chinmay Mhatre</span>, an
            innovative and adaptable Computer Science graduate student at the University of Arizona,
            with a robust background in{" "}
            <span className="text-cyan-400 font-semibold">
              software development, data structures &amp; algorithms, object-oriented programming,
              databases, and artificial intelligence
            </span>
            . I love designing technologies that blend precision with creativity.
          </>,
          <>
            My technical work spans{" "}
            <span className="text-cyan-400 font-semibold">
              AI, Machine Learning, full-stack web development, and IoT systems
            </span>
            . I&apos;ve built solutions in{" "}
            <span className="text-cyan-400 font-semibold">Python, C++, JavaScript, PHP, and SQL</span>{" "}
            using frameworks like{" "}
            <span className="text-cyan-400 font-semibold">React, Node.js, and TensorFlow</span>,
            alongside hands-on experience with{" "}
            <span className="text-cyan-400 font-semibold">MEMS sensors, REST APIs, and cloud computing</span>.
          </>,
          <>
            I have demonstrated{" "}
            <span className="text-cyan-400 font-semibold">
              leadership and project management skills
            </span>{" "}
            through successful development of dynamic web platforms and a sophisticated gait analysis
            system utilizing Inertial Measurement Unit sensors — achieving over{" "}
            <span className="text-cyan-400 font-semibold">92% accuracy</span> in real-time gait
            event detection validated with hospital physiotherapists.
          </>,
          <>
            Outside of code, I&apos;m driven by{" "}
            <span className="text-cyan-400 font-semibold">design, innovation, and curiosity</span>.
            I love exploring UI/UX, creating digital art with Figma and Adobe Illustrator, and
            understanding how human behavior shapes technology. Known for blending{" "}
            <span className="text-cyan-400 font-semibold">creative vision with technical expertise</span>{" "}
            in both individual and collaborative settings.
          </>,
          <>
            I&apos;m currently seeking a{" "}
            <span className="text-cyan-400 font-semibold">
              challenging internship in Computer Science — particularly in AI &amp; ML
            </span>
            . Feel free to explore my projects and connect — I&apos;d love to collaborate on
            something impactful.
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
