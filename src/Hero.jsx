import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

export default function Hero() {
  const sectionRef = useRef(null);
  const [exploreClickable, setExploreClickable] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Card fades + rises as the user scrolls away
  const cardOpacity = useTransform(scrollYProgress, [0, 0.60], [1, 0]);
  const cardY       = useTransform(scrollYProgress, [0, 0.60], [0, -40]);

  // Explore button fades once the user starts scrolling
  const exploreOp = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  useMotionValueEvent(exploreOp, "change", (v) => setExploreClickable(v > 0.05));

  const BUTTONS = [
    { icon: <FaGithub />,   text: "GitHub",   link: "https://github.com/codeC02003" },
    { icon: <FaLinkedin />, text: "LinkedIn",  link: "https://www.linkedin.com/in/chinmay-mhatre-857825193/" },
    { icon: <FaEnvelope />, text: "Email",     link: "mailto:chinmaymhatre02003@gmail.com" },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center
                 scroll-mt-20 px-4 lg:px-10 xl:px-14 py-6"
    >

      {/* ── Glassmorphism card — left column ──────────────────────── */}
      <motion.div
        style={{ opacity: cardOpacity, y: cardY }}
        className="relative z-10 w-full lg:max-w-[58%]"
      >
        <div
          className="rounded-3xl p-8 lg:p-12"
          style={{
            background:           "rgba(4, 12, 28, 0.52)",
            backdropFilter:       "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            border:               "1px solid rgba(0, 200, 255, 0.22)",
            boxShadow: [
              "0 8px 40px rgba(0, 0, 0, 0.55)",
              "0 0 24px rgba(0, 200, 255, 0.08)",
              "inset 0 1px 0 rgba(0, 220, 255, 0.10)",
              "inset 0 0 80px rgba(0, 150, 255, 0.04)",
              "0 0 0 1px rgba(0, 200, 255, 0.06)",
            ].join(", "),
          }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                       border border-cyan-400/25 bg-cyan-400/5
                       text-cyan-300/80 text-xs font-grotesk tracking-[3px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            OPEN TO OPPORTUNITIES
          </motion.div>

          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-5xl lg:text-6xl xl:text-7xl font-abolition text-cyan-400 leading-tight select-none"
          >
            HI THERE!
          </motion.h1>

          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-4xl lg:text-5xl xl:text-6xl font-abolition font-bold text-white mt-1 leading-tight select-none"
          >
            I AM{" "}
            <span className="bg-gradient-to-r from-[#00FFFF] via-[#44CCFF] to-[#00FFFF] bg-clip-text text-transparent">
              CHINMAY MHATRE
            </span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-cyan-300 text-xl lg:text-2xl font-semibold font-grotesk mt-3 select-none"
          >
            CS Grad Student · AI &amp; ML Enthusiast
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="origin-left h-px my-3"
            style={{
              background: "linear-gradient(to right, rgba(0,200,255,0.50), rgba(0,150,255,0.15) 55%, transparent)",
            }}
          />

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.50 }}
            className="flex items-center gap-2 text-cyan-400/65 font-grotesk text-base mb-2 select-none"
          >
            <FaMapMarkerAlt />
            <span>Tucson, Arizona, USA</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58 }}
            className="text-gray-300/85 font-grotesk text-base leading-relaxed mb-4 select-none"
          >
            Innovative CS grad student with a strong background in software
            development, AI, and full-stack engineering. Seeking internships in{" "}
            <span className="text-cyan-400 font-semibold">
              AI, ML, or Software Engineering
            </span>
            .
          </motion.p>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {BUTTONS.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full
                           border border-cyan-400/70 text-cyan-300
                           font-grotesk text-base transition-all duration-300
                           shadow-[0_0_12px_rgba(0,255,255,0.12)]
                           hover:scale-105 hover:border-cyan-400
                           hover:shadow-[0_0_22px_rgba(0,255,255,0.40)]
                           hover:bg-[rgba(0,255,255,0.07)]"
              >
                {btn.icon}
                {btn.text}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Corner accents */}
        <div
          className="absolute -top-px -left-px w-16 h-16 rounded-tl-3xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.18) 0%, transparent 60%)" }}
        />
        <div
          className="absolute -bottom-px -right-px w-16 h-16 rounded-br-3xl pointer-events-none"
          style={{ background: "linear-gradient(315deg, rgba(0,150,255,0.10) 0%, transparent 60%)" }}
        />
      </motion.div>

      {/* ── Explore button ───────────────────────────────────────────
          Fixed + CSS-owned transform so framer doesn't clobber the -50 %.  */}
      <div
        style={{
          position:      "fixed",
          bottom:        32,
          left:          "calc(50vw + 50px)",
          transform:     "translateX(-50%)",
          zIndex:        20,
          pointerEvents: exploreClickable ? "auto" : "none",
        }}
      >
        <motion.button
          style={{ opacity: exploreOp }}
          className="flex flex-col items-center gap-1 cursor-pointer select-none group"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="text-cyan-300/60 font-grotesk text-[10px] tracking-[4px] mb-1 group-hover:text-cyan-300 transition-colors">
              EXPLORE
            </span>
            <FaChevronDown className="text-cyan-400/80 text-base" />
            <FaChevronDown className="text-cyan-400/30 text-base -mt-1.5" />
          </motion.div>
        </motion.button>
      </div>

    </section>
  );
}
