import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "education",  label: "Education"  },
  { id: "skills",     label: "Skills"     },
  { id: "projects",   label: "Projects"   },
  { id: "leadership", label: "Leadership" },
  { id: "contact",    label: "Contact"    },
];

function Sidebar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.toLowerCase());
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position:             "fixed",
        top:                  0,
        left:                 0,
        width:                100,
        height:               "100vh",
        zIndex:               2147483647,
        background:           "rgba(2, 8, 22, 0.88)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRight:          "1px solid rgba(0, 200, 255, 0.14)",
        display:              "flex",
        flexDirection:        "column",
        alignItems:           "center",
        justifyContent:       "center",
        gap:                  0,           /* gap is handled by per-item padding */
      }}
    >
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() =>
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              width:         "100%",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           7,
              padding:       "13px 8px",   /* more vertical breathing room */
              cursor:        "pointer",
              background:    "transparent",
              border:        "none",
              borderRadius:  8,
              transition:    "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,200,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Dot + glow ring container */}
            <div style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Animated glow ring — slides between items via layoutId */}
              {isActive && (
                <motion.div
                  layoutId="nav-glow-ring"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  style={{
                    position:     "absolute",
                    inset:        0,
                    borderRadius: "50%",
                    border:       "1.5px solid rgba(34,211,238,0.7)",
                    background:   "rgba(34,211,238,0.12)",
                    boxShadow:    [
                      "0 0 6px  rgba(34,211,238,0.9)",
                      "0 0 14px rgba(34,211,238,0.55)",
                      "0 0 28px rgba(34,211,238,0.25)",
                    ].join(", "),
                  }}
                />
              )}

              {/* Solid dot */}
              <div
                style={{
                  width:        8,
                  height:       8,
                  borderRadius: "50%",
                  background:   isActive ? "rgb(34,211,238)" : "rgba(255,255,255,0.28)",
                  boxShadow:    isActive ? "0 0 6px rgba(34,211,238,1)" : "none",
                  transition:   "background 0.3s, box-shadow 0.3s",
                  flexShrink:   0,
                  position:     "relative",
                  zIndex:       1,
                }}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontFamily:    "var(--font-grotesk, sans-serif)",
                fontSize:      10,
                letterSpacing: "0.05em",
                color:         isActive ? "rgb(34,211,238)" : "rgba(255,255,255,0.45)",
                transition:    "color 0.3s",
                textAlign:     "center",
                lineHeight:    1.2,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}

export default function NavbarPortal() {
  return createPortal(<Sidebar />, document.body);
}
