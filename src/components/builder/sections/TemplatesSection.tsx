"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, LayoutTemplate } from "lucide-react";

const CATEGORIES = ["All", "Website", "Dashboard", "E-commerce", "Blog", "Landing Page"];

const TEMPLATES = [
  { name: "SaaS Landing Page",    category: "Landing Page", tag: "Popular",  gradient: "linear-gradient(135deg,#635BFF,#818CF8)", desc: "High-converting SaaS landing with pricing & testimonials" },
  { name: "E-commerce Store",     category: "E-commerce",  tag: "New",      gradient: "linear-gradient(135deg,#0EA5E9,#38BDF8)", desc: "Full product catalog, cart, and checkout flow" },
  { name: "Admin Dashboard",      category: "Dashboard",   tag: "",         gradient: "linear-gradient(135deg,#10B981,#34D399)", desc: "Analytics charts, data tables, and sidebar nav" },
  { name: "Personal Portfolio",   category: "Website",     tag: "Popular",  gradient: "linear-gradient(135deg,#F59E0B,#FCD34D)", desc: "Clean portfolio with projects, bio, and contact" },
  { name: "Blog Platform",        category: "Blog",        tag: "",         gradient: "linear-gradient(135deg,#EC4899,#F472B6)", desc: "Article listing, reader view, and author page" },
  { name: "Business Website",     category: "Website",     tag: "New",      gradient: "linear-gradient(135deg,#8B5CF6,#A78BFA)", desc: "Services, team, testimonials, and CTA sections" },
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

function TemplateCard({ t, i }: { t: typeof TEMPLATES[0]; i: number }) {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.08}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${i * 0.08}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? "#C7D2FE" : "#E4E7EB"}`,
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
          boxShadow: hovered ? "0 8px 32px rgba(99,91,255,0.1)" : "0 1px 4px rgba(10,37,64,0.06)",
          transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          cursor: "default",
        }}
      >
        {/* Preview */}
        <div style={{
          height: 160,
          background: t.gradient,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <LayoutTemplate size={36} color="rgba(255,255,255,0.5)" strokeWidth={1.2} />
          {t.tag && (
            <span style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: 100, padding: "3px 10px",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
              {t.tag}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem 1.25rem 1rem" }}>
          <p style={{ fontSize: 10, color: "#697386", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.4rem", fontWeight: 600 }}>
            {t.category}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A2540", margin: "0 0 0.4rem", lineHeight: 1.25 }}>{t.name}</h3>
          <p style={{ fontSize: 12.5, color: "#697386", margin: "0 0 1rem", lineHeight: 1.65 }}>{t.desc}</p>

          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12.5, fontWeight: 600, color: "#635BFF",
              background: "none", border: "none", padding: 0, cursor: "pointer",
              transition: "gap 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
          >
            Use template <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesSection() {
  const [active, setActive] = useState("All");
  const header = useScrollReveal();
  const filtered = active === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === active);

  return (
    <section id="templates" style={{ background: "#fff", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div ref={header.ref} style={{
          opacity: header.visible ? 1 : 0,
          transform: header.visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "2.5rem",
        }}>
          <p style={{ fontSize: 11, color: "#697386", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            — Start faster
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: 0, lineHeight: 1.15 }}>
              Browse templates
            </h2>
            <a href="#" style={{ fontSize: 13.5, fontWeight: 600, color: "#635BFF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
              View all <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.18s",
                border: active === cat ? "1px solid #635BFF" : "1px solid #E4E7EB",
                background: active === cat ? "#635BFF" : "#fff",
                color: active === cat ? "#fff" : "#425466",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.map((t, i) => <TemplateCard key={t.name} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
