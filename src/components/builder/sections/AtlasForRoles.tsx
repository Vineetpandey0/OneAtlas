"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Globe, CheckCircle2, Clock, Share2, Monitor, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

/* ─── Bento Card Components ─── */

function CardPM() {
  return (
    <div className="bento-visual">
      <div style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderBottom: "none", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, boxShadow: "0 -10px 30px rgba(0,0,0,0.02)" }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Version history</h4>
        <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>Review changes, revert to a version.</p>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8fafc", border: "1px solid #e2e8f0", padding: "8px 12px", borderRadius: 8, marginBottom: 20 }}>
          <Search size={14} color="#94a3b8" />
          <span style={{ fontSize: 13, color: "#94a3b8" }}>Search for a version</span>
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", margin: "0 0 12px" }}>BOOKMARKED VERSIONS (1)</p>
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: 12, borderRadius: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Landing page working</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} /> Published • Jun 7 6:00PM (Created)
          </div>
        </div>
      </div>
    </div>
  );
}

function CardEntrepreneur() {
  return (
    <div className="bento-visual">
      <div style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderBottom: "none", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, boxShadow: "0 -10px 30px rgba(0,0,0,0.02)" }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 16px" }}>Publish your project</h4>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Globe size={14} color="#64748b" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>https://dunder-mifflin.com</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Clock size={14} color="#64748b" />
          <span style={{ fontSize: 13, color: "#64748b" }}>1min ago</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>Up to date</span>
        </div>

        <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>Share it with friends and coworkers</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <FaTwitter size={16} color="#64748b" />
          <FaLinkedin size={16} color="#64748b" />
          <FaGithub size={16} color="#64748b" />
        </div>

        <button style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
          Update
        </button>
      </div>
    </div>
  );
}

