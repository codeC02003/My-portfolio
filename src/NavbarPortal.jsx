import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Bar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  // === Scroll Spy ===
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.toLowerCase());
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "leadership", label: "Leadership" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* === Top Navbar === */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[2147483647]
                   bg-[rgba(0,0,0,0.1)] backdrop-blur-xl
                   border border-[rgba(120, 202, 225, 0.24)]
                   rounded-full shadow-[0_0_25px_rgba(0,255,255,0.25)]
                   px-8 py-2 flex items-center justify-between
                   w-[90%] max-w-4xl"
      >
        {/* === Mobile Toggle === */}
        <button
          className="md:hidden text-cyan-400 text-3xl ml-auto"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* === Desktop Nav === */}
        <div className="flex w-full items-center justify-center relative">
          <ul className="hidden md:flex space-x-10 font-grotesk text-lg font-medium items-center relative text-white">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  className={`px-4 py-2 transition-all duration-300 relative z-10 ${
                    active === item.id
                      ? "text-cyan-400"
                      : "text-white hover:text-cyan-300"
                  }`}
                >
                  {item.label}
                </a>

                {active === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -inset-x-2 -inset-y-2.5 -z-10 rounded-full 
                               border-2 border-cyan-400 
                               bg-[rgba(0,255,255,0.08)] 
                               shadow-[0_0_35px_rgba(0,255,255,0.6)]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 40,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* === Mobile Fullscreen Menu === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[2147483648] bg-[rgba(0,10,20,0.95)] backdrop-blur-lg 
                       flex flex-col items-center justify-center text-center"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`text-3xl font-grotesk mb-8 transition-all duration-300 ${
                  active === item.id
                    ? "text-cyan-400"
                    : "text-white-300"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function NavbarPortal() {
  return createPortal(<Bar />, document.body);
}
