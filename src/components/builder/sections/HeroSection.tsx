"use client";

import { 
  ArrowRight, 
  Plus, 
  Monitor, 
  Smartphone, 
  Palette, 
  Presentation, 
  Film, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  Layout,
  Rocket,
  Gamepad2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const C = { 
  primary: "#635BFF", // Stripe Indigo
  supabase: "#3ECF8E", // Supabase Emerald
  accent: "#9461fd",  // Stripe Purple
  navy: "#0A2540",
  muted: "#425466",
  bg: "#FFFFFF",
  border: "#E4E7EB" 
};

const CATEGORIES = [
  { id: "website", label: "Website", icon: Layout },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "design", label: "Design", icon: Palette },
  { id: "slides", label: "Slides", icon: Presentation },
  { id: "animation", label: "Animation", icon: Film },
  { id: "ai", label: "AI Agent", icon: Rocket },
  { id: "games", label: "Games", icon: Gamepad2 },
];

const EXAMPLE_PROMPTS = [
  "AI sales assistant",
  "Hiring tracker",
  "3D racing game",
  "SaaS Dashboard",
  "Marketing site",
  "Fitness app"
];

export default function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const [activeCategory, setActiveCategory] = useState("website");
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const [shuffledPrompts, setShuffledPrompts] = useState(EXAMPLE_PROMPTS.slice(0, 3));

  useEffect(() => { 
    const t = setTimeout(() => setVisible(true), 100); 
    return () => clearTimeout(t); 
  }, []);

  const handleRefreshPrompts = () => {
    const shuffled = [...EXAMPLE_PROMPTS].sort(() => 0.5 - Math.random());
    setShuffledPrompts(shuffled.slice(0, 3));
  };

  const handleCategoryScroll = (dir: "left" | "right") => {
    const step = 120;
    if (dir === "left") setCategoryOffset(p => Math.min(0, p + step));
    else setCategoryOffset(p => Math.max(-240, p - step));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    window.location.href = `/sign-up?prompt=${encodeURIComponent(prompt)}&category=${activeCategory}`;
  };

  return (
    <section id="home" style={{
      position: "relative",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      padding: "80px 2rem 2rem",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Stripe-style Blurred Background */}
      <div style={{
        position: "absolute", inset: 0,
        zIndex: 0, overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(99,91,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float 12s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", bottom: "0%", right: "-10%",
          width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(148,97,253,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float2 15s ease-in-out infinite"
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1100, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
      }}>
        
        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          fontWeight: 900,
          color: "#0a0a0a",
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.05em",
          marginBottom: "1.5rem"
        }}>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>From vision to app,</span>
          <span style={{ 
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "block",
            whiteSpace: "nowrap",
            paddingRight: "0.05em"
          }}>
            Ship Faster.
          </span>
        </h1>

        {/* Subline */}
        <p style={{
          fontSize: "1.15rem",
          color: C.muted,
          marginBottom: "2.5rem",
          textAlign: "center",
          maxWidth: 580,
          lineHeight: 1.6
        }}>
          OneAtlas turns your natural language into fully-functional, 
          shippable applications instantly.
        </p>

        {/* Main Integrated Prompt Box */}
        <div style={{
          width: "100%",
          maxWidth: 850,
          background: "#fff",
          borderRadius: 32,
          border: "1px solid #E5E7EB",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          marginBottom: "2.5rem",
          transition: "all 0.3s ease"
        }}>
          {/* Row 1: Input */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ color: "#666", display: "flex", alignItems: "center" }}>
              <Plus size={24} />
            </div>
            <input 
              type="text"
              placeholder="Describe your idea, OneAtlas will bring it to life..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1.4rem",
                color: C.navy,
                background: "transparent",
                fontWeight: 500
              }}
            />
            <button 
              onClick={handleSubmit}
              style={{
                width: 52,
                height: 52,
                borderRadius: "30%",
                background: C.primary,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
                boxShadow: `0 4px 12px ${C.primary}33`
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background = C.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = C.primary;
              }}
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Separator Line */}
          <div style={{ height: 1, background: "#F1F5F9", width: "100%" }} />

          {/* Row 2: Categories (Restored original design) */}
          <div style={{ 
            display: "flex", 
            alignItems: "center",
            gap: 12,
            padding: "0 10px"
          }}>
            <button 
              onClick={() => handleCategoryScroll("left")}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#666" }}
            >
              <ChevronLeft size={24} />
            </button>

            <div style={{ overflow: "hidden", flex: 1 }}>
              <div style={{ 
                display: "flex", 
                gap: 24, 
                transition: "transform 0.4s ease",
                transform: `translateX(${categoryOffset}px)`
              }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      minWidth: 80,
                      opacity: activeCategory === cat.id ? 1 : 0.6,
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                      if (iconBox) iconBox.style.borderColor = C.accent;
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={e => {
                      const iconBox = e.currentTarget.querySelector('.icon-box') as HTMLElement;
                      if (iconBox && activeCategory !== cat.id) iconBox.style.borderColor = "#E5E7EB";
                      e.currentTarget.style.opacity = activeCategory === cat.id ? "1" : "0.6";
                    }}
                  >
                    <div 
                      className="icon-box"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "#fff",
                        border: activeCategory === cat.id ? `2px solid ${C.accent}` : "1px solid #E5E7EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <cat.icon size={24} color={activeCategory === cat.id ? C.accent : C.navy} />
                    </div>
                    <span style={{ 
                      fontSize: 13, 
                      fontWeight: 600, 
                      color: activeCategory === cat.id ? C.accent : C.navy,
                      transition: "color 0.2s"
                    }}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleCategoryScroll("right")}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#666" }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Example Prompts in One Line */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12,
          color: "#64748B",
          fontSize: 14,
          fontWeight: 500
        }}>
          <span style={{ whiteSpace: "nowrap" }}>Try an example:</span>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {shuffledPrompts.map(p => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.navy,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.background = "#F8FAFC";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              handleRefreshPrompts();
              const btn = document.getElementById("refresh-icon");
              if (btn) {
                btn.style.transition = "transform 0.6s ease";
                btn.style.transform = "rotate(360deg)";
                setTimeout(() => { btn.style.transition = "none"; btn.style.transform = "rotate(0deg)"; }, 600);
              }
            }}
            style={{ 
              background: "transparent", 
              border: "none", 
              cursor: "pointer", 
              color: "#64748B", 
              display: "flex", 
              alignItems: "center",
              padding: 4
            }}
          >
            <RefreshCw id="refresh-icon" size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}