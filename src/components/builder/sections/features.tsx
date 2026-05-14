"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Globe2, LayoutTemplate, Code2, Users, Zap, Check, Rocket } from "lucide-react";

const P = "#635BFF", N = "#0A2540", M = "#425466";

/* ─── Shared card shell ─── */
function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 16, padding: 1, position: "relative",
        background: h
          ? "linear-gradient(to bottom, #C7D2FE, rgba(199,210,254,0.3))"
          : "linear-gradient(to bottom, #E4E7EB, rgba(228,231,235,0.2))",
        boxShadow: h ? "0 8px 32px rgba(99,91,255,0.08)" : "none",
        transition: "all .2s ease",
      }}
    >
      <div style={{
        borderRadius: 15, background: "#fff", width: "100%", height: "100%",
        overflow: "hidden", position: "relative", display: "flex",
        flexDirection: "column", padding: "1.5rem",
      }}>
        <div style={{ position: "relative", zIndex: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Title({ icon: I, label }: { icon: any; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, position: "relative", zIndex: 10 }}>
      <I size={15} color={N} strokeWidth={1.8} />
      <span style={{ fontSize: 13.5, fontWeight: 600, color: N }}>{label}</span>
    </div>
  );
}

function Desc({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 13, color: M, lineHeight: 1.65, margin: "6px 0 0", position: "relative", zIndex: 10 }}>{children}</p>;
}

/* ─── Visual 1: Typing prompt (large card) ─── */
const PROMPTS = ["Build a SaaS analytics dashboard", "Create an e-commerce store with Stripe", "Generate a portfolio with dark mode"];
function PromptVisual() {
  const [pi, setPi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const word = PROMPTS[pi];
    if (!del && ci === word.length) { const t = setTimeout(() => setDel(true), 1800); return () => clearTimeout(t); }
    if (del && ci === 0) { setDel(false); setPi(p => (p + 1) % PROMPTS.length); return; }
    const t = setTimeout(() => setCi(c => c + (del ? -1 : 1)), del ? 22 : 45);
    return () => clearTimeout(t);
  }, [ci, del, pi]);

  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#F6F9FC", borderTop: "1px solid rgba(10,37,64,.06)", padding: "1rem" }}>
      <div style={{ background: "#fff", border: `1.5px solid rgba(99,91,255,.3)`, borderRadius: 10, padding: "8px 12px", fontSize: 12.5, color: N, fontFamily: "monospace", boxShadow: "0 0 0 3px rgba(99,91,255,.07)", display: "flex", alignItems: "center", minHeight: 38 }}>
        {PROMPTS[pi].slice(0, ci)}<span style={{ display: "inline-block", width: 2, height: 14, background: P, marginLeft: 1, animation: "blink 1s infinite" }} />
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
        {["TypeScript", "Next.js", "Prisma", "Tailwind", "Auth"].map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 700, background: "#EEEFFD", color: P, borderRadius: 100, padding: "3px 9px", border: "1px solid rgba(99,91,255,.15)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Visual 2: Models vertical marquee ─── */
const MODS = [
  { n: "GPT-4o", src: "https://cdn.simpleicons.org/openai/000000" },
  { n: "Claude", src: "https://cdn.simpleicons.org/anthropic/D4714F" },
  { n: "Gemini", src: "https://cdn.simpleicons.org/google/4285F4" },
  { n: "Llama",  src: "https://cdn.simpleicons.org/meta/0082FB" },
  { n: "Grok",   src: "https://cdn.simpleicons.org/x/000000" },
  { n: "Perplexity", src: "https://cdn.simpleicons.org/perplexity/20B8CD" },
  { n: "Phi-4",  src: "https://cdn.simpleicons.org/microsoft/737373" },
  { n: "Command", src: "https://cdn.simpleicons.org/cohere/39594D" },
];
function ModelRow({ m }: { m: typeof MODS[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#F6F9FC", border: "1px solid rgba(10,37,64,.07)", borderRadius: 8, padding: "5px 10px", flexShrink: 0 }}>
      <img src={m.src} width={13} height={13} alt={m.n} style={{ objectFit: "contain" }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: N, whiteSpace: "nowrap" }}>{m.n}</span>
    </div>
  );
}
function ModelsVisual() {
  const all = [...MODS, ...MODS];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", gap: 6, padding: "0.75rem" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, animation: "slideUp 9s linear infinite" }}>
        {all.map((m, i) => <ModelRow key={i} m={m} />)}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, animation: "slideDown 11s linear infinite" }}>
        {[...all].reverse().map((m, i) => <ModelRow key={i} m={m} />)}
      </div>
    </div>
  );
}

