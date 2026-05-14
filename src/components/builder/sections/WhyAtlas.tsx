"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Code2, Shield, Globe2, Layers, HeartHandshake } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Zap,
    color: "#F59E0B",
    bg: "#FEF3C7",
    title: "5-Second Generation",
    desc: "From prompt to production-ready app structure in under 5 seconds. No queues, no waiting, no bottlenecks.",
  },
  {
    icon: Code2,
    color: "#635BFF",
    bg: "#EEEFFD",
    title: "Senior-Grade Code",
    desc: "Generated code follows conventions a senior engineer would enforce. Modular, typed, and readable by default.",
  },
  {
    icon: Shield,
    color: "#10B981",
    bg: "#D1FAE5",
    title: "Security Built-In",
    desc: "Auth, input sanitization, security headers, and rate limiting are scaffolded automatically — not an afterthought.",
  },
  {
    icon: Globe2,
    color: "#0EA5E9",
    bg: "#E0F5FE",
    title: "Deploy Anywhere",
    desc: "Vercel, Netlify, Railway, or bare server — deployment configs are auto-generated and ready to push.",
  },
  {
    icon: Layers,
    color: "#8B5CF6",
    bg: "#EDE9FE",
    title: "Modular by Design",
    desc: "Every generation produces composable, reusable components. Extend or replace any part without touching the rest.",
  },
  {
    icon: HeartHandshake,
    color: "#EC4899",
    bg: "#FCE7F3",
    title: "You Own Everything",
    desc: "Every line of code is yours. No lock-in, no subscription gate on exports. Take your project anywhere, anytime.",
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function DiffCard({ d, i }: { d: typeof DIFFERENTIATORS[0]; i: number }) {
  const { ref, visible } = useScrollReveal();
  const Icon = d.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, transform 0.3s ease, box-shadow 0.2s ease, border-color 0.2s ease`,
        border: `1px solid ${hovered ? "#C7D2FE" : "#E4E7EB"}`,
        borderRadius: 16,
        background: "#fff",
        padding: "1.75rem",
        cursor: "default",
        boxShadow: hovered ? "0 8px 32px rgba(99,91,255,0.08)" : "0 1px 4px rgba(10,37,64,0.05)",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: d.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.1rem",
        transition: "transform 0.25s",
        transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1)",
      }}>
        <Icon size={22} color={d.color} strokeWidth={1.8} />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2540", margin: "0 0 0.5rem", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
        {d.title}
      </h3>
      <p style={{ fontSize: 14, color: "#425466", lineHeight: 1.7, margin: 0 }}>
        {d.desc}
      </p>
    </div>
  );
}

export default function WhyAtlas() {
  const header = useScrollReveal();

  return (
    <section id="why-atlas" style={{ background: "#fff", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div ref={header.ref} style={{
          textAlign: "center",
          opacity: header.visible ? 1 : 0,
          transform: header.visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "3rem",
        }}>
          <p style={{ fontSize: 11, color: "#697386", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            — Why OneAtlas
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: "0 0 0.75rem", lineHeight: 1.15 }}>
            Built different. Ships better.
          </h2>
          <p style={{ color: "#425466", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            Not another no-code toy. OneAtlas is engineered for real products with real standards.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {DIFFERENTIATORS.map((d, i) => <DiffCard key={d.title} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}
