import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "education",  label: "Education"  },
  { id: "skills",     label: "Skills"     },
  { id: "projects",   label: "Projects"   },
  { id: "leadership", label: "Leadership" },
  { id: "contact",    label: "Contact"    },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Sidebar() {
  const [active, setActive]         = useState("hero");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile                    = useIsMobile();

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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Hamburger button — fixed top-left */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label="Toggle navigation"
          style={{
            position:             "fixed",
            top:                  14,
            left:                 14,
            zIndex:               2147483647,
            width:                42,
            height:               42,
            background:           "rgba(2, 8, 22, 0.88)",
            backdropFilter:       "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border:               "1px solid rgba(0, 200, 255, 0.22)",
            borderRadius:         10,
            cursor:               "pointer",
            display:              "flex",
            flexDirection:        "column",
            alignItems:           "center",
            justifyContent:       "center",
            gap:                  5,
            padding:              0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                drawerOpen
                  ? i === 1
                    ? { opacity: 0, scaleX: 0 }
                    : i === 0
                    ? { rotate: 45, y: 7 }
                    : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              style={{
                display:         "block",
                width:           20,
                height:          2,
                borderRadius:    2,
                background:      "rgb(34, 211, 238)",
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.button>

        <AnimatePresence>
          {drawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
                style={{
                  position:   "fixed",
                  inset:      0,
                  background: "rgba(0,0,0,0.55)",
                  zIndex:     2147483645,
                }}
              />

              {/* Slide-in drawer */}
              <motion.nav
                key="drawer"
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position:             "fixed",
                  top:                  0,
                  left:                 0,
                  width:                220,
                  height:               "100vh",
                  zIndex:               2147483646,
                  background:           "rgba(2, 8, 22, 0.96)",
                  backdropFilter:       "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRight:          "1px solid rgba(0, 200, 255, 0.14)",
                  display:              "flex",
                  flexDirection:        "column",
                  paddingTop:           70,
                }}
              >
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      style={{
                        width:       "100%",
                        textAlign:   "left",
                        padding:     "15px 24px",
                        background:  isActive ? "rgba(34,211,238,0.08)" : "transparent",
                        border:      "none",
                        borderLeft:  isActive
                          ? "3px solid rgb(34,211,238)"
                          : "3px solid transparent",
                        cursor:      "pointer",
                        color:       isActive ? "rgb(34,211,238)" : "rgba(255,255,255,0.55)",
                        fontFamily:  "var(--font-grotesk, sans-serif)",
                        fontSize:    15,
                        letterSpacing: "0.04em",
                        transition:  "all 0.2s",
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── Desktop sidebar ────────────────────────────────────────────────────────
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
        justifyContent:       "space-evenly",
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
              padding:       "13px 8px",
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
            {/* Dot + glow ring */}
            <div style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
