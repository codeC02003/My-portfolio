import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import DisintegrateOnScroll from "./DisintegrateOnScroll";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-24 py-24 bg-transparent text-white"
    >
      {/* Heading */}
      <DisintegrateOnScroll>
        <h2 className="text-5xl font-abolition mb-6 text-cyan-400 text-center">
          Let’s Build Something Great Together
        </h2>
        <p className="text-gray-300 max-w-2xl text-center mb-16 font-grotesk text-lg leading-relaxed">
          Whether you’re looking to collaborate on a project, discuss a research idea, or explore opportunities in AI and software engineering,  
          I’d love to hear from you.
        </p>
      </DisintegrateOnScroll>

      {/* Main Content */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
        {/* Left Info Card */}
        <DisintegrateOnScroll>
          <div
            className="rounded-2xl p-10 transition-all duration-300 ease-out flex-1 bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)]"
          >
            <h3 className="text-3xl font-semibold font-grotesk mb-8 text-cyan-400">Get in Touch</h3>

            <ul className="space-y-6 text-lg font-grotesk">
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-cyan-400 text-2xl" />
                <a
                  href="mailto:chinmaymhatre02003@gmail.com"
                  className="hover:text-cyan-400 transition"
                >
                  chinmaymhatre02003@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
                <span>Tucson, Arizona, USA</span>
              </li>
              <li className="flex items-center gap-4">
                <FaLinkedin className="text-cyan-400 text-2xl" />
                <a
                  href="https://www.linkedin.com/in/chinmay-mhatre-857825193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  Linkedin</a>
              </li>
              <li className="flex items-center gap-4">
                <FaGithub className="text-cyan-400 text-2xl" />
                <a
                  href="https://github.com/codeC02003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  Github
                </a>
              </li>
            </ul>

            <div className="mt-10">
              <a
                href="https://drive.google.com/file/d/1ghBRawoioKQO9AtGH8MinY_i2qfN9HCN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-cyan-500/20 border border-cyan-400 
                           text-cyan-300 rounded-full font-semibold font-grotesk transition-all
                           hover:bg-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
              >
                Download Resume
              </a>
            </div>
          </div>
        </DisintegrateOnScroll>

        {/* Right Contact Form */}
        <DisintegrateOnScroll>
          <form
            onSubmit={handleSubmit}
            className="bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.15)] 
                       rounded-2xl p-10 transition-all duration-300 ease-out hover:border-cyan-400 hover:bg-[rgba(0,255,255,0.1)]"
          >
            <h3 className="text-3xl font-semibold font-grotesk mb-8 text-cyan-400">Send a Message</h3>

            <div className="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg 
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg 
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg 
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg 
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white resize-none font-regular font-grotesk"
                required
              ></textarea>

              <button
                type="submit"
                className="mt-4 px-8 py-3 bg-cyan-500/20 border border-cyan-400 
                           text-cyan-300 rounded-full font-semibold transition-all
                           hover:bg-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
              >
                {formStatus === "sending"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent!"
                  : "Send Message"}
              </button>
            </div>
          </form>
        </DisintegrateOnScroll>
      </div>

      {/* Call-to-Action */}
      <DisintegrateOnScroll>
        <p className="mt-20 text-gray-400 text-center text-lg font-grotesk">
          Currently open to <span className="text-cyan-400 font-semibold">
          internships, research collaborations</span>, and software development roles.  
          Let’s make something impactful together.
        </p>
      </DisintegrateOnScroll>
    </section>
  );
}
