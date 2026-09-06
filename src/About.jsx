import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function About() {
  return (
    <section id="about" className="px-10 lg:px-24 py-12 scroll-mt-20">
      <div className="md:w-3/5 flex flex-col space-y-6 font-grotesk text-gray-300 text-lg leading-relaxed">

        <SectionHeading index="01 / PROFILE" title="About Me" />

        {[
          <>
            I&apos;m <span className="text-cyan-400 font-semibold">Chinmay Mhatre</span>. I&apos;m
            doing my Master&apos;s in Computer Science at the University of Arizona, and most of
            what I work on sits where software engineering meets machine learning and data
            visualization.
          </>,
          <>
            I like building things end to end. Usually that means a backend, a model somewhere in
            the middle, and an interface someone can actually use. Lately that&apos;s been
            retrieval systems, explainable AI dashboards, and a few data-heavy web apps. Day to
            day I&apos;m in Python, C++, TypeScript, PyTorch, FastAPI and React.
          </>,
          <>
            Right now I&apos;m a graduate researcher in the{" "}
            <span className="text-cyan-400 font-semibold">D-REP Lab</span> under Professor Takanori
            Fujiwara, working on{" "}
            <span className="text-cyan-400 font-semibold">multi-agent systems</span>. Getting
            several models to coordinate on one problem turns out to be much harder than it
            sounds.
          </>,
          <>
            Before that I led a team of three on a gait analysis project, putting IMU sensors on
            people and training models to pick out abnormal walking patterns. We got past{" "}
            <span className="text-cyan-400 font-semibold">92% accuracy</span> on gait event
            detection, and testing it in a hospital alongside physiotherapists improved assessment
            consistency by about 30%.
          </>,
          <>
            Away from code I care about design. I spend time in Figma and Illustrator, and I&apos;m
            interested in why one interface feels obvious and another doesn&apos;t.
          </>,
          <>
            I&apos;m looking for work in{" "}
            <span className="text-cyan-400 font-semibold">
              software engineering, AI and machine learning, or applied research
            </span>
            . If you&apos;re building something interesting, I&apos;d like to hear about it.
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