/* ─── Visual 3: Deploy terminal ─── */
const DEPLOY_STEPS = [
  { t: "$ atlas deploy", c: N },
  { t: "▲  Connecting to Vercel...", c: "#697386" },
  { t: "⚙  Building project...", c: "#697386" },
  { t: "✓  Build complete", c: "#10B981" },
  { t: "→  https://myapp.vercel.app", c: P },
];
function DeployVisual() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= DEPLOY_STEPS.length) { const t = setTimeout(() => setStep(0), 2000); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 500 : 750);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#0A2540", borderRadius: "0 0 14px 14px", padding: "0.9rem 1rem", fontFamily: "monospace", display: "flex", flexDirection: "column", gap: 4, minHeight: 130 }}>
      {DEPLOY_STEPS.slice(0, step).map((s, i) => (
        <div key={i} style={{ fontSize: 11.5, color: s.c, animation: "fadeIn .3s ease" }}>{s.t}</div>
      ))}
      {step > 0 && step < DEPLOY_STEPS.length && <span style={{ display: "inline-block", width: 6, height: 12, background: "#fff", borderRadius: 1, animation: "blink .8s infinite" }} />}
    </div>
  );
}

/* ─── Visual 4: Templates scrolling chips ─── */
const TMPL = [
  { n: "SaaS Landing", c: P }, { n: "E-commerce", c: "#0EA5E9" }, { n: "Dashboard", c: "#10B981" },
  { n: "Portfolio", c: "#F59E0B" }, { n: "Blog", c: "#EC4899" }, { n: "Booking App", c: "#14B8A6" },
  { n: "Admin Panel", c: "#8B5CF6" }, { n: "Landing Page", c: "#F97316" },
];
function TChip({ t }: { t: typeof TMPL[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid rgba(10,37,64,.07)", borderRadius: 8, padding: "5px 10px", flexShrink: 0, boxShadow: "0 1px 3px rgba(10,37,64,.04)" }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.c, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: N, whiteSpace: "nowrap" }}>{t.n}</span>
    </div>
  );
}
function TemplatesVisual() {
  const all = [...TMPL, ...TMPL];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", flexDirection: "column", gap: 6, padding: "0.75rem 0" }}>
      {[
        { anim: "slideLeft 12s linear infinite", items: all },
        { anim: "slideRight 14s linear infinite", items: [...all].reverse() },
        { anim: "slideLeft 10s linear infinite", items: all },
      ].map(({ anim, items }, ri) => (
        <div key={ri} style={{ display: "flex", gap: 6, animation: anim, width: "max-content" }}>
          {items.map((t, i) => <TChip key={i} t={t} />)}
        </div>
      ))}
    </div>
  );
}

