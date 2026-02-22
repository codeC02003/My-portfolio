import NavbarPortal from "./NavbarPortal";
import FloatingSphere from "./FloatingSphere";
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
      <FloatingSphere />
      <div id="galaxy-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <main className="pl-[100px] space-y-7">
        <Hero />
        <About />
        <Education />
        <Skills />
        <SelectedWork />
        <Leadership />
        <Contact />
      </main>
    </div>
  );
}
