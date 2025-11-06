import React from "react";
import NavbarPortal from "./NavbarPortal";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import SelectedWork from "./SelectedWork";
import Leadership from "./Leadership";
import Contact from "./Contact";
import Education from "./Education";

export default function App() {
  return (
    <div className="relative text-white">
      <NavbarPortal />
      <div id="galaxy-bg">
  <div className="stars"></div>
  <div className="stars2"></div>
  <div className="stars3"></div>
</div>
      <main className="pt-16 space-y-7">
        <section id="home"><Hero /></section>
        <section id="about" className="scroll-mt-16"><About /></section>
        <section id="Education" className="scroll-mt-16"><Education /></section>
        <section id="skills" className="scroll-mt-16"><Skills /></section>
        <section id="work" className="scroll-mt-16"><SelectedWork /></section>
        <section id="leadership"><Leadership /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}
