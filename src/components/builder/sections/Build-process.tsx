"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Describe your idea.",
    body: "Write what you want to build in plain English. Atlas reads your intent, understands your requirements, and prepares a tailored development plan.",
    gradient: "linear-gradient(145deg, #c8b6ff 0%, #e0aaff 40%, #f9a8d4 100%)",
    accent: "#c084fc",
  },
  {
    step: "02",
    title: "Atlas plans architecture.",
    body: "Before writing a single line, Atlas maps out the component tree, data model, and page structure. It thinks like a senior engineer to ensure scalability.",
    gradient: "linear-gradient(145deg, #a5f3fc 0%, #67e8f9 40%, #818cf8 100%)",
    accent: "#38bdf8",
  },
  {
    step: "03",
    title: "Code is generated.",
    body: "Components, routes, schemas, and styles are generated in one pass. You get clean, readable, and typed TypeScript that follows production conventions.",
    gradient: "linear-gradient(145deg, #86efac 0%, #34d399 40%, #059669 100%)",
    accent: "#34d399",
  },
  {
    step: "04",
    title: "One platform. Any agent.",
    body: "Get access to the latest AI models as they launch. Atlas automatically selects the best model for your project, or you can choose the one that fits your build.",
    gradient: "linear-gradient(145deg, #fdba74 0%, #fb923c 40%, #f43f5e 100%)",
    accent: "#fb923c",
  },
];

function StepCard({ s, i }: { s: (typeof STEPS)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fromLeft = i % 2 === 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) rotate(0deg)"
          : `translateX(${fromLeft ? "-120px" : "120px"}) rotate(${fromLeft ? "-3deg" : "3deg"})`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
      }}
      className="relative rounded-[28px] overflow-hidden flex bg-white shadow-[0_8px_40px_-8px_rgba(0,0,0,0.13)] cursor-pointer"
    >
      {/* Ink-wash reveal overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: s.gradient,
          clipPath: hovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: "clip-path 0.65s cubic-bezier(0.77,0,0.175,1)",
          zIndex: 2,
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      {/* Step number - giant background */}
      <div
        className="absolute select-none pointer-events-none font-black leading-none tracking-[-0.07em]"
        style={{
          fontSize: "clamp(140px, 20vw, 220px)",
          color: s.accent,
          opacity: 0.06,
          bottom: "-20px",
          left: "-10px",
          zIndex: 1,
          transition: "opacity 0.4s ease",
          ...(hovered ? { opacity: 0.11 } : {}),
        }}
      >
        {s.step}
      </div>

      {/* Left accent bar */}
      <div
        style={{
          width: "5px",
          background: s.gradient,
          flexShrink: 0,
          transform: hovered ? "scaleY(1)" : "scaleY(0.3)",
          transformOrigin: "top",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: "0 4px 4px 0",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between py-12 px-10 md:px-14 flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-[13px] font-bold tracking-widest uppercase"
              style={{ color: s.accent }}
            >
              Step {s.step}
            </span>
            <span className="text-[13px] text-[#9ca3af] font-medium">/ 04</span>
          </div>

          {/* Animated dot ring */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${s.accent}`,
                opacity: hovered ? 1 : 0.3,
                transform: hovered ? "scale(1.3)" : "scale(1)",
                transition: "all 0.4s ease",
              }}
            />
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: s.accent,
                transition: "transform 0.3s ease",
                transform: hovered ? "scale(1.4)" : "scale(1)",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-black text-[#0A2540] leading-[1.1] tracking-[-0.03em] mb-5"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
          >
            {s.title}
          </h3>
          <p
            className="text-[#4b5563] leading-relaxed font-normal mb-8 max-w-[520px]"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
          >
            {s.body}
          </p>
          <button
            className="relative overflow-hidden rounded-full text-[14px] font-semibold border-none cursor-pointer py-3.5 px-7 group"
            style={{
              background: s.gradient,
              color: "#fff",
            }}
          >
            <span className="relative z-10">Start building →</span>
            {/* shimmer */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-75%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                transform: hovered ? "translateX(350%)" : "translateX(0)",
                transition: "transform 0.55s ease",
              }}
            />
          </button>
        </div>
      </div>

      {/* Right color band */}
      <div
        className="hidden md:block flex-none relative overflow-hidden"
        style={{
          width: "220px",
          background: s.gradient,
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
          ...(hovered ? { width: "260px" } : {}),
        }}
      >
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`grid-${i}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
        </svg>

        {/* Step watermark */}
        <div
          className="absolute bottom-4 right-4 font-black text-white/20 leading-none select-none pointer-events-none"
          style={{ fontSize: "96px", letterSpacing: "-0.05em" }}
        >
          {s.step}
        </div>
      </div>
    </div>
  );
}

export default function BuildProcess() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadingVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-32 px-8 font-sans bg-transparent">
      <div className="max-w-[1100px] mx-auto">

        {/* Section Heading */}
        <div ref={headingRef} className="mb-16 md:mb-24 overflow-hidden">
          {["The fastest way", "to", "ship production", "apps."].map((line, li) => (
            <div key={li} className="overflow-hidden">
              <h2
                className="text-[#0a0a0a] font-black tracking-[-0.05em] leading-[1.05] m-0"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  transform: headingVisible ? "translateY(0)" : "translateY(110%)",
                  opacity: headingVisible ? 1 : 0,
                  transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${li * 0.09}s, opacity 0.5s ease ${li * 0.09}s`,
                }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Cards — vertical stack with slide-in from alternating sides */}
        <div className="flex flex-col gap-6">
          {STEPS.map((s, i) => (
            <StepCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}