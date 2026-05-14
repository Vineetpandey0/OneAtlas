"use client";

import { useEffect, useRef, useState } from "react";

import {
  OpenAI,
  Claude,
  Google,
  Meta,
  Mistral,
  Grok,
  DeepSeek,
  Cohere,
  Perplexity,
  Microsoft,
  Qwen,
  TII
} from "@lobehub/icons";

/* ─── Model definitions ───────────────────────────────────────────────────── */
const MODELS = [
  {
    name: "GPT-4o",
    company: "OpenAI",
    Icon: OpenAI,
    bg: "#F9F9F9",
    border: "#E8E8E8",
  },
  {
    name: "Claude 3.5",
    company: "Claude",
    Icon: Claude,
    bg: "#FDF6F2",
    border: "#F5DDD5",
  },
  {
    name: "Gemini 1.5",
    company: "Google",
    Icon: Google,
    bg: "#F0F6FF",
    border: "#D2E4FF",
  },
  {
    name: "Llama 3.1",
    company: "Meta",
    Icon: Meta,
    bg: "#F0F5FF",
    border: "#CCE0FF",
  },
  {
    name: "Mistral Large",
    company: "Mistral AI",
    Icon: Mistral,
    bg: "#FFF5EE",
    border: "#FFD5B0",
  },
  {
    name: "Grok-2",
    company: "xAI",
    Icon: Grok,
    bg: "#F5F5F5",
    border: "#E0E0E0",
  },
  {
    name: "DeepSeek V3",
    company: "DeepSeek",
    Icon: DeepSeek,
    bg: "#EEF1FF",
    border: "#C5CFFF",
  },
  {
    name: "Command R+",
    company: "Cohere",
    Icon: Cohere,
    bg: "#EDF7F0",
    border: "#C2E0CC",
  },
  {
    name: "Perplexity",
    company: "Perplexity AI",
    Icon: Perplexity,
    bg: "#E8FAFE",
    border: "#B0ECF6",
  },
  {
    name: "Phi-4",
    company: "Microsoft",
    Icon: Microsoft,
    bg: "#F5F5F5",
    border: "#E0E0E0",
  },
  {
    name: "Qwen 2.5",
    company: "Alibaba",
    Icon: Qwen,
    bg: "#FFF2E8",
    border: "#FFD0AA",
  },
  {
    name: "Falcon 180B",
    company: "TII",
    Icon: TII,
    bg: "#F3EEFF",
    border: "#D8BFFF",
  },
];

/* ─── Logo renderer ─── */
function ModelLogo({ model, size = 18 }: { model: typeof MODELS[0]; size?: number }) {
  const BaseIcon = model.Icon as any;
  
  // Prefer the pre-colored SVG if the icon package exports it
  const IconComponent = BaseIcon.Color || BaseIcon.BrandColor || BaseIcon;
  
  // If no colored component exists, fallback to coloring the Mono icon with the brand's primary color
  const colorProp = (!BaseIcon.Color && !BaseIcon.BrandColor && BaseIcon.colorPrimary) 
    ? { color: BaseIcon.colorPrimary } 
    : {};

  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <IconComponent size={size} {...colorProp} />
    </span>
  );
}

/* ─── Minimal vertical logo + label (no outer box) ─── */
function ModelPill({ model }: { model: typeof MODELS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9,
        width: 90,
        cursor: "default",
        textAlign: "center",
        padding: "4px 0",
      }}
    >
      {/* Logo icon square — the only visual element */}
      <span style={{
        width: 56, height: 56,
        borderRadius: 16,
        background: model.bg,
        border: `1.5px solid ${hovered ? model.border : "transparent"}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-4px) scale(1.06)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 8px 20px ${model.border}88` : "none",
      }}>
        <ModelLogo model={model} size={30} />
      </span>

      {/* Name + company — plain text, no box */}
      <div>
        <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, color: "#0A2540", lineHeight: 1.3, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
          {model.name}
        </p>
        <p style={{ margin: "1px 0 0", fontSize: 10, color: "#97A3B4", lineHeight: 1.2, fontWeight: 500, whiteSpace: "nowrap" }}>
          {model.company}
        </p>
      </div>
    </div>
  );
}

/* ─── Marquee row ─── */
function MarqueeRow({ reversed = false }: { reversed?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const items = [...MODELS, ...MODELS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const speed = reversed ? -0.4 : 0.4;
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
        style={{
          display: "flex", gap: 14, width: "max-content",
          padding: "6px 0", willChange: "transform",
        }}
      >
        {items.map((m, i) => <ModelPill key={`${m.name}-${i}`} model={m} />)}
      </div>
    </div>
  );
}

/* ─── Section ─── */
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
    <section style={{
      borderTop: "1px solid #E4E7EB",
      borderBottom: "1px solid #E4E7EB",
      overflow: "hidden",
      padding: "5rem 0",
    }}>
      {/* Header */}
      <div
        ref={ref}
        style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 2rem 3rem",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p style={{
          fontSize: 11, color: "#697386", letterSpacing: "0.16em",
          textTransform: "uppercase", marginBottom: "0.75rem",
        }}>
          — Powered by every frontier model
        </p>
        <h2 style={{
          fontWeight: 800,
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          color: "#0A2540", letterSpacing: "-0.03em",
          margin: 0, lineHeight: 1.15,
        }}>
          Build with all the latest AI models
        </h2>
        <p style={{ color: "#425466", fontSize: 16, marginTop: "0.85rem", lineHeight: 1.75 }}>
          OneAtlas connects to every top model so you always use the best one for the job.
        </p>
      </div>

      {/* Marquee rows with fade edges */}
      <div style={{ position: "relative" }}>
        {(["left", "right"] as const).map(side => (
          <div key={side} style={{
            position: "absolute", top: 0, bottom: 0, [side]: 0,
            width: 140, zIndex: 2, pointerEvents: "none",
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #F6F9FC, transparent)`,
          }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
