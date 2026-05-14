"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Globe2, Sparkles } from "lucide-react";

const C = { primary: "#635BFF", navy: "#0A2540", muted: "#425466", light: "#697386", border: "#E4E7EB", surface: "#F6F9FC" };

const footerLinks = {
  Product:   ["App Generator", "Templates", "Pricing", "Changelog"],
  Solutions: ["For Developers", "For Designers", "For Founders", "For Teams"],
  Company:   ["About", "Blog", "Careers", "Contact"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer style={{ width: "100%", background: "#fff", borderTop: `1px solid ${C.border}` }}>

      {/* Top section */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, flexWrap: "wrap" }}>

          {/* Brand */}
          <div style={{ gridColumn: "1 / 2" }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: "linear-gradient(135deg,#635BFF,#818CF8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(99,91,255,0.25)",
              }}>
                <Globe2 size={15} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em" }}>OneAtlas</span>
            </Link>

            <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, maxWidth: 280, margin: "0 0 1.25rem" }}>
              Build full-stack applications with AI in seconds. Clean code, modular architecture, and one-click deploy — all included.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: FaGithub,   href: "https://github.com/vineetpandey0", label: "GitHub" },
                { icon: FaTwitter,  href: "#",                                label: "Twitter" },
                { icon: FaLinkedin, href: "#",                                label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8, border: `1px solid ${C.border}`,
                    color: C.light, textDecoration: "none",
                    transition: "color 0.15s, border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = C.navy;
                    (e.currentTarget as HTMLElement).style.borderColor = "#C7D2FE";
                    (e.currentTarget as HTMLElement).style.background = C.surface;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = C.light;
                    (e.currentTarget as HTMLElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: C.light, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 1rem" }}>
                {section}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontSize: 13.5, color: C.muted, textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.navy}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.muted}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div style={{
          marginTop: "3rem",
          borderRadius: 16,
          background: "linear-gradient(135deg, #F0EFFF, #EEF5FF)",
          border: "1px solid #C7D2FE",
          padding: "1.5rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14.5, color: C.navy, display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles size={15} color={C.primary} /> Stay in the loop
            </p>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Get updates, tips, and early-access invites in your inbox.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                padding: "9px 14px", borderRadius: 9, fontSize: 13.5,
                border: "1px solid #C7D2FE", outline: "none",
                background: "#fff", color: C.navy, width: 220,
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = C.primary)}
              onBlur={e => (e.currentTarget.style.borderColor = "#C7D2FE")}
            />
            <button style={{
              padding: "9px 18px", borderRadius: 9, fontSize: 13.5, fontWeight: 700,
              background: C.primary, color: "#fff", border: "none", cursor: "pointer",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "1.1rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
          fontSize: 12.5, color: C.light,
        }}>
          <span>© {new Date().getFullYear()} <Link href="/" style={{ color: C.muted, textDecoration: "none", fontWeight: 600 }}>OneAtlas</Link>. All rights reserved.</span>
          <span>Built with ❤️ by Vineet Pandey</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}