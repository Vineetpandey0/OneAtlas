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
  Gamepad2,
  Paperclip,
  Sparkles,
  Globe,
  Sliders,
  Mic,
  ChevronDown
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
      padding: "120px 2rem 2rem",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        zIndex: 0, overflow: "hidden"
      }}>
        {/* Colorful Mesh Glows */}
        <div style={{
          position: "absolute", top: "10%", left: "10%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(99,91,255,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 12s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "15%",
          width: "35vw", height: "35vw",
          background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float2 18s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "20%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float 15s ease-in-out infinite"
        }} />
        
        {/* Subtle Decorative Dots */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 4, height: 4,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#635BFF" : "#3ECF8E",
            opacity: 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)"
          }} />
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1100, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
      }}>
        
        {/* Beta Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 16px",
          borderRadius: 20,
          background: "#EEF2FF",
          color: "#635BFF",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: "2rem",
          border: "1px solid rgba(99, 91, 255, 0.1)"
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#635BFF" }} />
          Now in public beta
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
          fontWeight: 900,
          color: "#0a0a0a",
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          marginBottom: "1.5rem",
          whiteSpace: "nowrap",
          width: "100%"
        }}>
          Where ideas become{" "}
          <span style={{ 
            background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingRight: "0.05em"
          }}>
            tools
          </span>
        </h1>

        {/* Subline */}
        <p style={{
          fontSize: "1.15rem",
          color: C.muted,
          marginBottom: "3rem",
          textAlign: "center",
          maxWidth: 620,
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          Describe what your team needs. OneAtlas generates a production-ready 
          internal tool and deploys it instantly.
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
          marginBottom: "3.5rem",
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

          {/* Row: Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: -8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ 
                width: 32, height: 32, borderRadius: "50%", 
                border: "1px solid #E5E7EB", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#64748B", cursor: "pointer"
              }}>
                <Paperclip size={16} />
              </button>
              
              <button style={{ 
                height: 36, padding: "0 14px", borderRadius: 100, 
                border: "1px solid #E5E7EB", background: "#fff",
                display: "flex", alignItems: "center", gap: 8,
                color: "#0f172a", cursor: "pointer",
                fontSize: 13, fontWeight: 600
              }}>
                <Sparkles size={14} style={{ color: "#9461fd" }} />
                Claude Opus 4.7
                <ChevronDown size={14} style={{ color: "#64748B" }} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ 
                height: 36, padding: "0 14px", borderRadius: 100, 
                border: "1px solid #E5E7EB", background: "#fff",
                display: "flex", alignItems: "center", gap: 8,
                color: "#64748B", cursor: "pointer",
                fontSize: 13, fontWeight: 600
              }}>
                <Globe size={16} />
                Public
              </button>
              
              <button style={{ 
                width: 32, height: 32, borderRadius: "50%", 
                border: "1px solid #E5E7EB", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#64748B", cursor: "pointer"
              }}>
                <Sliders size={16} />
              </button>
              
              <button style={{ 
                width: 32, height: 32, borderRadius: "50%", 
                border: "1px solid #E5E7EB", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#64748B", cursor: "pointer"
              }}>
                <Mic size={16} />
              </button>
            </div>
          </div>

          {/* Separator Line */}
          <div style={{ height: 1, background: "#F1F5F9", width: "100%" }} />

          {/* Row 2: Categories */}
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
                      e.currentTarget.style.opacity = activeCategory === cat.id ? 1 : 0.6;
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