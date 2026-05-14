"use client";

import { SparklesIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Design tokens ─── */
const C = { primary: "#635BFF", navy: "#0A2540", muted: "#425466", light: "#697386", border: "#E4E7EB" };

interface Prompt { label: string; prompt: string; }

const placeholders = [
  "SaaS dashboard...", "e-commerce store...", "portfolio website...",
  "landing page...", "internal tool...", "blog platform...",
];

const prompts: Prompt[] = [
  { label: "SaaS Dashboard",    prompt: "Build a SaaS analytics dashboard with charts, user management, billing, and sidebar navigation" },
  { label: "E-commerce Store",  prompt: "Create a full e-commerce store with product listings, cart, checkout, and order history" },
  { label: "Portfolio Website", prompt: "Design a modern portfolio to showcase my projects, skills, and experience professionally" },
  { label: "Landing Page",      prompt: "Create a high-converting landing page with hero, features, pricing, testimonials, and CTA" },
  { label: "Blog Platform",     prompt: "Build a minimal blog with article listing, reader view, tags, and newsletter signup" },
  { label: "Internal Tool",     prompt: "Create an internal admin tool with data tables, filters, forms, and role-based access" },
  { label: "Resume Website",    prompt: "Generate a professional resume website with downloadable PDF and contact form" },
  { label: "Booking App",       prompt: "Build a service booking app with calendar, time slots, and confirmation emails" },
];

/* Typewriter */
function useTypewriter(paused: boolean) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (paused) return;
    const word = placeholders[textIndex];
    if (!deleting && charIndex === word.length) { const t = setTimeout(() => setDeleting(true), 2000); return () => clearTimeout(t); }
    if (deleting && charIndex === 0) { setDeleting(false); setTextIndex(p => (p + 1) % placeholders.length); return; }
    const t = setTimeout(() => setCharIndex(p => p + (deleting ? -1 : 1)), deleting ? 35 : 55);
    return () => clearTimeout(t);
  }, [charIndex, deleting, textIndex, paused]);
  return `Build a ${placeholders[textIndex].substring(0, charIndex)}`;
}

/* Chip marquee */
function ChipMarquee({ selected, onSelect }: { selected: string | null; onSelect: (item: Prompt) => void }) {
  return (
    <div className="relative w-full overflow-hidden mt-3">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10" style={{ background: "linear-gradient(to left, #fff, transparent)" }} />
      <div className="flex gap-2 w-max" style={{ animation: "marquee 30s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {[...prompts, ...prompts].map((item, i) => {
          const on = selected === item.label && i < prompts.length;
          return (
            <button key={`${item.label}-${i}`} onClick={() => onSelect(item)}
              style={{
                whiteSpace: "nowrap", fontSize: 12, fontWeight: 500, padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                border: on ? `1px solid ${C.primary}` : "1px solid #E4E7EB",
                background: on ? "#EEEFFD" : "#F6F9FC",
                color: on ? C.primary : C.light,
                transition: "all 0.18s",
              }}
            >{item.label}</button>
          );
        })}
      </div>
    </div>
  );
}

