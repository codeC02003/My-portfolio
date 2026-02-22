import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Leadership() {
  const experiences = [
    {
      title: "KJSCE Insignia – Art Team Member",
      period: "2021 – 2022",
      details:
        "Contributed to the creation of art decorations for college events, applying creativity and teamwork skills to enhance event aesthetics and atmosphere.",
    },
    {
      title: "KJSCE Insignia – Head of Art Team",
      period: "2022 – 2023",
      details:
        "Directed a team to produce visually impactful decorations for major college events, demonstrating strong leadership, organizational, and creative skills. Successfully executed complex projects, earning recognition for effective team management and strategic vision.",
    },
    {
      title: "KJSCE Codecell – Creative Member",
      period: "2023 – 2024",
      details:
        "Played a key role in event design and execution, including the creation of logos, banners, and digital assets, as well as logistics and media management. Assisted in conducting a college hackathon, further developing event management skills. Enhanced technical proficiency in web design and competitive programming, showcasing the ability to blend creativity with technical expertise in high-stakes environments.",
    },
  ];

  return (
    <section
      id="leadership"
      className="flex flex-col items-center justify-center px-6 py-12 bg-transparent scroll-mt-20"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={SPRING}
        className="text-5xl font-abolition mb-12 text-center glow-text text-cyan-400"
      >
        Leadership &amp; Teamwork
      </motion.h2>

      <div className="max-w-5xl mx-auto flex flex-col gap-10 font-grotesk text-gray-300">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ ...SPRING, delay: i * 0.08 }}
            className="bg-[rgba(0,255,255,0.05)] rounded-2xl p-8
                       transition-all duration-500 ease-out border border-[rgba(0,255,255,0.15)]
                       hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)]
                       hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <h3 className="text-cyan-400 text-2xl font-semibold">{exp.title}</h3>
              <span className="text-gray-400 font-grotesk text-sm mt-1 md:mt-0">{exp.period}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[1rem]">{exp.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
