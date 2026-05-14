"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles, Code2, Globe2, LayoutTemplate, Layers, Zap,
  BarChart3, ShieldCheck, Users, BookOpen, X, Menu, ChevronDown,
} from "lucide-react";

/* ─── Design tokens ─── */
const C = {
  primary: "#635BFF",
  navy: "#0A2540",
  muted: "#425466",
  light: "#697386",
  border: "#E4E7EB",
  surface: "#F6F9FC",
};

/* ─── Mega menu data ─── */
const MENU = [
  {
    label: "Products",
    columns: [
      {
        title: "Build",
        items: [
          { icon: Sparkles,       label: "App Generator",     desc: "Turn a prompt into a full-stack app", href: "#" },
          { icon: LayoutTemplate, label: "Templates",          desc: "Start from 60+ production-ready templates", href: "#templates" },
          { icon: Code2,          label: "Code Export",        desc: "Own your code, deploy anywhere", href: "#" },
        ],
      },
      {
        title: "Deploy & Grow",
        items: [
          { icon: Globe2,         label: "1-Click Deploy",     desc: "Push to Vercel, Netlify, or Railway", href: "#" },
          { icon: BarChart3,      label: "Analytics",          desc: "Built-in usage dashboards", href: "#" },
          { icon: ShieldCheck,    label: "Security",           desc: "Auth, headers, sanitization baked in", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        title: "By role",
        items: [
          { icon: Code2,     label: "For Developers",  desc: "Ship faster with clean, typed output", href: "#for-roles" },
          { icon: Layers,    label: "For Designers",   desc: "From concept to live UI instantly", href: "#for-roles" },
          { icon: Zap,       label: "For Founders",    desc: "Validate before you hire a dev team", href: "#for-roles" },
          { icon: Users,     label: "For Teams",       desc: "Shared workspace and collaboration", href: "#for-roles" },
        ],
      },
    ],
  },
];

/* ─── Simple links ─── */
const SIMPLE_LINKS = [
  { label: "Pricing", href: "#pricing" },
  { label: "Docs",    href: "#" },
];

/* ─── Logo ─── */
function AtlasLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: "linear-gradient(135deg, #635BFF, #818CF8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(99,91,255,0.3)",
      }}>
        <Globe2 size={16} color="#fff" strokeWidth={2} />
      </div>
      <span style={{ fontSize: 17, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em" }}>
        OneAtlas
      </span>
    </div>
  );
}

/* ─── Mega menu dropdown ─── */
function MegaDropdown({ menu, onClose }: { menu: typeof MENU[0]; onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute", top: "calc(100% + 10px)", left: "50%",
        transform: "translateX(-50%)",
        background: "#fff", border: `1px solid ${C.border}`,
        borderRadius: 16, boxShadow: "0 20px 60px rgba(10,37,64,0.12)",
        padding: "1.5rem",
        display: "flex", gap: "2rem",
        zIndex: 200, minWidth: 480,
        animation: "dropIn 0.18s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {menu.columns.map(col => (
        <div key={col.title} style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.light, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
            {col.title}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {col.items.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "9px 10px", borderRadius: 10, textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surface}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: "#F0EFFF", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={16} color={C.primary} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: C.navy, lineHeight: 1.2 }}>{item.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GlobalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mega menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s",
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <AtlasLogo />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
            {MENU.map(m => (
              <div key={m.label} style={{ position: "relative" }}>
                <button
                  onClick={() => setOpenMenu(openMenu === m.label ? null : m.label)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "7px 14px", borderRadius: 8, background: "none", border: "none",
                    fontSize: 14, fontWeight: 500, color: C.navy,
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surface}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}
                  aria-expanded={openMenu === m.label}
                >
                  {m.label}
                  <ChevronDown size={14} color={C.light} style={{
                    transition: "transform 0.2s",
                    transform: openMenu === m.label ? "rotate(180deg)" : "rotate(0deg)",
                  }} />
                </button>
                {openMenu === m.label && <MegaDropdown menu={m} onClose={() => setOpenMenu(null)} />}
              </div>
            ))}

            {SIMPLE_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  padding: "7px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: 500, color: C.navy, textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surface}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
            <Link
              href="/sign-in"
              style={{ padding: "7px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: C.navy, textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.surface}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "8px 18px", borderRadius: 9,
                background: C.primary, color: "#fff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 2px 8px rgba(99,91,255,0.28)",
                transition: "opacity 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <Sparkles size={13} /> Get started
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
            {[...MENU.map(m => m.label), ...SIMPLE_LINKS.map(l => l.label)].map((label) => {
              const item = SIMPLE_LINKS.find(l => l.label === label);
              return (
                <a
                  key={label}
                  href={item?.href ?? "#"}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", padding: "11px 0", fontSize: 15, fontWeight: 500,
                    color: C.navy, textDecoration: "none", borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {label}
                </a>
              );
            })}
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
                textAlign: "center", padding: "11px", borderRadius: 10,
                background: C.primary, fontSize: 14, fontWeight: 700,
                color: "#fff", textDecoration: "none",
              }}>
                <Sparkles size={13} /> Get started
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}