/* Prompt Box */
function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const placeholder = useTypewriter(!!prompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    window.location.href = `/sign-up?prompt=${encodeURIComponent(prompt)}`;
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [prompt]);

  return (
    <div style={{ width: "100%", maxWidth: 640, opacity: 0, animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.85s forwards" }}>
      <form onSubmit={handleSubmit} style={{
        borderRadius: 18, overflow: "hidden",
        background: "#fff",
        border: `1.5px solid ${focused ? "rgba(99,91,255,0.5)" : C.border}`,
        boxShadow: focused ? "0 0 0 4px rgba(99,91,255,0.08), 0 16px 48px rgba(10,37,64,0.1)" : "0 8px 32px rgba(10,37,64,0.08)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 0" }}>
          <span style={{ fontSize: 10, color: "#B0BAC8", letterSpacing: "0.16em", textTransform: "uppercase" }}>— describe your app</span>
          <div style={{ flex: 1, height: 1, background: "#F3F4F6" }} />
        </div>

        <textarea
          ref={textareaRef}
          rows={3}
          minLength={3}
          required
          value={prompt}
          onChange={e => { setPrompt(e.target.value); setSelected(null); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={`${placeholder}|`}
          style={{
            width: "100%", background: "transparent", border: "none", outline: "none",
            resize: "none", padding: "12px 16px", fontSize: 14.5,
            color: C.navy, lineHeight: 1.65,
            fontFamily: "inherit", minHeight: 90, maxHeight: 160,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 12px", borderTop: "1px solid #F3F4F6" }}>
          <span style={{ fontSize: 12, color: C.light }}>Press ⏎ to generate</span>
          <button
            type="submit"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 20px", borderRadius: 10,
              background: C.primary, color: "#fff",
              fontSize: 13.5, fontWeight: 700, border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(99,91,255,0.28)",
              letterSpacing: "-0.01em", transition: "opacity 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            <SparklesIcon size={14} /> Generate App
          </button>
        </div>
      </form>

      <ChipMarquee selected={selected} onSelect={item => { setPrompt(item.prompt); setSelected(item.label); }} />
    </div>
  );
}

/* Social proof bar */
function SocialProof() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center",
      opacity: 0, animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 1.05s forwards",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: -4 }}>
        {["#635BFF", "#0EA5E9", "#10B981", "#F59E0B", "#EC4899"].map((bg, i) => (
          <div key={i} style={{
            width: 30, height: 30, borderRadius: "50%",
            background: bg, border: "2px solid #fff",
            marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i,
            flexShrink: 0,
          }} />
        ))}
      </div>
      <div style={{ height: 20, width: 1, background: "#E4E7EB" }} />
      <span style={{ fontSize: 13.5, color: C.muted }}>
        <strong style={{ color: C.navy, fontWeight: 700 }}>4,200+</strong> builders shipped this month
      </span>
      <div style={{ height: 20, width: 1, background: "#E4E7EB" }} />
      <div style={{ display: "flex", gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        ))}
        <span style={{ fontSize: 13, color: C.muted, marginLeft: 4 }}>4.9 / 5.0</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  const wordStyle = (delay: number, gradient = false): React.CSSProperties => ({
    display: "inline-block", marginRight: "0.22em",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    ...(gradient ? {
      background: "linear-gradient(135deg,#635BFF,#818CF8,#0EA5E9)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    } : {}),
  });

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float  { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-18px) scale(1.04);} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(14px) scale(0.96);} }
        @keyframes marquee{ from{transform:translateX(0);} to{transform:translateX(-50%);} }
        .dot-grid { background-image: radial-gradient(circle, #C7D2FE 1px, transparent 1px); background-size: 28px 28px; }
      `}</style>

      <section id="home" style={{
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
        background: "transparent",
        paddingTop: "clamp(6rem,11vw,9rem)",
        paddingBottom: "clamp(3rem,6vw,6rem)",
        paddingLeft: "1.25rem", paddingRight: "1.25rem",
      }}>

        {/* Background */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* Dot grid */}
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.35 }} />
          {/* Top glow */}
          <div style={{
            position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
            width: "min(1100px,140vw)", height: 600,
            background: "radial-gradient(ellipse at 50% 0%, #E0E7FF 0%, transparent 80%)",
            opacity: 0.5,
          }} />
          {/* Orbs */}
          <div style={{ position: "absolute", width: 320, height: 320, top: "8%", left: "4%", borderRadius: "50%", background: "radial-gradient(circle, #C7D2FE66 0%, transparent 70%)", animation: "float 9s ease-in-out infinite" }} className="hidden sm:block" />
          <div style={{ position: "absolute", width: 260, height: 260, top: "12%", right: "5%", borderRadius: "50%", background: "radial-gradient(circle, #BAE6FD44 0%, transparent 70%)", animation: "float2 11s ease-in-out infinite" }} className="hidden sm:block" />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800, gap: 0 }}>

          {/* Headline */}
          <h1 style={{ textAlign: "center", fontWeight: 900, fontSize: "clamp(2.8rem,8vw,5.5rem)", letterSpacing: "-0.04em", lineHeight: 1.06, color: C.navy, margin: "0 0 1.25rem", maxWidth: 820 }}>
            <span style={{ display: "block" }}>
              {["Ideas to", "Apps"].map((w, i) => (
                <span key={i} style={wordStyle(0.1 + i * 0.07)}>{w} </span>
              ))}
            </span>
            <span style={{ display: "block" }}>
              {[{ t: "Ship", g: false }, { t: "in", g: false }, { t: "minutes.", g: true }].map((w, i) => (
                <span key={i} style={wordStyle(0.42 + i * 0.07, w.g)}>{w.t} </span>
              ))}
            </span>
          </h1>

          {/* Sub */}
          <p style={{
            textAlign: "center", color: C.muted, lineHeight: 1.78, marginBottom: "2.25rem", maxWidth: 520,
            fontSize: "clamp(0.95rem,2vw,1.1rem)",
            opacity: 0, animation: "fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.72s forwards",
          }}>
            Describe your vision — OneAtlas generates a fully structured, production-ready app in under 5 seconds. No code. No design skills required.
          </p>

          {/* Prompt Box */}
          <PromptBox />

          {/* Social proof */}
          <div style={{ marginTop: "2rem" }}>
            <SocialProof />
          </div>
        </div>
      </section>
    </>
  );
}