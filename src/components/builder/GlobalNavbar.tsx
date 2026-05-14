"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User, Users, Network, Briefcase, Send, DollarSign,
  GraduationCap, Phone, FlaskConical, MessageSquare, BarChart,
  ChevronDown, ChevronRight, Menu, X, Sparkles,
  BookOpen, FileText, LayoutTemplate, Video
} from "lucide-react";

const C = {
  navy: "#0f172a", // Text and icons are blackish
  muted: "#64748b",
  light: "#94a3b8",
  border: "#e2e8f0",
  surface: "#f8fafc",
  primary: "#635BFF", // Keeping for the promo card inside dropdown
};

function AtlasLogo() {
  return (
    <span style={{ fontSize: 22, fontWeight: 800, color: C.navy, letterSpacing: "-0.04em" }}>
      OneAtlas
    </span>
  );
}

function SolutionsDropdown() {
  return (
    <div
      className="mega-dropdown"
      style={{
        position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%) translateY(-10px)",
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16,
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)", padding: "1.25rem",
        display: "flex", gap: "1.5rem", minWidth: 800, zIndex: 200,
        opacity: 0, visibility: "hidden", transition: "all 0.2s ease",
        pointerEvents: "none",
        marginTop: 12,
      }}
    >
      {/* Left col */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, margin: "0 0 1rem" }}>By team size</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { icon: User, label: "For Individuals", desc: "Personal building made simple" },
            { icon: Users, label: "For Teams", desc: "Collaborative building for groups" },
            { icon: Network, label: "For Organizations", desc: "Larger teams building for more control & security" },
            { icon: Briefcase, label: "For Enterprises", desc: "Enterprise-level building solutions" },
          ].map(item => (
            <a key={item.label} href="#" style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px", borderRadius: 10, textDecoration: "none" }} className="hover-item">
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.icon size={15} color={C.navy} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.navy }}>{item.label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted, lineHeight: 1.3 }}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Middle col */}
      <div style={{ flex: 1.2 }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, margin: "0 0 1rem" }}>By use case</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { icon: Send, label: "Recruiting" }, { icon: Phone, label: "Support" },
            { icon: DollarSign, label: "Sales" }, { icon: FlaskConical, label: "Healthcare" },
            { icon: Users, label: "HR" }, { icon: MessageSquare, label: "Telehealth" },
            { icon: GraduationCap, label: "Education" }, { icon: BarChart, label: "Marketing" },
          ].map(item => (
            <a key={item.label} href="#" style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px", borderRadius: 10, textDecoration: "none" }} className="hover-item">
              <div style={{ width: 36, height: 36, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.icon size={18} color={C.navy} />
              </div>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: C.navy }}>{item.label}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Promo card */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, #818cf8, #c084fc)", borderRadius: 12, padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ alignSelf: "flex-end", background: "rgba(0,0,0,0.4)", borderRadius: 100, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 10, fontWeight: 700 }}>
          <Sparkles size={11} /> Try Atlas AI now!
        </div>
        <div style={{ textAlign: "center", color: "#fff", marginTop: 40 }}>
          <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em" }}>Atlas.ai</span>
          <p style={{ fontSize: 12, fontWeight: 500, margin: "8px 0 0", opacity: 0.9 }}>Supercharged building<br/>with AI-powered tools</p>
        </div>
      </div>
    </div>
  );
}

function ResourcesDropdown() {
  return (
    <div
      className="mega-dropdown"
      style={{
        position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%) translateY(-10px)",
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16,
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)", padding: "1rem",
        display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 280, zIndex: 200,
        opacity: 0, visibility: "hidden", transition: "all 0.2s ease",
        pointerEvents: "none",
        marginTop: 12,
      }}
    >
      {[
        { icon: BookOpen, label: "Documentation", desc: "Start building today" },
        { icon: LayoutTemplate, label: "Templates", desc: "Ready-to-use projects" },
        { icon: Video, label: "Video Tutorials", desc: "Learn from the experts" },
        { icon: FileText, label: "Blog", desc: "Latest product updates" },
      ].map(item => (
        <a key={item.label} href="#" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 10, textDecoration: "none" }} className="hover-item">
          <div style={{ width: 36, height: 36, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <item.icon size={16} color={C.navy} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.navy }}>{item.label}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted, lineHeight: 1.3 }}>{item.desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function GlobalNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <style>{`
        .nav-item-wrapper:hover .mega-dropdown {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateX(-50%) translateY(0) !important;
        }
        .nav-item-wrapper:hover .chevron {
          transform: rotate(180deg);
        }
        .chevron { transition: transform 0.2s; }
        .hover-item:hover { background: ${C.surface} !important; }
        .nav-link { 
          display: inline-flex; align-items: center; gap: 4px; 
          font-size: 14px; font-weight: 500; color: ${C.navy}; 
          text-decoration: none; padding: 8px 12px; border-radius: 6px;
        }
        .nav-link:hover { background: ${C.surface}; }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <AtlasLogo />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4, height: "100%" }} className="hidden md:flex">
            
            <div className="nav-item-wrapper" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <a href="#" className="nav-link">
                Solutions <ChevronDown size={14} className="chevron" />
              </a>
              <SolutionsDropdown />
            </div>

            <div className="nav-item-wrapper" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <a href="#" className="nav-link">Enterprise</a>
            </div>

            <div className="nav-item-wrapper" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <a href="#" className="nav-link">
                Resources <ChevronDown size={14} className="chevron" />
              </a>
              <ResourcesDropdown />
            </div>

            <div className="nav-item-wrapper" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <a href="#pricing" className="nav-link">Pricing</a>
            </div>

          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="hidden md:flex ">
            <Link
              href="/sign-in"
              className="hover:text-gray-600"
              style={{ fontSize: 14, fontWeight: 600, color: C.navy, textDecoration: "none" }}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 100,
                background: C.navy, color: "#fff",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Get started <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: C.navy }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div style={{
            background: "#fff", borderTop: `1px solid ${C.border}`,
            padding: "1.25rem 1.5rem 1.5rem",
            animation: "slideDown 0.2s cubic-bezier(.22,1,.36,1)",
          }}>
            {["Solutions", "Enterprise", "Resources", "Pricing"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "11px 0", fontSize: 15, fontWeight: 500,
                  color: C.navy, textDecoration: "none", borderBottom: `1px solid ${C.border}`,
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "1.25rem" }}>
              <Link href="/sign-in" onClick={() => setMobileOpen(false)} style={{
                textAlign: "center", padding: "11px", borderRadius: 10,
                border: `1px solid ${C.border}`, fontSize: 14, fontWeight: 600,
                color: C.navy, textDecoration: "none",
              }}>
                Sign in
              </Link>
              <Link href="/sign-up" onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                textAlign: "center", padding: "11px", borderRadius: 100,
                background: C.navy, fontSize: 14, fontWeight: 700,
                color: "#fff", textDecoration: "none",
              }}>
                Get started <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}