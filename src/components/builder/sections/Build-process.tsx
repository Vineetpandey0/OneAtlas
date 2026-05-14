"use client";

import { useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Describe your idea.",
    body: "Write what you want to build in plain English. Atlas reads your intent, understands your requirements, and prepares a tailored development plan.",
    gradient: "linear-gradient(145deg, #c8b6ff 0%, #e0aaff 40%, #f9a8d4 100%)",
  },
  {
    step: "02",
    title: "Atlas plans architecture.",
    body: "Before writing a single line, Atlas maps out the component tree, data model, and page structure. It thinks like a senior engineer to ensure scalability.",
    gradient: "linear-gradient(145deg, #a5f3fc 0%, #67e8f9 40%, #818cf8 100%)",
  },
  {
    step: "03",
    title: "Code is generated.",
    body: "Components, routes, schemas, and styles are generated in one pass. You get clean, readable, and typed TypeScript that follows production conventions.",
    gradient: "linear-gradient(145deg, #86efac 0%, #34d399 40%, #059669 100%)",
  },
  {
    step: "04",
    title: "One platform. Any agent.",
    body: "Get access to the latest AI models as they launch. Atlas automatically selects the best model for your project, or you can choose the one that fits your build.",
    gradient: "linear-gradient(145deg, #fdba74 0%, #fb923c 40%, #f43f5e 100%)",
  },
];

export default function BuildProcess() {
  return (
    <section className="py-16 md:py-32 px-8 font-sans">
      <div className="max-w-[1100px] mx-auto">

        {/* Section Heading */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-[#0a0a0a] text-[clamp(3.5rem,8vw,6rem)] font-black tracking-[-0.05em] leading-[1.05]">
            The fastest way<br />
            to<br />
            ship production<br />
            apps.
          </h2>
        </div>

        {/* Stack container with native CSS sticky */}
        <div className="flex flex-col">
          {STEPS.map((s, i) => {
            return (
              <div
                key={i}
                className="build-card sticky h-[560px] rounded-[32px] overflow-hidden flex bg-white shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.1),_0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]"
                style={{
                  top: `calc(16vh + ${i * 32}px)`,
                  marginBottom: i === STEPS.length - 1 ? "50vh" : "60vh",
                  zIndex: i,
                }}
              >
                {/* Left: white text panel */}
                <div className="flex-none w-[55%] bg-white py-[52px] px-[56px] flex flex-col justify-between">
                  {/* Top */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-[#0A2540]">{s.step}</span>
                      <span className="text-[15px] text-[#9ca3af]">/ 04</span>
                      <span className="text-[15px] text-[#6b7280] ml-2">{s.title}</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div>
                    <p className="text-[clamp(1.1rem,1.8vw,1.4rem)] text-[#0A2540] leading-relaxed font-normal m-0 mb-9 max-w-[420px]">
                      {s.body}
                    </p>
                    <button className="bg-[#0A2540] text-white py-3.5 px-7 rounded-full text-[15px] font-semibold border-none cursor-pointer transition-opacity duration-200 hover:opacity-80">
                      Start building
                    </button>
                  </div>
                </div>

                {/* Right: color panel */}
                <div
                  className="flex-1 relative overflow-hidden"
                  style={{ background: s.gradient }}
                >
                  {/* Watermark step number */}
                  <div className="absolute -bottom-5 right-6 text-[180px] font-black text-white/[0.18] leading-none tracking-[-0.06em] select-none pointer-events-none">
                    {s.step}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}