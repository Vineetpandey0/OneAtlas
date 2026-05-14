"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Model definitions ─────────────────────────────────────────────────────
   logoType: "img"  → use Simple Icons CDN (or official CDN)
             "svg"  → inline SVG path
             "text" → styled text/initials badge
─────────────────────────────────────────────────────────────────────────── */
const MODELS = [
  {
    name: "GPT-4o",
    company: "OpenAI",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/openai/000000",
    bg: "#F9F9F9",
    border: "#E8E8E8",
  },
  {
    name: "Claude 3.5",
    company: "Anthropic",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/anthropic/D4714F",
    bg: "#FDF6F2",
    border: "#F5DDD5",
  },
  {
    name: "Gemini 1.5",
    company: "Google",
    /* Gemini uses a Google DeepMind brand — we use the Google icon */
    logoType: "svg" as const,
    /* Google "G" icon path */
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
    </svg>`,
    bg: "#F0F6FF",
    border: "#D2E4FF",
  },
  {
    name: "Llama 3.1",
    company: "Meta",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/meta/0082FB",
    bg: "#F0F5FF",
    border: "#CCE0FF",
  },
  {
    name: "Mistral Large",
    company: "Mistral AI",
    logoType: "svg" as const,
    /* Mistral "M" wordmark-style icon */
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="5" height="5" fill="#FF7000"/>
      <rect x="9.5" y="2" width="5" height="5" fill="#FF7000"/>
      <rect x="17" y="2" width="5" height="5" fill="#FF7000"/>
      <rect x="2" y="9.5" width="5" height="5" fill="#FF7000" opacity="0.6"/>
      <rect x="17" y="9.5" width="5" height="5" fill="#FF7000" opacity="0.6"/>
      <rect x="2" y="17" width="5" height="5" fill="#FF7000"/>
      <rect x="9.5" y="17" width="5" height="5" fill="#FF7000"/>
      <rect x="17" y="17" width="5" height="5" fill="#FF7000"/>
    </svg>`,
    bg: "#FFF5EE",
    border: "#FFD5B0",
  },
  {
    name: "Grok-2",
    company: "xAI",
    logoType: "svg" as const,
    /* xAI "X" logo */
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000"/>
    </svg>`,
    bg: "#F5F5F5",
    border: "#E0E0E0",
  },
  {
    name: "DeepSeek V3",
    company: "DeepSeek",
    logoType: "svg" as const,
    /* DeepSeek whale-like logomark simplified */
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.738 10.674c-.06-.054-.122-.106-.186-.154a6.855 6.855 0 0 0-.267-4.95c-1.17-2.67-3.84-4.07-6.975-3.69a7.24 7.24 0 0 0-4.695 2.55C8.47 3.054 6.664 2.4 4.736 2.88 2.364 3.468.9 5.604.9 8.13c0 .414.048.825.138 1.224C.426 9.972 0 10.788 0 11.7c0 1.77 1.35 3.21 3.012 3.21.21 0 .414-.024.612-.066.93 1.908 2.688 3.168 4.752 3.384.174.018.348.024.522.024 1.548 0 3.006-.564 4.146-1.596.426.18.882.282 1.356.282 1.998 0 3.618-1.626 3.618-3.63 0-.18-.012-.36-.036-.534a6.3 6.3 0 0 0 2.55-1.518 6.3 6.3 0 0 0 1.206-2.232c.09.006.18.012.27.012 1.302 0 2.37-1.068 2.37-2.382a2.4 2.4 0 0 0-.66-1.68z" fill="#4D6BFF"/>
    </svg>`,
    bg: "#EEF1FF",
    border: "#C5CFFF",
  },
  {
    name: "Command R+",
    company: "Cohere",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/cohere/39594B",
    bg: "#EDF7F0",
    border: "#C2E0CC",
  },
  {
    name: "Perplexity",
    company: "Perplexity AI",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/perplexity/20B8CD",
    bg: "#E8FAFE",
    border: "#B0ECF6",
  },
  {
    name: "Phi-4",
    company: "Microsoft",
    logoType: "img" as const,
    logoSrc: "https://cdn.simpleicons.org/microsoft/737373",
    bg: "#F5F5F5",
    border: "#E0E0E0",
  },
  {
    name: "Qwen 2.5",
    company: "Alibaba",
    logoType: "svg" as const,
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="#FF6A00"/>
    </svg>`,
    bg: "#FFF2E8",
    border: "#FFD0AA",
  },
  {
    name: "Falcon 180B",
    company: "TII",
    logoType: "svg" as const,
    svgContent: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#7C3AED" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    bg: "#F3EEFF",
    border: "#D8BFFF",
  },
];

/* ─── Logo renderer ─── */
function ModelLogo({ model, size = 18 }: { model: typeof MODELS[0]; size?: number }) {
  if (model.logoType === "img") {
    return (
      <img
        src={model.logoSrc}
        alt={model.company}
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
        loading="lazy"
      />
    );
  }
  if (model.logoType === "svg") {
    return (
      <span
        style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
        dangerouslySetInnerHTML={{ __html: model.svgContent! }}
      />
    );
  }
  return null;
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
      background: "#F6F9FC",
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
          <MarqueeRow reversed />
        </div>
      </div>
    </section>
  );
}