/* ─── Visual 5: Cursor tracking ─── */
function CursorIcon({ stroke = "rgba(10,37,64,.35)", fill = "#fff", glow = false }) {
  return (
    <svg width="20" height="26" viewBox="0 0 30 38" fill="none">
      <path d="M3.58 1.7C2.58.87 1.06 1.58 1.06 2.89V35.63c0 1.47 1.87 2.11 2.77.94l8.76-11.47c.1-.14.26-.21.43-.21h14.31c1.45 0 2.1-1.81.99-2.73L3.58 1.7Z"
        fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinejoin="round"
        style={glow ? { filter: `drop-shadow(0 0 5px ${stroke}88)` } : {}} />
    </svg>
  );
}
function CursorVisual({ wrapRef }: { wrapRef: React.RefObject<HTMLDivElement | null> }) {
  const [pos, setPos] = useState({ x: 55, y: 55 }); const [on, setOn] = useState(false);
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const mv = (e: MouseEvent) => { const r = el.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); setOn(true); };
    const out = () => setOn(false);
    el.addEventListener("mousemove", mv); el.addEventListener("mouseleave", out);
    return () => { el.removeEventListener("mousemove", mv); el.removeEventListener("mouseleave", out); };
  }, [wrapRef]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#E4E7EB 1px,transparent 1px)", backgroundSize: "20px 20px", opacity: .55 }} />
      <div style={{ position: "absolute", top: "55%", left: "22%", transform: "translate(-50%,-50%)" }}>
        <CursorIcon />
        <div style={{ position: "absolute", left: "100%", top: -18, background: "#fff", border: "1px solid #E4E7EB", borderRadius: 100, padding: "2px 8px", display: "flex", gap: 3, alignItems: "center", boxShadow: "0 2px 6px rgba(10,37,64,.08)" }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#C0C8D4", animation: `pulse .6s ${i*.2}s cubic-bezier(.4,0,.6,1) infinite` }} />)}
        </div>
      </div>
      <div style={{ position: "absolute", top: "72%", left: "62%", transform: "translate(-50%,-50%) scale(.75)" }}>
        <CursorIcon stroke="rgba(10,37,64,.2)" />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, transform: `translate(${pos.x - 10}px,${pos.y - 13}px)`, opacity: on ? 1 : 0, transition: "transform .08s ease-out,opacity .2s", pointerEvents: "none" }}>
        <CursorIcon stroke={P} fill="rgba(99,91,255,.08)" glow />
        <div style={{ position: "absolute", left: "100%", top: -18, background: P, color: "#fff", borderRadius: 100, padding: "2px 8px", fontSize: 10, fontWeight: 700, boxShadow: "0 2px 8px rgba(99,91,255,.35)", whiteSpace: "nowrap" }}>You</div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,#fff 0%,transparent 35%,transparent 65%,#fff 100%)", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── Visual 6: Code export scrolling ─── */
