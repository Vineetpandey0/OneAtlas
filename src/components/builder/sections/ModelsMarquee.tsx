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
  TII,
} from "@lobehub/icons";

/* ─── Models ─────────────────────────────────────────────────────────────── */
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

/* ─── Logo ──────────────────────────────────────────────────────────────── */
function ModelLogo({
  model,
  size = 18,
}: {
  model: (typeof MODELS)[0];
  size?: number;
}) {
  const BaseIcon = model.Icon as any;

  const IconComponent = BaseIcon.Color || BaseIcon.BrandColor || BaseIcon;

  const colorProp =
    !BaseIcon.Color && !BaseIcon.BrandColor && BaseIcon.colorPrimary
      ? { color: BaseIcon.colorPrimary }
      : {};

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconComponent size={size} {...colorProp} />
    </span>
  );
}

/* ─── Pill ───────────────────────────────────────────────────────────────── */
function ModelPill({ model }: { model: (typeof MODELS)[0] }) {
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
        gap: 12,
        padding: "0 10px",
        textAlign: "center",
        transition: "opacity 0.2s",
        opacity: hovered ? 1 : 0.85,
      }}
    >
      <span
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: model.bg,
          border: `1.5px solid ${
            hovered ? model.border : "transparent"
          }`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: hovered
            ? "translateY(-6px) scale(1.1)"
            : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 12px 24px ${model.border}66`
            : "0 2px 8px rgba(0,0,0,0.02)",
        }}
      >
        <ModelLogo model={model} size={40} />
      </span>

      <div>
        <p
          style={{
            margin: 0,
            fontSize: 12.5,
            fontWeight: 700,
            color: "#0A2540",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          {model.name}
        </p>

        <p
          style={{
            margin: "2px 0 0",
            fontSize: 10,
            color: "#697386",
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          {model.company}
        </p>
      </div>
    </div>
  );
}

/* ─── Linear marquee ────────────────────────────────────────────────────── */
function MarqueeRow() {
  const trackRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(0);

  const [hovered, setHovered] = useState(false);

  const items = [...MODELS, ...MODELS, ...MODELS];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;

    if (!track) return;

    let raf = 0;

    const speed = 0.8;

    const animate = () => {
      if (!hovered) {
        positionRef.current += speed;

        const trackWidth = track.scrollWidth;
        const oneThird = trackWidth / 3;

        if (positionRef.current >= oneThird) {
          positionRef.current = 0;
        }

        track.style.transform = `translateX(-${positionRef.current}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          width: "max-content",
          willChange: "transform",
          padding: "24px 0",
        }}
      >
        {items.map((model, i) => (
          <ModelPill
            key={`${model.name}-${i}`}
            model={model}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function ModelsMarquee() {
  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        borderTop: "none",
        borderBottom: "none",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      {/* Header */}
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem 1rem",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0)"
            : "translateY(28px)",
          transition:
            "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#697386",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          — Powered by every frontier model
        </p>

        <h2
          style={{
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            color: "#0A2540",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Build with all the latest AI models
        </h2>

        <p
          style={{
            color: "#425466",
            fontSize: 16,
            marginTop: "0.85rem",
            lineHeight: 1.75,
          }}
        >
          OneAtlas connects to every top model so you
          always use the best one for the job.
        </p>
      </div>

      {/* Scroll */}
      <div style={{ position: "relative" }}>
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              [side]: 0,
              width: 140,
              zIndex: 2,
              pointerEvents: "none",
              background: `linear-gradient(to ${
                side === "left" ? "right" : "left"
              }, #F6F9FC, transparent)`,
            }}
          />
        ))}

        <MarqueeRow />
      </div>
    </section>
  );
}