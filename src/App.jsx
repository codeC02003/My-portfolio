import NavbarPortal from "./NavbarPortal";
import FloatingSphere from "./FloatingSphere";
import ParticleCanvas from "./ParticleCanvas";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import SelectedWork from "./SelectedWork";
import Leadership from "./Leadership";
import Contact from "./Contact";
import Education from "./Education";
import DisintegrationWrapper from "./DisintegrationWrapper";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="relative text-white">
      <NavbarPortal />
      <FloatingSphere />
      <ParticleCanvas />
      <div id="galaxy-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <main className="pl-0 md:pl-[100px] space-y-7">
        <Hero />
        <DisintegrationWrapper><About /></DisintegrationWrapper>
        <DisintegrationWrapper><Education /></DisintegrationWrapper>
        <DisintegrationWrapper><Skills /></DisintegrationWrapper>
        <DisintegrationWrapper><SelectedWork /></DisintegrationWrapper>
        <DisintegrationWrapper><Leadership /></DisintegrationWrapper>
        <DisintegrationWrapper><Contact /></DisintegrationWrapper>
      </main>
    </div>
  );
}
