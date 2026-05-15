"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User, Users, Building2, Building, Send, BarChart2,
  Headphones, GraduationCap, Stethoscope, Megaphone,
  Cpu, Plug, ShieldCheck, Terminal, Activity,
  BookOpen, Video, School, LayoutGrid, Newspaper, MessageSquare,
  ChevronDown, ChevronRight, Menu, X,
  Lock, Zap, LineChart,
  Globe
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  desc: string;
};

const teamSizeItems = [
  { icon: User, label: "For Individuals", desc: "Personal building made simple", color: "#635BFF" },
  { icon: Users, label: "For Teams", desc: "Collaborative building for groups", color: "#3ECF8E" },
  { icon: Building2, label: "For Organizations", desc: "Larger teams building for more control", color: "#F59E0B" },
  { icon: Building, label: "For Enterprises", desc: "Enterprise-level building solutions", color: "#EF4444" },
];

const platformCapabilities = [
  { icon: MessageSquare, label: "Describe What You Want", desc: "No coding. Just intent.", color: "#3ECF8E" },
  { icon: Send, label: "Iterate and Improve", desc: "Natural language editing", color: "#635BFF" },
  { icon: BarChart2, label: "Grow Your Business", desc: "Scaling & infra handled", color: "#F59E0B" },
  { icon: ShieldCheck, label: "Security & Compliance", desc: "Enterprise-grade safety", color: "#EF4444" },
  { icon: Users, label: "User Management", desc: "Auth & roles built-in", color: "#A855F7" },
  { icon: Zap, label: "Instant Deployment", desc: "Go live in seconds", color: "#EC4899" },
];

const learnItems: NavItem[] = [
  { icon: BookOpen, label: "Documentation", desc: "Guides & API reference" },
  { icon: Video, label: "Video Tutorials", desc: "Step-by-step walkthroughs" },
  { icon: School, label: "Academy", desc: "Structured learning paths" },
];

const buildItems: NavItem[] = [
  { icon: LayoutGrid, label: "Templates", desc: "Ready-to-use starting points" },
  { icon: Newspaper, label: "Blog", desc: "Product news & insights" },
  { icon: MessageSquare, label: "Community", desc: "Forums & developer hub" },
];

const hubItems = [
  { icon: Globe, label: "Web Applications", desc: "Deploy globally in seconds" },
  { icon: Lock, label: "Secure Infrastructure", desc: "SOC 2 & HIPAA compliant" },
  { icon: Zap, label: "AI Workflows", desc: "Automate with intelligence" },
  { icon: LineChart, label: "Analytics & Insights", desc: "Data-driven decisions" },
];

const resourceCategories = [
  { label: "Popular Templates", icon: LayoutGrid, count: "120+" },
  { label: "Community Forum", icon: MessageSquare, count: "50k members" },
  { label: "Developer Docs", icon: BookOpen, count: "1k+ pages" },
  { label: "Video Academy", icon: Video, count: "40+ courses" },
];

const useCaseItemsExtended = [
  { icon: Send, label: "Recruiting", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: BarChart2, label: "Sales", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Users, label: "HR", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: GraduationCap, label: "Education", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Headphones, label: "Support", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Activity, label: "Healthcare", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: MessageSquare, label: "Telehealth", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Megaphone, label: "Marketing", color: "text-pink-500", bg: "bg-pink-50" },
];

const templates = [
  { name: "SaaS Starter", color: "from-purple-500 to-indigo-600", image: "/templates/saas.png" },
  { name: "CRM Dashboard", color: "from-emerald-500 to-teal-600", image: "/templates/crm.png" },
  { name: "AI App Engine", color: "from-rose-500 to-pink-600", image: "/templates/ai.png" },
];

const featuredTemplates = [
  { title: "SaaS Dashboard", type: "Admin", image: "/template_dashboard_preview_1778836781258.png" },
  { title: "CRM Pipeline", type: "Sales", image: "/template_crm_preview_1778836797455.png" },
];

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11.5px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
      {children}
    </p>
  );
}

function DropdownItem({ item }: { item: NavItem }) {
  return (
    <a
      href="#"
      className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-slate-300 transition-colors">
        <item.icon size={15} className="text-slate-700" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-slate-900 leading-tight">{item.label}</p>
        <p className="text-[12px] text-slate-500 leading-snug mt-0.5">{item.desc}</p>
      </div>
    </a>
  );
}

function TemplateCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % templates.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative w-full h-full rounded-[28px] overflow-hidden bg-gradient-to-br transition-all duration-1000 group/carousel shadow-xl border border-white/20 ${templates[index].color} shadow-indigo-500/20`}>
      {/* Top Badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10">
          <Zap size={11} className="text-white fill-white" />
          <span className="text-[9px] font-black text-white uppercase tracking-wider">TRY ATLAS AI NOW!</span>
        </div>
      </div>

      {templates.map((tpl, i) => (
        <div
          key={tpl.name}
          className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center p-4 text-center ${i === index ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
        >
          <div className="mb-2">
            <h4 className="text-white text-3xl font-black tracking-tighter drop-shadow-lg">OneAtlas</h4>
          </div>
          <p className="text-white text-[11px] font-bold leading-snug max-w-[160px] mb-4 drop-shadow-md">
            Supercharged building with AI-powered tools
          </p>

          <button className="px-4 py-2 rounded-full bg-white shadow-xl shadow-black/10 hover:scale-105 transition-transform">
            <span className={`text-[11px] font-black uppercase tracking-widest ${tpl.color.includes('teal') ? 'text-teal-600' : 'text-indigo-600'}`}>
              {tpl.name}
            </span>
          </button>

          {/* Decorative Graphic (Stairs approximation) */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end overflow-hidden">
              {/* Sphere */}
              <div className="absolute bottom-4 right-20 w-12 h-12 rounded-full bg-white/40 blur-sm mix-blend-overlay" />
              {/* Stairs steps */}
              <div className="w-10 h-8 bg-white/20 ml-auto" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
              <div className="w-10 h-16 bg-white/20" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
              <div className="w-10 h-24 bg-white/20" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-white transition-all duration-[1000ms] ease-linear"
          style={{ width: `${((index + 1) / templates.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function SolutionsDropdown() {
  return (
    <div className="mega-dropdown absolute top-full left-1/2 mt-2 bg-white border border-slate-100 rounded-[28px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.12)] p-1.5 grid grid-cols-12 w-[680px] z-50 opacity-0 invisible pointer-events-none transition-all duration-300">

      {/* Left & Middle Container */}
      <div className="col-span-9 flex flex-col">
        {/* By Team Size */}
        <div className="p-2 bg-white rounded-tl-[26px]">
          <ColLabel>By team size</ColLabel>
          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {/* Individual */}
            <a href="#" className="py-1 px-0.5 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-0.5 hover:bg-violet-50/30 transition-all group flex flex-col items-center text-center rounded-xl">
              <User size={40} className="text-violet-500 mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <p className="text-[13px] font-bold text-slate-900 leading-tight">For Individuals</p>
              <p className="text-[11px] text-slate-400">Personal success.</p>
            </a>

            {/* Teams */}
            <a href="#" className="py-1 px-0.5 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-0.5 hover:bg-emerald-50/30 transition-all group flex flex-col items-center text-center rounded-xl">
              <Users size={40} className="text-emerald-500 mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <p className="text-[13px] font-bold text-slate-900 leading-tight">For Teams</p>
              <p className="text-[11px] text-slate-400">Better together.</p>
            </a>

            {/* Organizations */}
            <a href="#" className="py-1 px-0.5 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-0.5 hover:bg-amber-50/30 transition-all group flex flex-col items-center text-center rounded-xl">
              <Building2 size={40} className="text-amber-500 mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <p className="text-[13px] font-bold text-slate-900 leading-tight">Orgs</p>
              <p className="text-[11px] text-slate-400">Stronger alignment.</p>
            </a>

            {/* Enterprise */}
            <a href="#" className="py-1 px-0.5 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-0.5 hover:bg-rose-50/30 transition-all group flex flex-col items-center text-center rounded-xl">
              <Building size={40} className="text-rose-500 mb-1.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <p className="text-[13px] font-bold text-slate-900 leading-tight">For Enterprises</p>
              <p className="text-[11px] text-slate-400">Scale effortlessly.</p>
            </a>
          </div>
        </div>

        {/* By Use Case */}
        <div className="p-2">
          <ColLabel>By use case</ColLabel>
          <div className="grid grid-cols-4 gap-1">
            {useCaseItemsExtended.slice(0, 8).map((item) => (
              <a key={item.label} href="#" className={`flex items-center gap-1.5 py-1.5 px-1.5 rounded-lg bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:${item.bg} transition-all group`}>
                <item.icon size={20} className={`${item.color}`} strokeWidth={2} />
                <span className="text-[12.5px] font-bold text-slate-900 tracking-tight">{item.label}</span>
                <ChevronRight size={12} className="text-slate-300 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right: OneAtlas Promo Card - Latest Screenshot Match */}
      <div className="col-span-3 p-2">
        <TemplateCarousel />
      </div>
    </div>
  );
}


function ResourcesDropdown() {
  return (
    <div className="mega-dropdown absolute top-full left-1/2 mt-3 bg-white border border-slate-100 rounded-[32px] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.15)] p-6 grid grid-cols-12 gap-5 w-[820px] z-50 opacity-0 invisible pointer-events-none transition-all duration-300">

      {/* Left Column: Categories */}
      <div className="col-span-4 flex flex-col gap-2 pr-4 border-r border-slate-50">
        <ColLabel>Resources</ColLabel>
        {resourceCategories.map((cat) => (
          <a key={cat.label} href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] transition-all group">
            <div className="w-10 h-10 rounded-lg bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <cat.icon size={18} className="text-slate-600" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-900">{cat.label}</p>
              <p className="text-[11px] text-slate-400 font-medium">{cat.count}</p>
            </div>
          </a>
        ))}

        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 shadow-[0_10px_30px_-10px_rgba(99,91,255,0.1)] relative overflow-hidden group/academy cursor-pointer">
          <div className="relative z-10">
            <p className="text-[12px] font-bold text-indigo-900 mb-1">New Academy Course</p>
            <p className="text-[11px] text-indigo-600 leading-snug">Build a full-scale CRM in 10 minutes.</p>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-400/10 blur-2xl -mr-8 -mt-8 group-hover/academy:scale-150 transition-transform" />
        </div>
      </div>

      {/* Right Column: Featured Showcase */}
      <div className="col-span-8 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <ColLabel>Featured Showcase</ColLabel>
          <a href="#" className="text-[11px] font-black text-slate-900 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1">
            View all templates <ChevronRight size={12} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {featuredTemplates.map((tpl) => (
            <div key={tpl.title} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 mb-3 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-300">
                <img
                  src={tpl.image}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/90 backdrop-blur shadow-sm text-[9px] font-black uppercase tracking-tight text-slate-900">
                  {tpl.type}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[14px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                {tpl.title}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </p>
              <p className="text-[11px] text-slate-400 font-medium">Click to preview template</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GlobalNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <style>{`
        .nav-item:hover .mega-dropdown {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateX(-50%) translateY(0) !important;
        }
        .mega-dropdown {
          transform: translateX(-50%) translateY(-6px);
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
        }
        .nav-item:hover .nav-chevron {
          transform: rotate(180deg);
        }
        .nav-chevron {
          transition: transform 0.2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="no-underline">
            <span className="text-[22px] font-black text-slate-950 tracking-tighter flex items-center gap-1 group">
              OneAtlas
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mb-4 group-hover:scale-150 transition-transform" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center h-full gap-0">

            <div className="nav-item relative h-full flex items-center">
              <a href="#" className="flex items-center gap-1 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Solutions
                <ChevronDown size={13} className="nav-chevron text-slate-400" />
              </a>
              <SolutionsDropdown />
            </div>

            <div className="nav-item relative h-full flex items-center">
              <a href="#" className="flex items-center gap-1 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Enterprise
              </a>
            </div>

            <div className="nav-item relative h-full flex items-center">
              <a href="#" className="flex items-center gap-1 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Resources
                <ChevronDown size={13} className="nav-chevron text-slate-400" />
              </a>
              <ResourcesDropdown />
            </div>

            <div className="nav-item relative h-full flex items-center">
              <a href="#pricing" className="flex items-center gap-1 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Pricing
              </a>
            </div>

            <div className="nav-item relative h-full flex items-center">
              <a href="#changelog" className="flex items-center gap-1 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Changelog
              </a>
            </div>

          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/sign-in"
              className="text-[13.5px] font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-1.5 text-[13.5px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full transition-colors"
            >
              Get started <ChevronRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden p-2 text-slate-900 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="md:hidden bg-white border-t border-slate-200 px-6 pb-6 pt-5"
            style={{ animation: "slideDown 0.2s cubic-bezier(.22,1,.36,1)" }}
          >
            {["Solutions", "Enterprise", "Resources", "Pricing", "Changelog"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[15px] font-medium text-slate-900 border-b border-slate-100 hover:text-slate-600 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-2.5 mt-5">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 rounded-xl border border-slate-200 text-[14px] font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-slate-900 text-[14px] font-bold text-white hover:bg-slate-800 transition-colors"
              >
                Get started <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}