"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Globe2 } from "lucide-react";

const footerLinks = {
  Product:   ["App Generator", "Templates", "Pricing", "Changelog"],
  Solutions: ["For Developers", "For Designers", "For Founders", "For Teams"],
  Company:   ["About", "Blog", "Careers", "Contact"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden font-sans">
      
      {/* Sky Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2500&auto=format&fit=crop')",
          backgroundPosition: "center 30%"
        }}
      />
      {/* Subtle overlays to ensure text readability while keeping the sky bright */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-900/50 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-white/10" />

      {/* Hero CTA Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 pt-48 pb-40 flex flex-col items-center text-center">
        <h2 className="text-white text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] mb-10 drop-shadow-lg shadow-black/20">
          Start building<br />on OneAtlas today.
        </h2>
        
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-3 bg-white text-[#0f172a] px-8 py-3.5 rounded-full font-bold text-[16px] transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] border-[1.5px] border-white/50"
        >
          Get Started <span className="text-xl font-black translate-y-[-1px]">→</span>
        </Link>
      </div>

      {/* Footer Links & Info (Glassmorphism style to blend with the sky) */}
      <div className="relative z-10 border-t border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-sm">
                  <Globe2 size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-sm">OneAtlas</span>
              </Link>
              <p className="text-white/90 text-[14.5px] leading-relaxed max-w-[280px] mb-8 font-medium drop-shadow-sm">
                Build full-stack applications with AI in seconds. Clean code, modular architecture, and one-click deploy — all included.
              </p>
              
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: "https://github.com/vineetpandey0", label: "GitHub" },
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 hover:scale-110 transition-all duration-200 shadow-sm backdrop-blur-md"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-[12px] font-extrabold text-white/90 tracking-[0.15em] uppercase mb-6 drop-shadow-sm">
                  {section}
                </h4>
                <ul className="flex flex-col gap-4">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-[14.5px] text-white/80 hover:text-white font-medium transition-colors drop-shadow-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-[1200px] mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/80 font-medium drop-shadow-sm">
            <span>© {new Date().getFullYear()} <Link href="/" className="text-white hover:underline font-semibold">OneAtlas</Link>. All rights reserved.</span>
            <span>Built with ❤️ by Vineet Pandey</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
}