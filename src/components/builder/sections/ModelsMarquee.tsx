"use client";

import { useEffect, useRef, useState } from "react";

const MODELS = [
  { name: "GPT-4o",             color: "#10A37F", bg: "#E8F5EF" },
  { name: "Claude 3.5 Sonnet",  color: "#C96A37", bg: "#FBF0E8" },
  { name: "Gemini 1.5 Pro",     color: "#4285F4", bg: "#E8F1FE" },
  { name: "Llama 3.1",          color: "#7C5CFC", bg: "#EEE9FF" },
  { name: "Mistral Large",      color: "#F7A730", bg: "#FEF6E4" },
  { name: "Grok-2",             color: "#1DA1F2", bg: "#E6F4FD" },
  { name: "DeepSeek V3",        color: "#0EA5E9", bg: "#E0F5FE" },
  { name: "Command R+",         color: "#E85D75", bg: "#FDEAEE" },
  { name: "Qwen 2.5",           color: "#6366F1", bg: "#EEEFFD" },
  { name: "Perplexity",         color: "#20B8CD", bg: "#E0F7FA" },
  { name: "Phi-4",              color: "#0078D4", bg: "#E3F2FD" },
  { name: "Falcon-180B",        color: "#9333EA", bg: "#F3E8FF" },
];

function ModelPill({ model }: { model: typeof MODELS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 18px",
      borderRadius: 100,
      border: "1px solid #E4E7EB",
      background: "#fff",
      boxShadow: "0 1px 4px rgba(10,37,64,0.06)",
      cursor: "default",
      whiteSpace: "nowrap",
    }}>
      <span style={{
        width: 26, height: 26, borderRadius: "50%",
        background: model.bg,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, color: model.color,
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}>
        {model.name[0]}
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0A2540", letterSpacing: "-0.01em" }}>
        {model.name}
      </span>
    </div>
  );
}

function MarqueeRow({ reversed = false }: { reversed?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const items = [...MODELS, ...MODELS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const speed = reversed ? -0.5 : 0.5;
    const run = () => {
      if (!hovered) {
        posRef.current += speed;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        if (posRef.current < 0) posRef.current = half;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [hovered, reversed]);

  return (
    <div
      style={{ overflow: "hidden", position: "relative", width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        style={{ display: "flex", gap: 12, width: "max-content", padding: "6px 0", willChange: "transform" }}
      >
        {items.map((m, i) => <ModelPill key={i} model={m} />)}
      </div>
    </div>
  );
}

export default function ModelsMarquee() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#F6F9FC", borderTop: "1px solid #E4E7EB", borderBottom: "1px solid #E4E7EB", overflow: "hidden", padding: "5rem 0" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 2rem 3rem",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "#697386", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          — Powered by every frontier model
        </p>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: 0, lineHeight: 1.15 }}>
          Build with all the latest AI models
        </h2>
        <p style={{ color: "#425466", fontSize: 16, marginTop: "0.85rem", lineHeight: 1.75 }}>
          OneAtlas connects to every top model so you always use the best one for the job.
        </p>
      </div>

      {/* Fade edges */}
      <div style={{ position: "relative" }}>
        {(["left", "right"] as const).map(side => (
          <div key={side} style={{
            position: "absolute", top: 0, bottom: 0, [side]: 0, width: 120, zIndex: 2, pointerEvents: "none",
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #F6F9FC, transparent)`,
          }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <MarqueeRow />
          <MarqueeRow reversed />
        </div>
      </div>
    </section>
  );
}
