import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

/**
 * Shared section header.
 *
 * Replaces the small centred word each section used to render on its own.
 * The index number and the hairline rule give the page a consistent
 * structure and a technical, dossier-like read that suits the theme.
 *
 * Place inside the section's own max-width container so the rule lines up
 * with the cards beneath it.
 */
export default function SectionHeading({ index, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={SPRING}
      className="w-full mb-10"
    >
      {/* Index + rule */}
      <div className="flex items-center gap-4 mb-3">
        <span className="font-grotesk text-xs tracking-[0.4em] text-cyan-400/45 shrink-0">
          {index}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-400/35 via-cyan-400/10 to-transparent" />
      </div>

      {/* Title */}
      <h2 className="text-5xl md:text-6xl font-abolition text-cyan-400 glow-text leading-none">
        {title}
      </h2>

      {accent && (
        <p className="mt-3 font-grotesk text-gray-400 text-base max-w-2xl">
          {accent}
        </p>
      )}
    </motion.div>
  );
}
