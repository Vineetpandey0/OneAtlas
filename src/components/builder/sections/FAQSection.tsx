"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";

const FAQS = [
  {
    group: "Product",
    questions: [
      {
        q: "What is OneAtlas?",
        a: "OneAtlas is an AI-powered app builder that generates full-stack, production-ready applications from a plain-language description. It handles the component tree, data model, API routes, and deployment config — all in one pass.",
      },
      {
        q: "What kind of apps can I build?",
        a: "Anything from landing pages and portfolios to SaaS dashboards, e-commerce stores, and internal tools. If you can describe it, OneAtlas can generate it.",
      },
      {
        q: "Is the generated code actually production-ready?",
        a: "Yes. The output follows the same standards a senior engineer would enforce: typed TypeScript, modular components, conventional file structure, and clean separation of concerns. You can ship it as-is or extend it.",
      },
    ],
  },
  {
    group: "AI & Models",
    questions: [
      {
        q: "Which AI models does OneAtlas support?",
        a: "OneAtlas connects to GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1, Mistral Large, DeepSeek V3, and more. Pro and Team plans can choose any model; Free uses the default optimised model.",
      },
      {
        q: "Can I switch models mid-project?",
        a: "Yes. On Pro and Team plans you can change the generation model at any time. Each section or component can even use a different model if you prefer.",
      },
    ],
  },
  {
    group: "Pricing & Billing",
    questions: [
      {
        q: "Is there a free plan?",
        a: "Yes. The Free plan includes 5 app generations per month with access to basic templates. No credit card required to sign up.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees and your exports remain yours.",
      },
      {
        q: "Do you offer refunds?",
        a: "If you're not satisfied within the first 14 days of a paid plan, we'll issue a full refund — no questions asked.",
      },
    ],
  },
  {
    group: "Ownership & Export",
    questions: [
      {
        q: "Do I own the code OneAtlas generates?",
        a: "100%. Every line of code generated is yours to use, modify, sell, or deploy however you like. There's no license restriction on the output.",
      },
      {
        q: "Can I export and host it myself?",
        a: "Yes. You can download the full codebase as a zip and deploy it to any host — Vercel, Netlify, Railway, AWS, or your own server. Deployment configs are included.",
      },
    ],
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ borderBottom: "1px solid #E4E7EB" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.1rem 0", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: 16,
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#0A2540", lineHeight: 1.4, flex: 1 }}>{q}</span>
        <ChevronDown
          size={18}
          color="#697386"
          style={{
            flexShrink: 0,
            transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        ref={bodyRef}
        style={{
          overflow: "hidden",
          maxHeight: open ? 400 : 0,
          transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <p style={{ fontSize: 14.5, color: "#425466", lineHeight: 1.75, margin: "0 0 1.1rem", paddingRight: 32 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const header = useScrollReveal();
  const body = useScrollReveal();
  let qIndex = 0;

  return (
    <section id="faq" style={{ background: "transparent", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div ref={header.ref} style={{
          textAlign: "center",
          opacity: header.visible ? 1 : 0,
          transform: header.visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "3.5rem",
        }}>
          <p style={{ fontSize: 11, color: "#697386", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            — FAQ
          </p>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A2540", letterSpacing: "-0.03em", margin: "0 0 0.75rem", lineHeight: 1.15 }}>
            Frequently asked questions
          </h2>
          <p style={{ color: "#425466", fontSize: 16, lineHeight: 1.75, maxWidth: 440, margin: "0 auto" }}>
            Everything you need to know about OneAtlas. Can't find an answer? Contact us.
          </p>
        </div>

        {/* Accordion groups */}
        <div ref={body.ref} style={{
          opacity: body.visible ? 1 : 0,
          transform: body.visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          display: "flex", flexDirection: "column", gap: "2rem",
        }}>
          {FAQS.map(group => (
            <div key={group.group}>
              <p style={{
                fontSize: 11, fontWeight: 700, color: "#697386",
                letterSpacing: "0.14em", textTransform: "uppercase",
                margin: "0 0 0.5rem",
              }}>
                {group.group}
              </p>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E4E7EB", padding: "0 1.5rem" }}>
                {group.questions.map((faq, i) => (
                  <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={qIndex++} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: "3rem",
          textAlign: "center",
          background: "#fff",
          border: "1px solid #E4E7EB",
          borderRadius: 16,
          padding: "2rem",
        }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0A2540", margin: "0 0 0.4rem" }}>
            Still have questions?
          </p>
          <p style={{ fontSize: 14, color: "#697386", margin: "0 0 1.25rem", lineHeight: 1.65 }}>
            Our team is happy to help. Reach out and we'll get back to you within a few hours.
          </p>
          <a
            href="mailto:hello@oneatlas.ai"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 10,
              background: "#635BFF", color: "#fff",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              transition: "opacity 0.2s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            <Mail size={15} /> Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
