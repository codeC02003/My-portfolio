// src/NavbarPortal.jsx
import React from "react";
import { createPortal } from "react-dom";

function Bar() {
  return (
    <nav
      className="w-full h-16 fixed top-0 left-0 z-[2147483647] 
                 bg-[rgba(0,0,0,0.45)] backdrop-blur-xl 
                 border-b border-[rgba(0,255,255,0.18)]
                 shadow-[0_0_20px_rgba(0,255,255,0.35)]"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        <ul className="flex space-x-20 text-white font-grotesk text-lg font-bold">
          <li><a href="#home"       className="hover:text-cyan-400 transition">Home</a></li>
          <li><a href="#about"      className="hover:text-cyan-400 transition">About</a></li>
          <li><a href="#contact"    className="hover:text-cyan-400 transition">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default function NavbarPortal() {
  return createPortal(<Bar />, document.body);
}
