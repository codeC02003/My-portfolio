import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const SPRING = { type: "spring", stiffness: 70, damping: 20 };

export default function Contact() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vercel defines this as WEB3FORMS_KEY; .env.local uses the VITE_ form.
    // Either is accepted so both environments work without a rename.
    const accessKey =
      import.meta.env.WEB3FORMS_KEY || import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error(
        "Missing WEB3FORMS_KEY. Set it in .env.local and in your Vercel project's environment variables."
      );
      setFormStatus("error");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("from_name", "Portfolio Contact Form");
    if (!formData.get("subject")) {
      formData.set(
        "subject",
        `Portfolio message from ${formData.get("name") || "a visitor"}`
      );
    }

    setFormStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setFormStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", data);
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center px-6 lg:px-10 py-24 bg-transparent text-white scroll-mt-20"
    >
      <div className="w-full max-w-6xl">
      <SectionHeading
        index="07 / CONTACT"
        title="Say Hello"
        accent="If you're working on something interesting, or you're hiring, or you just want to argue about multi-agent systems, send me a message."
      />

      <div className="w-full grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={SPRING}
          className="panel panel-corner p-6 md:p-10"
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

        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ ...SPRING, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="panel panel-corner p-6 md:p-10"
        >
            <h3 className="text-3xl font-semibold font-grotesk mb-8 text-cyan-400">Send a Message</h3>

            <div className="flex flex-col space-y-5">
              {/* Honeypot, hidden from users, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white font-regular font-grotesk"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="px-5 py-3 bg-transparent border border-[rgba(0,255,255,0.3)] rounded-lg
                           focus:outline-none focus:border-[rgba(0,255,255,0.9)] text-white resize-none font-regular font-grotesk"
                required
              ></textarea>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="mt-4 px-8 py-3 bg-cyan-500/20 border border-cyan-400
                           text-cyan-300 rounded-full font-semibold transition-all
                           hover:bg-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-cyan-500/20
                           disabled:hover:shadow-none"
              >
                {formStatus === "sending"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent!"
                  : "Send Message"}
              </button>

              {formStatus === "success" && (
                <p className="text-cyan-300 text-sm font-grotesk text-center" role="status">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 text-sm font-grotesk text-center" role="alert">
                  That didn&apos;t send. You can email me directly at{" "}
                  <a
                    href="mailto:chinmaymhatre02003@gmail.com"
                    className="underline hover:text-red-300"
                  >
                    chinmaymhatre02003@gmail.com
                  </a>
                  .
                </p>
              )}
            </div>
        </motion.form>
      </div>

      </div>

      {/* Call-to-Action */}
        <p className="mt-20 text-gray-400 text-center text-lg font-grotesk">
          I&apos;m open to <span className="text-cyan-400 font-semibold">
          internships, research collaborations</span> and software roles right now.
        </p>
     </section>
  );
}
