"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Paintbrush, Rocket, BarChart3, Check } from "lucide-react";

const ROLES = [
  {
    key: "Developer",
    icon: Code2,
    color: "#635BFF",
    bg: "#EEEFFD",
    headline: "Ship full-stack apps without the boilerplate.",
    sub: "Generate clean, modular code you'd actually write yourself — routes, schemas, components, and deploy configs included.",
    benefits: [
      "Readable, typed TypeScript output",
      "Prisma schema + auto-migrations",
      "API routes and auth scaffolded",
      "Next.js, Vite, or React — your choice",
      "Git-ready export every time",
    ],
    visual: { gradient: "linear-gradient(135deg,#635BFF,#818CF8)", label: "TypeScript · Next.js · Prisma" },
  },
  {
    key: "Designer",
    icon: Paintbrush,
    color: "#EC4899",
    bg: "#FDE8F3",
    headline: "Go from Figma concept to live UI instantly.",
    sub: "Describe your design intent and get production-quality components with consistent spacing, tokens, and responsive layouts.",
    benefits: [
      "Tailwind + token-based design system",
      "Responsive at every breakpoint",
      "Dark/light mode out of the box",
      "Customisable component output",
      "No more developer back-and-forth",
    ],
    visual: { gradient: "linear-gradient(135deg,#EC4899,#F472B6)", label: "Tailwind · Components · Responsive" },
  },
  {
    key: "Founder",
    icon: Rocket,
    color: "#F59E0B",
    bg: "#FEF3C7",
    headline: "Validate ideas before hiring a dev team.",
    sub: "Turn your product vision into a working prototype in hours — not weeks. Test, iterate, and ship while competitors are still writing specs.",
    benefits: [
      "MVP in under a day",
      "One-click Vercel deploy",
      "Built-in landing page templates",
      "Stripe payment integration",
      "Full codebase you own forever",
    ],
    visual: { gradient: "linear-gradient(135deg,#F59E0B,#FCD34D)", label: "MVP · Deploy · Own" },
  },
  {
    key: "Manager",
    icon: BarChart3,
    color: "#10B981",
    bg: "#D1FAE5",
    headline: "Reduce dev costs without sacrificing quality.",
    sub: "Give your team a 10× productivity boost. Automate the repetitive scaffolding work so engineers focus on what only humans can do.",
    benefits: [
      "Reduce sprint kickoff time by 60%",
      "Consistent code standards across projects",
      "Audit-ready, documented output",
      "Team workspace & collaboration",
      "Enterprise SSO & permissions",
    ],
    visual: { gradient: "linear-gradient(135deg,#10B981,#34D399)", label: "Teams · Workflows · Scale" },
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

export default function AtlasForRoles() {
  const [active, setActive] = useState("Developer");
  const header = useScrollReveal();
  const body = useScrollReveal();
  const role = ROLES.find(r => r.key === active)!;
  const Icon = role.icon;

  return (
    <section id="for-roles" style={{ background: "#F6F9FC", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div ref={header.ref} style={{
          textAlign: "center",
          opacity: header.visible ? 1 : 0,
          transform: header.visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "2.5rem",
        }}>
          <p style={{ fontSize: 11, color: "#697386", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            — Built for every role
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: "0 0 0.75rem", lineHeight: 1.15 }}>
            OneAtlas for every team
          </h2>
          <p style={{ color: "#425466", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            Whether you write code, design UIs, or run the business — Atlas adapts to how you work.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          {ROLES.map(r => {
            const RIcon = r.icon;
            const isActive = r.key === active;
            return (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 20px", borderRadius: 100, fontSize: 13.5, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s",
                  border: isActive ? `1.5px solid ${r.color}` : "1.5px solid #E4E7EB",
                  background: isActive ? r.bg : "#fff",
                  color: isActive ? r.color : "#425466",
                }}
              >
                <RIcon size={15} strokeWidth={2} />
                {r.key}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div
          ref={body.ref}
          key={active}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
            opacity: body.visible ? 1 : 0,
            transform: body.visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Left: copy */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 52, height: 52, borderRadius: 14,
              background: role.bg, marginBottom: "1.25rem",
            }}>
              <Icon size={24} color={role.color} strokeWidth={1.8} />
            </div>
            <h3 style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#0A2540", letterSpacing: "-0.025em", lineHeight: 1.2, margin: "0 0 0.75rem" }}>
              {role.headline}
            </h3>
            <p style={{ fontSize: 15, color: "#425466", lineHeight: 1.75, margin: "0 0 1.5rem" }}>{role.sub}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {role.benefits.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#425466" }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: role.bg, display: "inline-flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Check size={11} strokeWidth={2.5} color={role.color} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="/sign-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: "2rem", padding: "11px 24px", borderRadius: 10,
                background: role.color, color: "#fff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                transition: "opacity 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Get started as a {role.key}
            </a>
          </div>

          {/* Right: visual */}
          <div style={{
            borderRadius: 20,
            background: role.visual.gradient,
            minHeight: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "2.5rem",
            boxShadow: `0 16px 48px ${role.color}22`,
          }}>
            <Icon size={56} color="rgba(255,255,255,0.7)" strokeWidth={1.2} />
            <span style={{
              background: "rgba(255,255,255,0.2)", color: "#fff",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
              borderRadius: 100, padding: "6px 16px",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
              {role.visual.label}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #for-roles .role-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
