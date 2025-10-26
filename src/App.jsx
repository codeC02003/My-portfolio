import React from "react";
import NavbarPortal from "./NavbarPortal";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import SelectedWork from "./SelectedWork";
import Leadership from "./Leadership";
import Contact from "./Contact";

export default function App() {
  return (
    <div className="relative text-white">
      <NavbarPortal />

      <main className="pt-16 space-y-1">
        <section id="home"><Hero /></section>

        {/* Add className="disperse-item" to any container that should disperse */}
        <section id="contact" className="scroll-mt-10 disperse-item"><Contact /></section>
        <section id="about" className="disperse-item"><About /></section>
        <section id="skills" className="scroll-mt-16 disperse-item"><Skills /></section>
        <section id="work" className="scroll-mt-16 disperse-item"><SelectedWork /></section>
        <section id="leadership" className="disperse-item"><Leadership /></section>
      </main>
    </div>
  );
}
