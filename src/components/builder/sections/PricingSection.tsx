"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    desc: "Perfect to explore and experiment",
    cta: "Get started",
    ctaHref: "/sign-up",
    featured: false,
    features: [
      "5 app generations / month",
      "Basic templates",
      "1 project",
      "Community support",
      "Atlas branding on exports",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 23 },
    desc: "For individuals building seriously",
    cta: "Start free trial",
    ctaHref: "/sign-up?plan=pro",
    featured: true,
    badge: "Most popular",
    features: [
      "Unlimited app generations",
      "All templates + early access",
      "Unlimited projects",
      "Priority support",
      "Custom domain export",
      "All AI models (GPT-4o, Claude, Gemini…)",
      "Deploy to Vercel in 1-click",
      "Remove Atlas branding",
    ],
  },
  {
    name: "Team",
    price: { monthly: 79, annual: 63 },
    desc: "Built for teams shipping together",
    cta: "Contact sales",
    ctaHref: "mailto:hello@oneatlas.ai",
    featured: false,
    features: [
      "Everything in Pro",
      "5 seats included",
      "Shared project workspace",
      "Role-based permissions",
      "SSO / SAML",
      "Dedicated onboarding",
      "SLA & uptime guarantee",
    ],
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

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const header = useScrollReveal();

  return (
    <section id="pricing" style={{ background: "#F6F9FC", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <style>{`
        .price-card { transition: box-shadow 0.25s ease, transform 0.25s ease; }
        .price-card:hover { box-shadow: 0 12px 40px rgba(10,37,64,0.1) !important; transform: translateY(-3px); }
      `}</style>

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
            — Simple pricing
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: "0 0 0.75rem", lineHeight: 1.15 }}>
            Start free. Scale when ready.
          </h2>
          <p style={{ color: "#425466", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 1.75rem" }}>
            No hidden fees. Cancel anytime. All plans include a 14-day trial of Pro.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #E4E7EB", borderRadius: 100, padding: "4px 4px 4px 16px" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: annual ? "#697386" : "#0A2540" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              aria-checked={annual}
              role="switch"
              style={{
                width: 44, height: 24, borderRadius: 100, border: "none",
                background: annual ? "#635BFF" : "#E4E7EB",
                cursor: "pointer", position: "relative", transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: 3, left: annual ? 23 : 3,
                width: 18, height: 18, borderRadius: "50%", background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              }} />
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: annual ? "#0A2540" : "#697386" }}>Annual</span>
            {annual && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                background: "#DCFCE7", color: "#166534",
                borderRadius: 100, padding: "3px 10px", marginRight: 4,
              }}>
                SAVE 20%
              </span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "stretch" }}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className="price-card"
              style={{
                border: plan.featured ? "2px solid #635BFF" : "1px solid #E4E7EB",
                borderRadius: 20,
                background: "#fff",
                padding: "2rem",
                position: "relative",
                boxShadow: plan.featured ? "0 8px 40px rgba(99,91,255,0.14)" : "0 1px 4px rgba(10,37,64,0.05)",
                opacity: 0,
                animation: `fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s forwards`,
              }}
            >
              {plan.badge && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "#635BFF", color: "#fff",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  borderRadius: 100, padding: "4px 14px",
                  display: "inline-flex", alignItems: "center", gap: 5,
                  whiteSpace: "nowrap",
                }}>
                  <Sparkles size={10} /> {plan.badge}
                </div>
              )}

              <p style={{ fontSize: 12, color: "#697386", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>{plan.name}</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#0A2540", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  ${annual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span style={{ fontSize: 13, color: "#697386", paddingBottom: 4 }}>/mo</span>
                )}
              </div>
              <p style={{ fontSize: 13.5, color: "#425466", lineHeight: 1.6, margin: "0 0 1.5rem" }}>{plan.desc}</p>

              <a
                href={plan.ctaHref}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "11px 0", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  textDecoration: "none", marginBottom: "1.5rem",
                  background: plan.featured ? "#635BFF" : "transparent",
                  color: plan.featured ? "#fff" : "#0A2540",
                  border: plan.featured ? "none" : "1.5px solid #E4E7EB",
                  transition: "opacity 0.2s, background 0.2s",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {plan.featured && <Zap size={14} />} {plan.cta}
              </a>

              <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "1.25rem" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#697386", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.85rem" }}>
                  What's included
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#425466", lineHeight: 1.45 }}>
                      <Check size={14} strokeWidth={2.5} style={{ color: plan.featured ? "#635BFF" : "#10B981", flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  );
}