function CardMarketer() {
  return (
    <div className="bento-visual" style={{ alignItems: "flex-end", overflow: "hidden" }}>
      <div style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderBottom: "none", borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: "20px 20px 0 20px", position: "relative", minHeight: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 24px" }}>Unique visitors</h4>
        
        {/* Y-axis labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "absolute", left: 20, zIndex: 10 }}>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>100</span>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>80</span>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>60</span>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>40</span>
        </div>

        {/* Chart Lines */}
        <div style={{ position: "absolute", inset: "60px 0 0 45px", borderBottom: "1px solid #e2e8f0", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: "96px 0 0 45px", borderBottom: "1px solid #e2e8f0", opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: "132px 0 0 45px", borderBottom: "1px solid #e2e8f0", opacity: 0.5 }} />

        {/* SVG Area Chart */}
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{ position: "absolute", bottom: -2, left: 45, width: "calc(100% - 45px)", height: 120 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0,80 C20,80 30,50 60,40 C90,30 110,40 140,20 C170,0 190,10 200,20 L200,100 L0,100 Z" fill="url(#chartGrad)" />
          <path d="M0,80 C20,80 30,50 60,40 C90,30 110,40 140,20 C170,0 190,10 200,20" fill="none" stroke="#2563eb" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

function CardAgency() {
  return (
    <div className="bento-visual" style={{ padding: 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr", gap: 12, padding: "20px", width: "100%" }}>
        <div style={{ background: "#0f172a", borderRadius: 12, height: 160, position: "relative", overflow: "hidden" }}>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: "#fff", fontWeight: 600, opacity: 0.8, marginBottom: 4 }}>We craft extraordinary</div>
            <div style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>digital experiences</div>
          </div>
          <div style={{ position: "absolute", right: -30, bottom: -30, width: 120, height: 120, background: "#ea580c", borderRadius: "50%" }} />
        </div>
        
        <div style={{ background: "#2563eb", borderRadius: 12, height: 160, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "#fff", fontWeight: 600, marginBottom: 2 }}>Learn Like You Are Chatting</div>
            <div style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600 }}>With A Smart Friend</div>
          </div>
          <div style={{ alignSelf: "flex-end", background: "#fcd34d", width: 60, height: 60, borderRadius: 8, transform: "rotate(-10deg) translate(10px, 20px)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#f8fafc", borderRadius: 12, flex: 1, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>AI Prompts</span>
          </div>
          <div style={{ background: "#059669", borderRadius: 12, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
             <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>500,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardStudent() {
  return (
    <div className="bento-visual">
      <div style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.03)", margin: "0 20px" }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Plan</h4>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            "Analyze current project structure and dependencies",
            "Design todo app component structure",
            "Create todo data types and interfaces",
            "Implement todo state management",
          ].map((task, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 1 - i * 0.15 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#334155" }}>{task}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.2 }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#334155" }}>Create todo input component</span>
          </div>
        </div>
        
        {/* Fog overlay at the bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, #fff, transparent)", borderRadius: 16 }} />
      </div>
    </div>
  );
}




/* ─── Main Component ─── */

export default function AtlasForRoles() {
  return (
    <section id="for-roles" className="relative" style={{ background: "transparent", padding: "8rem 0", overflow: "hidden" }}>
      {/* Colorful Background Glows */}

      <style>{`
        .bento-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @keyframes wiggle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 1px); }
          75% { transform: translate(1px, -1px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }


        .bento-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
          position: relative;
        }
        
        .bento-card[data-role="pm"] { background: linear-gradient(to bottom, #ffffff, #EEF2FF); }
        .bento-card[data-role="ent"] { background: linear-gradient(to bottom, #ffffff, #FFF1F2); }
        .bento-card[data-role="mark"] { background: linear-gradient(to bottom, #ffffff, #ECFDF5); }
        .bento-card[data-role="agency"] { background: linear-gradient(to bottom, #ffffff, #FFF7ED); }
        .bento-card[data-role="student"] { background: linear-gradient(to bottom, #ffffff, #F0F9FF); }

        .bento-card:hover {
          transform: translateY(-16px);
          box-shadow: 0 40px 80px -15px rgba(0,0,0,0.1);
          z-index: 10;
        }
        .bento-card:hover .bento-visual {
          transform: scale(1.08);
        }
        .bento-card-top {
          padding: 2rem;
          z-index: 2;
          background: transparent;
        }
        .bento-visual {
          flex: 1;
          background: transparent;
          border-top: 1px solid rgba(0,0,0,0.03);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 2rem;
          padding-top: 2rem;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: bottom center;
          position: relative;
        }
        
        .bento-card[data-role="pm"]:hover .bento-visual { background: rgba(99,91,255,0.04); }
        .bento-card[data-role="ent"]:hover .bento-visual { background: rgba(255,59,141,0.04); }
        .bento-card[data-role="mark"]:hover .bento-visual { background: rgba(16,185,129,0.04); }
        .bento-card[data-role="agency"]:hover .bento-visual { background: rgba(234,88,12,0.04); }
        .bento-card[data-role="student"]:hover .bento-visual { background: rgba(14,165,233,0.04); }

        .role-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }
        .bento-card:hover .role-glow {
          opacity: 1;
        }

        .bento-card[data-role="pm"] .role-glow { background: radial-gradient(circle at center, rgba(99,91,255,0.1) 0%, transparent 70%); }
        .bento-card[data-role="ent"] .role-glow { background: radial-gradient(circle at center, rgba(255,59,141,0.1) 0%, transparent 70%); }
        .bento-card[data-role="mark"] .role-glow { background: radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 70%); }
        .bento-card[data-role="agency"] .role-glow { background: radial-gradient(circle at center, rgba(234,88,12,0.1) 0%, transparent 70%); }
        .bento-card[data-role="student"] .role-glow { background: radial-gradient(circle at center, rgba(14,165,233,0.1) 0%, transparent 70%); }
        
        .bento-card:hover { border-color: rgba(0,0,0,0.1) !important; }
        .bento-card[data-role="pm"]:hover { border-color: #635BFF66 !important; }
        .bento-card[data-role="ent"]:hover { border-color: #ff3b8d66 !important; }
        .bento-card[data-role="mark"]:hover { border-color: #10b98166 !important; }
        .bento-card[data-role="agency"]:hover { border-color: #ea580c66 !important; }
        .bento-card[data-role="student"]:hover { border-color: #0ea5e966 !important; }
        
        /* Grid spans */
        .col-3 { grid-column: span 2; } /* 3 cards in row 1 -> 6/3 = 2 cols each */
        .col-2 { grid-column: span 3; } /* 2 cards in row 2 -> 6/2 = 3 cols each */

        @media (max-width: 1024px) {
          .col-3 { grid-column: span 3; } /* 2x2 wrapping */
          .col-2 { grid-column: span 6; }
        }
        @media (max-width: 768px) {
          .col-3 { grid-column: span 6; }
          .col-2 { grid-column: span 6; }
        }
      `}</style>

      {/* Colorful Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ position: "absolute", top: "20%", left: "5%", width: "30%", height: "40%", background: "radial-gradient(circle, rgba(99,91,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "40%", height: "50%", background: "radial-gradient(circle, rgba(255,59,141,0.03) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 640, margin: "0 auto 4rem", padding: "0 2rem" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", margin: "0 0 1rem", lineHeight: 1.1 }}>
          <span style={{ 
            display: "block", 
            background: "linear-gradient(135deg, #635BFF, #ff3b8d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", 
            fontWeight: 700, 
            marginBottom: 8 
          }}>
            Whatever your role
          </span>
          OneAtlas gives you superpowers
        </h2>
        <p style={{ fontSize: "1.15rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
          From idea to live product, OneAtlas adapts to your workflow, turning vision into reality instantly.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        
        {/* Row 1 */}
        <div className="bento-card col-3" data-role="pm">
          <div className="role-glow" />
          <div className="bento-card-top">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Product managers</h3>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: 0 }}>
              Go from insight to prototype in hours and test ideas with your team before the day is over.
            </p>
          </div>
          <CardPM />
        </div>

        <div className="bento-card col-3" data-role="ent">
          <div className="role-glow" />
          <div className="bento-card-top">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Entrepreneurs</h3>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: 0 }}>
              Launch a full business in days, not months. From landing page to product, all in one flow.
            </p>
          </div>
          <CardEntrepreneur />
        </div>

        <div className="bento-card col-3" data-role="mark">
          <div className="role-glow" />
          <div className="bento-card-top">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>Marketers</h3>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: 0 }}>
              Spin up high-performing campaign pages in hours, with SEO and hosting built in.
            </p>
          </div>
          <CardMarketer />
        </div>

        {/* Row 2 */}
        <div className="bento-card col-2" data-role="agency">
          <div className="role-glow" />
          <div className="bento-card-top" style={{ paddingBottom: 0 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 12px", textAlign: "center" }}>Agencies</h3>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: "0 auto", textAlign: "center", maxWidth: 400 }}>
              Multiply your impact: deliver more projects, faster, without scaling headcount.
            </p>
          </div>
          <CardAgency />
        </div>

        <div className="bento-card col-2" data-role="student">
          <div className="role-glow" />
          <div className="bento-card-top" style={{ paddingBottom: 0 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 12px", textAlign: "center" }}>Students & builders</h3>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, margin: "0 auto", textAlign: "center", maxWidth: 400 }}>
              Learn by doing. Take ideas from class or side projects and turn them into fully working apps.
            </p>
          </div>
          <CardStudent />
        </div>

      </div>
    </section>
  );
}
