import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Leadership() {
  const experiences = [
    {
      title: "KJSCE Insignia: Art Team Member",
      period: "2021 – 2022",
      details:
        "Made art and decorations for college events. Mostly a lesson in how much of a good event is just the room feeling right when people walk in.",
    },
    {
      title: "KJSCE Insignia: Head of Art Team",
      period: "2022 – 2023",
      details:
        "Ran the art team for the college's major events. Planning the build, splitting the work, and keeping it on schedule turned out to be most of the job. The team was recognised for how the bigger projects came together.",
    },
    {
      title: "KJSCE Codecell: Creative Member",
      period: "2023 – 2024",
      details:
        "Design and execution for Codecell events: logos, banners, digital assets, plus logistics and media. Helped run a college hackathon, which is where I got most of my early web design and competitive programming practice.",
    },
  ];

  return (
    <section
      id="leadership"
      className="flex flex-col items-center px-6 lg:px-10 py-12 bg-transparent scroll-mt-20"
    >
      <div className="w-full max-w-6xl">
      <SectionHeading index="06 / TEAMWORK" title="Leadership" />

      <div className="w-full flex flex-col gap-6 font-grotesk text-gray-300">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ ...SPRING, delay: i * 0.08 }}
            className="panel panel-corner p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <h3 className="text-cyan-400 text-2xl font-semibold">{exp.title}</h3>
              <span className="text-gray-400 font-grotesk text-sm mt-1 md:mt-0">{exp.period}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[1rem]">{exp.details}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