const CODE = [
  ["0", "export default function Dashboard() {", P],
  ["1", "  const [data] = useAtlasData()", N],
  ["1", "  const user = useUser()", N],
  ["0", "", ""],
  ["1", "  return (", N],
  ["2", "    <Layout sidebar={<Nav />}>", "#10B981"],
  ["3", "      <Analytics data={data} />", "#0EA5E9"],
  ["3", "      <DataTable rows={data.rows} />", "#0EA5E9"],
  ["2", "    </Layout>", "#10B981"],
  ["1", "  )", N],
  ["0", "}", P],
  ["0", "", ""],
  ["0", "// ✓ Generated by OneAtlas", "#B0BAC8"],
];
function CodeVisual() {
  const all = [...CODE, ...CODE];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "75%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, animation: "slideUp 12s linear infinite", padding: "0 1rem 1rem", fontFamily: "monospace", fontSize: 11 }}>
        {all.map(([, txt, clr], i) => (
          <div key={i} style={{ color: clr as string, whiteSpace: "pre", lineHeight: 1.7, opacity: clr ? 1 : 0 }}>{txt}</div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,#fff 0%,transparent 30%,transparent 80%,#fff 100%)", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── Visual 7: Team avatars ─── */
const TEAM = [
  { i: "VP", c: P }, { i: "SK", c: "#0EA5E9" }, { i: "MR", c: "#10B981" },
  { i: "LM", c: "#EC4899" }, { i: "TB", c: "#F59E0B" },
];
function TeamVisual() {
  const [typing, setTyping] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTyping(Math.floor(Math.random() * TEAM.length)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 6 }}>
        {TEAM.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: m.c, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
              boxShadow: i === typing ? `0 0 0 3px ${m.c}44` : "none",
              transition: "box-shadow .3s",
            }}>{m.i}</div>
            {i === typing && (
              <div style={{ background: "#fff", border: "1px solid #E4E7EB", borderRadius: 100, padding: "2px 6px", display: "flex", gap: 2, boxShadow: "0 2px 6px rgba(10,37,64,.08)" }}>
                {[0,1,2].map(j => <span key={j} style={{ width: 3, height: 3, borderRadius: "50%", background: m.c, animation: `pulse .6s ${j*.2}s infinite` }} />)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: "#F6F9FC", border: "1px solid rgba(10,37,64,.07)", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: M, width: "100%", textAlign: "left" }}>
        <span style={{ color: TEAM[typing].c, fontWeight: 700 }}>{TEAM[typing].i}</span> is editing <span style={{ color: N, fontWeight: 600 }}>Dashboard.tsx</span>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function FeaturesSection() {
  const card5Ref = useRef<HTMLDivElement>(null);
  const [secVis, setSecVis] = useState(false);
  const secRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSecVis(true); obs.disconnect(); } }, { threshold: .08 });
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" style={{ background: "#F6F9FC", padding: "6rem 0", borderTop: "1px solid #E4E7EB" }}>
      <style>{`
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes slideUp { from{transform:translateY(0)} to{transform:translateY(-50%)} }
        @keyframes slideDown { from{transform:translateY(-50%)} to{transform:translateY(0)} }
        @keyframes slideLeft  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes slideRight { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        
        .feat-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; }
        .feat-card { display: flex; flex-direction: column; width: 100%; height: 400px; }
        .feat-card-lg { grid-column: span 6; }
        .feat-card-sm { grid-column: span 3; }
        
        @media (max-width: 1024px) {
          .feat-card-lg, .feat-card-sm { grid-column: span 6; }
        }
        @media (max-width: 640px) {
          .feat-card-lg, .feat-card-sm { grid-column: span 12; }
          .feat-card { height: 350px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div ref={secRef} style={{
          opacity: secVis ? 1 : 0, transform: secVis ? "none" : "translateY(28px)",
          transition: "all .7s ease", marginBottom: "2.5rem",
        }}>
          <p style={{ fontSize: 11, color: "#697386", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: ".6rem" }}>— Everything you need</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem,4vw,2.75rem)", color: N, letterSpacing: "-.03em", margin: 0, lineHeight: 1.15 }}>
              One platform. Every tool.
            </h2>
            <p style={{ fontSize: 15, color: M, maxWidth: 380, margin: 0, lineHeight: 1.75 }}>
              From idea to shipped product — all the building blocks you need, integrated seamlessly.
            </p>
          </div>
        </div>

        {/* 12-col grid */}
        <div className="feat-grid">

          {/* Card 1 — App Generator (span 6) */}
          <Shell className="feat-card feat-card-lg">
            <Title icon={Sparkles} label="App Generator" />
            <Desc>Describe your app in plain English — get a complete, production-ready codebase in seconds.</Desc>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 6 }}>
              {["Full-stack Next.js output", "TypeScript by default", "Prisma schema included", "Deploy-ready configs"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: M }}>
                  <Check size={14} strokeWidth={3} color={P} /> {f}
                </li>
              ))}
            </ul>
            <PromptVisual />
          </Shell>

          {/* Card 2 — All AI Models (span 3) */}
          <Shell className="feat-card feat-card-sm">
            <Title icon={Zap} label="All AI Models" />
            <Desc>GPT-4o, Claude, Gemini, Llama and more.</Desc>
            <ModelsVisual />
          </Shell>

          {/* Card 3 — 1-Click Deploy (span 3) */}
          <Shell className="feat-card feat-card-sm">
            <Title icon={Rocket} label="1-Click Deploy" />
            <Desc>Push to Vercel instantly. Configs auto-generated.</Desc>
            <DeployVisual />
          </Shell>

          {/* Card 4 — Templates (span 3) */}
          <Shell className="feat-card feat-card-sm">
            <Title icon={LayoutTemplate} label="60+ Templates" />
            <Desc>Start from production-ready templates.</Desc>
            <TemplatesVisual />
          </Shell>

          {/* Card 5 — Live Preview cursor (span 3) */}
          <div ref={card5Ref} style={{ display: "contents" }}>
            <Shell className="feat-card feat-card-sm">
              <Title icon={Globe2} label="Live Preview" />
              <Desc>Experience real-time collaborative editing.</Desc>
              <CursorVisual wrapRef={card5Ref} />
            </Shell>
          </div>

          {/* Card 6 — Code Export (span 3) */}
          <Shell className="feat-card feat-card-sm">
            <Title icon={Code2} label="Code Export" />
            <Desc>Clean, typed code that is 100% yours.</Desc>
            <CodeVisual />
          </Shell>

          {/* Card 7 — Team (span 3) */}
          <Shell className="feat-card feat-card-sm">
            <Title icon={Users} label="Team Workspace" />
            <Desc>Collaborate with real-time presence.</Desc>
            <TeamVisual />
          </Shell>

        </div>

        {/* Bottom tagline */}
        <p style={{ marginTop: "1.25rem", fontSize: 16, color: "#97A3B4", letterSpacing: "-.01em" }}>
          <span style={{ color: N, fontWeight: 700 }}>Use one or all.</span> Best-in-class tools, integrated as a single platform.
        </p>
      </div>
    </section>
  );
} 