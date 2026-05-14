"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "Flowmatic",
    avatar: "#635BFF",
    initials: "SC",
    stars: 5,
    quote: "OneAtlas cut our MVP timeline from 3 weeks to 3 days. The code quality is production-grade — we shipped it without a rewrite.",
  },
  {
    name: "Marcus Reid",
    role: "Senior Engineer",
    company: "Vercel",
    avatar: "#0EA5E9",
    initials: "MR",
    stars: 5,
    quote: "I was skeptical about AI-generated code. Atlas changed my mind. The architecture decisions are exactly what I'd make myself.",
  },
  {
    name: "Priya Nair",
    role: "Product Designer",
    company: "Notion",
    avatar: "#10B981",
    initials: "PN",
    stars: 5,
    quote: "Finally an AI builder that respects design. The generated UIs are clean and consistent — not the usual Frankenstein output.",
  },
  {
    name: "Tom Barker",
    role: "CTO",
    company: "Startups.com",
    avatar: "#F59E0B",
    initials: "TB",
    stars: 5,
    quote: "We prototyped 12 ideas in a month. OneAtlas lets us validate fast and double down on what works. It's a force multiplier.",
  },
  {
    name: "Lena Müller",
    role: "Indie Developer",
    company: "Self-employed",
    avatar: "#EC4899",
    initials: "LM",
    stars: 5,
    quote: "As a solo dev, Atlas is like having a team. I launched my SaaS in 10 days and hit $5K MRR in the first month.",
  },
  {
    name: "James Park",
    role: "Engineering Lead",
    company: "Linear",
    avatar: "#8B5CF6",
    initials: "JP",
    stars: 5,
    quote: "The Prisma schema + migrations workflow is seamless. Atlas understands complex data models and generates them correctly.",
  },
];

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, box-shadow 0.2s ease, border-color 0.2s ease`,
        border: "1px solid #E4E7EB",
        borderRadius: 16,
        background: "#fff",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 1px 4px rgba(10,37,64,0.05)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(99,91,255,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "#C7D2FE";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(10,37,64,0.05)";
        (e.currentTarget as HTMLElement).style.borderColor = "#E4E7EB";
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: t.stars }).map((_, j) => (
          <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontSize: 14.5, color: "#425466", lineHeight: 1.72, margin: 0, flex: 1 }}>
        "{t.quote}"
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: "0.75rem", borderTop: "1px solid #F3F4F6" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: t.avatar, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", flexShrink: 0,
        }}>
          {t.initials}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0A2540", lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: "#697386", lineHeight: 1.4 }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const header = useScrollReveal();

  return (
    <section id="testimonials" style={{ background: "transparent", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
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
            — Loved by builders
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: "0 0 0.75rem", lineHeight: 1.15 }}>
            What our users say
          </h2>
          <p style={{ color: "#425466", fontSize: 16, lineHeight: 1.75, maxWidth: 460, margin: "0 auto" }}>
            Thousands of developers, designers, and founders are building with OneAtlas every day.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
