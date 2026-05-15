"use client";

import {
  Database,
  Zap,
  Terminal,
  Users,
  Activity,
  Puzzle,
  Search,
  Timer,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    title: "Database & Editor",
    description:
      "Every app comes with a built-in database and visual editor to manage your data. Add, edit, and organise records.",
    icon: Database,
    accent: "#635BFF",
    glow: "rgba(99,91,255,0.18)",
    gradient: "linear-gradient(135deg, #635BFF 0%, #a78bfa 100%)",
  },
  {
    title: "1-click Hosting",
    description:
      "Go live in seconds with one-click hosting. No servers to configure — just publish and share your app with the world.",
    icon: Zap,
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  },
  {
    title: "Backend, Built-in",
    description:
      "OneAtlas gives you a fully managed backend out of the box. Create API endpoints and connect to external services with ease.",
    icon: Terminal,
    accent: "#10b981",
    glow: "rgba(16,185,129,0.18)",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  },
  {
    title: "User Management",
    description:
      "Add login, signup, and user roles to your app in minutes. Manage access controls and user data securely, all built right in.",
    icon: Users,
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.18)",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
  },
  {
    title: "Automated Tasks",
    description:
      "Schedule background jobs, cron tasks, and complex workflows that run automatically while you focus on building.",
    icon: Activity,
    accent: "#0ea5e9",
    glow: "rgba(14,165,233,0.18)",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
  },
  {
    title: "Integrations",
    description:
      "Connect your application to thousands of external tools and services via pre-built webhooks and API connectors.",
    icon: Puzzle,
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)",
  },
  {
    title: "Built to be Found",
    description:
      "Your apps are SEO-optimized by default with meta tags, sitemaps, and lightning-fast indexing readiness built in.",
    icon: Search,
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)",
  },
  {
    title: "Fast Page Loads",
    description:
      "Experience global edge delivery and optimized asset compression that ensures your users never wait for a page.",
    icon: Timer,
    accent: "#f97316",
    glow: "rgba(249,115,22,0.18)",
    gradient: "linear-gradient(135deg, #f97316 0%, #fdba74 100%)",
  },
];

function FeatureCard({
  f,
  i,
  total,
}: {
  f: (typeof FEATURES)[0];
  i: number;
  total: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const col = i % 4;
  const row = Math.floor(i / 4);
  const cols = 4;
  const rows = Math.ceil(total / cols);

  const borderR = col < cols - 1;
  const borderB = row < rows - 1;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`,
        borderRight: borderR ? "1px solid #F1F5F9" : "none",
        borderBottom: borderB ? "1px solid #F1F5F9" : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
      className="p-10 group"
    >
      {/* Mouse-tracked radial spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, ${f.glow}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top-left corner accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? "60px" : "0px",
          height: "3px",
          background: f.gradient,
          transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: "0 0 3px 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: hovered ? "60px" : "0px",
          background: f.gradient,
          transition: "height 0.45s cubic-bezier(0.22,1,0.36,1) 0.04s",
          borderRadius: "0 0 3px 0",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-8">
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: hovered ? f.gradient : "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
            transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1) rotate(0deg)",
            boxShadow: hovered ? `0 8px 24px -4px ${f.glow}` : "none",
          }}
        >
          <f.icon
            size={22}
            style={{
              color: hovered ? "#fff" : f.accent,
              transition: "color 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3
          className="text-lg font-bold mb-3"
          style={{
            color: hovered ? f.accent : "#0f172a",
            transition: "color 0.35s ease",
          }}
        >
          {f.title}
        </h3>
        <p
          className="text-[15px] leading-relaxed"
          style={{
            color: hovered ? "#475569" : "#64748b",
            transition: "color 0.35s ease",
          }}
        >
          {f.description}
        </p>
      </div>

      {/* Bottom shimmer line on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: f.gradient,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

export default function EverythingSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadingVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Header */}
        <div ref={headingRef} className="mb-20">
          <div
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF2FF] text-[#635BFF] text-[13px] font-bold mb-6"
          >
            Platform
          </div>

          <div className="overflow-hidden">
            <h2
              className="text-[#0f172a] font-black tracking-tight leading-[1.1] mb-6"
              style={{
                fontSize: "clamp(2.5rem,6vw,4.5rem)",
                transform: headingVisible ? "translateY(0)" : "translateY(100%)",
                opacity: headingVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.5s ease 0.1s",
              }}
            >
              Everything you need,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #635BFF 0%, #FF3366 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                built-in.
              </span>
            </h2>
          </div>

          <p
            className="text-[#64748b] text-xl max-w-[600px] leading-relaxed font-medium"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
            }}
          >
            Build, launch, and run your business from a single platform with
            everything you need built right in.
          </p>
        </div>

        {/* Grid */}
        <div
          className="rounded-[32px] overflow-hidden bg-white"
          style={{
            border: "1px solid #F1F5F9",
            boxShadow: "0 10px 50px -12px rgba(0,0,0,0.05)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} f={f} i={i} total={FEATURES.length} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}