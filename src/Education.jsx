import React from "react";

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-transparent"
    >
      <h2 className="text-5xl font-abolition mb-8 bg-clip-text drop-shadow-[0_0_25px_rgba(0,255,255,0.9)]">
        Education
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 font-grotesk text-lg text-gray-300">
        {/* MS in Computer Science */}
        <div className="bg-[rgba(0,255,255,0.05)] backdrop-blur-sm border border-[rgba(0,255,255,0.2)] rounded-2xl p-6 hover:border-[rgba(0,255,255,0.5)] transition-all duration-300">
          <h3 className="text-cyan-400 text-2xl font-semibold">
            University of Arizona
          </h3>
          <p className="italic">Master of Science in Computer Science (CS)</p>
          <p className="text-sm text-gray-400 mt-1">(Expected 2027)</p>
        </div>

        {/* B.Tech in IT */}
        <div className="bg-[rgba(0,255,255,0.05)] backdrop-blur-sm border border-[rgba(0,255,255,0.2)] rounded-2xl p-6 hover:border-[rgba(0,255,255,0.5)] transition-all duration-300">
          <h3 className="text-cyan-400 text-2xl font-semibold">
            K. J. Somaiya College of Engineering, Vidyavihar
          </h3>
          <p className="italic">Bachelor of Technology in Information Technology (IT)</p>
          <p className="text-sm text-gray-400 mt-1">GPA: 8.27 &nbsp; | &nbsp; 2021 – 2025</p>
        </div>

        {/* Higher Secondary */}
        <div className="bg-[rgba(0,255,255,0.05)] backdrop-blur-sm border border-[rgba(0,255,255,0.2)] rounded-2xl p-6 hover:border-[rgba(0,255,255,0.5)] transition-all duration-300">
          <h3 className="text-cyan-400 text-2xl font-semibold">
            Pace Junior Science College, Thane (W)
          </h3>
          <p className="italic">Higher Secondary Education (HSC)</p>
          <p className="text-sm text-gray-400 mt-1">Percentage: 84.67% &nbsp; | &nbsp; 2019 – 2021</p>
        </div>

        {/* Secondary Education */}
        <div className="bg-[rgba(0,255,255,0.05)] backdrop-blur-sm border border-[rgba(0,255,255,0.2)] rounded-2xl p-6 hover:border-[rgba(0,255,255,0.5)] transition-all duration-300">
          <h3 className="text-cyan-400 text-2xl font-semibold">
            Sri Ma Vidyalaya, Thane (W)
          </h3>
          <p className="italic">Secondary Education (SSC)</p>
          <p className="text-sm text-gray-400 mt-1">Percentage: 85.80% &nbsp; | &nbsp; 2018 – 2019</p>
        </div>
      </div>
    </section>
  );
}
