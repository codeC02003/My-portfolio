import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-transparent"
    >
      <DisintegrateOnScroll>
      <h2 className="text-5xl font-abolition mb-12 text-center bg-clip-text" >
        Contact
      </h2>
      </DisintegrateOnScroll>
      <DisintegrateOnScroll>
      <div className="bg-[rgba(0,255,255,0.05)] backdrop-blur-md border border-[rgba(0,255,255,0.2)] rounded-3xl p-10 max-w-lg w-full
                      text-center transition-all duration-500 hover:border-[rgba(0,255,255,0.7)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:bg-[rgba(0,255,255,0.08)]">
        <h3 className="text-3xl font-abolition text-cyan-400 mb-6 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
          Get in Touch
        </h3>

        <div className="space-y-5 font-grotesk text-lg text-gray-300">
          <div className="flex items-center justify-center space-x-3">
            <FaPhoneAlt className="text-cyan-400 text-xl" />
            <p className="text-gray-300 hover:text-cyan-300 transition-all">
              +1 (425) 985-9243
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <FaEnvelope className="text-cyan-400 text-xl" />
            <a
              href="chinmaymhatre02003@gmail.com"
              className="text-gray-300 hover:text-cyan-300 transition-all"
            >
              chinmaymhatre02003@gmail.com
            </a>
          </div>

          <div className="pt-6">
            <h4 className="text-cyan-400 text-xl font-semibold mb-2">
              Expertise
            </h4>
            <p className="text-gray-300">
              Artificial Intelligence, Machine Learning, Web Development
            </p>
          </div>

          <div className="pt-6">
            <h4 className="text-cyan-400 text-xl font-semibold mb-2">
              Availability
            </h4>
            <p className="text-gray-300">Open for Internships & Research Roles</p>
          </div>
        </div>
      </div>
      </DisintegrateOnScroll>
    </section>
  );
}
