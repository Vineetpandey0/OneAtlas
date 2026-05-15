"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User, Users, Building2, Building, Send, BarChart2,
  Headphones, GraduationCap, Stethoscope, Megaphone,
  Cpu, Plug, ShieldCheck, Terminal, Activity,
  BookOpen, Video, School, LayoutGrid, Newspaper, MessageSquare,
  ChevronDown, ChevronRight, Menu, X,
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  desc: string;
};

const teamSizeItems = [
  { icon: User,      label: "For Individuals", desc: "Personal building made simple", color: "#635BFF" },
  { icon: Users,     label: "For Teams",       desc: "Collaborative building for groups", color: "#3ECF8E" },
  { icon: Building2, label: "For Organizations", desc: "Larger teams building for more control", color: "#F59E0B" },
  { icon: Building,  label: "For Enterprises",  desc: "Enterprise-level building solutions", color: "#EF4444" },
];

const useCaseItems = [
  { icon: Send,          label: "Recruiting",  size: 44, iSize: 22 },
  { icon: BarChart2,     label: "Sales",       size: 38, iSize: 19 },
  { icon: Headphones,    label: "Support",     size: 42, iSize: 21 },
  { icon: Stethoscope,   label: "Healthcare",  size: 40, iSize: 20 },
  { icon: Users,         label: "HR",          size: 36, iSize: 18 },
  { icon: MessageSquare, label: "Telehealth",  size: 42, iSize: 21 },
  { icon: GraduationCap, label: "Education",   size: 44, iSize: 22 },
  { icon: Megaphone,     label: "Marketing",   size: 38, iSize: 19 },
];

const learnItems: NavItem[] = [
  { icon: BookOpen, label: "Documentation",   desc: "Guides & API reference" },
  { icon: Video,    label: "Video Tutorials", desc: "Step-by-step walkthroughs" },
  { icon: School,   label: "Academy",         desc: "Structured learning paths" },
];

const buildItems: NavItem[] = [
  { icon: LayoutGrid,    label: "Templates",  desc: "Ready-to-use starting points" },
  { icon: Newspaper,     label: "Blog",       desc: "Product news & insights" },
  { icon: MessageSquare, label: "Community",  desc: "Forums & developer hub" },
];

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">
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

function SolutionsDropdown() {
  return (
    <div className="mega-dropdown absolute top-full left-1/2 mt-3 bg-white border border-slate-200/60 rounded-[28px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.2)] p-7 grid grid-cols-12 gap-5 w-[920px] z-50 opacity-0 invisible pointer-events-none transition-all duration-300">
      
      {/* Left Section: Platform/Team Size (Bento Grid) */}
      <div className="col-span-7 grid grid-cols-2 gap-4 border-r border-slate-100 pr-5">
        <div className="col-span-2">
          <ColLabel>Platform & Teams</ColLabel>
        </div>
        
        {teamSizeItems.slice(0, 2).map((item) => (
          <a key={item.label} href="#" className="col-span-1 group relative p-5 rounded-2xl border border-slate-900/5 bg-slate-50/30 hover:bg-white hover:border-slate-900/20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:scale-[1.03] transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-900/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
              <item.icon size={22} style={{ color: item.color }} />
            </div>
            <p className="text-[15px] font-bold text-slate-900 mb-1.5">{item.label}</p>
            <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{item.desc}</p>
          </a>
        ))}

        {teamSizeItems.slice(2).map((item) => (
          <a key={item.label} href="#" className="col-span-1 flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-900/10 hover:bg-slate-50/50 hover:scale-[1.02] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-900/10 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-900 transition-all duration-300">
              <item.icon size={18} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-900 leading-tight mb-1">{item.label}</p>
              <p className="text-[11px] text-slate-400 font-medium">Learn more →</p>
            </div>
          </a>
        ))}

        <div className="col-span-2 pt-2">
          <ColLabel>Top Use Cases</ColLabel>
          <div className="grid grid-cols-3 gap-2">
            {useCaseItems.map(item => (
              <a key={item.label} href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-900/10 bg-white hover:bg-slate-900 hover:text-white hover:scale-[1.05] transition-all duration-200 group">
                <item.icon size={14} className="text-slate-400 group-hover:text-indigo-400" />
                <span className="text-[11px] font-bold tracking-tight">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Solutions & AI (Spanning) */}
      <div className="col-span-5 flex flex-col gap-5">
        <div className="bg-slate-50/50 border border-slate-900/5 rounded-2xl p-5 hover:bg-white hover:border-slate-900/20 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-300 group">
          <ColLabel>Solutions Hub</ColLabel>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {teamSizeItems.map(item => (
              <a key={item.label} href="#" className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-900/10 flex items-center justify-center group-hover/item:border-indigo-400 transition-colors">
                  <item.icon size={15} className="text-slate-600 group-hover/item:text-indigo-600" />
                </div>
                <span className="text-[13px] font-bold text-slate-700 group-hover/item:text-slate-900">Custom {item.label} flow</span>
              </a>
            ))}
          </div>
        </div>

        {/* AI Promo Card - Bento Style */}
        <div className="flex-1 bg-slate-900 rounded-[24px] p-6 relative overflow-hidden group/promo cursor-pointer hover:scale-[1.03] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 border border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full -mr-10 -mt-10 group-hover/promo:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 blur-[50px] rounded-full -ml-10 -mb-10 group-hover/promo:scale-150 transition-transform duration-700" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-black text-white uppercase tracking-widest">New</span>
            </div>
            <h4 className="text-white text-3xl font-black tracking-tighter mb-2 group-hover/promo:translate-x-1 transition-transform">OneAtlas</h4>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-6">
              The world's most powerful<br />AI app engine is here.
            </p>
            <div className="text-indigo-400 text-[13px] font-bold flex items-center gap-2 group-hover/promo:gap-3 transition-all">
              Try public beta <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesDropdown() {
  return (
    <div className="mega-dropdown absolute top-full left-1/2 mt-3 bg-white border border-slate-200 rounded-[24px] shadow-2xl shadow-slate-200/60 p-6 grid grid-cols-2 gap-4 w-[500px] z-50 opacity-0 invisible pointer-events-none transition-all duration-300">
      <div className="col-span-2">
        <ColLabel>Resources & Learning</ColLabel>
      </div>
      
      {learnItems.map((item) => (
        <a key={item.label} href="#" className="flex flex-col gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-lg transition-all duration-300 group">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <item.icon size={18} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-900 leading-tight mb-1">{item.label}</p>
            <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
          </div>
        </a>
      ))}

      <div className="col-span-2 bg-slate-50 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
             <MessageSquare size={14} className="text-slate-600" />
          </div>
          <span className="text-[12px] font-bold text-slate-900">Join our Discord community</span>
        </div>
        <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
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
            <span className="text-[22px] font-extrabold text-slate-900 tracking-tight">
              OneAtlas
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