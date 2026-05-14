"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X, Globe2 } from "lucide-react";

const features = [
  { name: "Ease of Use", us: "No technical background needed", them: "Headache for non-coders" },
  { name: "What You Can Build", us: "Fully-featured apps", them: "Basic apps only" },
  { name: "All-in-one Platform", us: "Everything built-in", them: "Requires external services" },
  { name: "SEO", us: "Built-in SEO tools", them: "Not supported" },
  { name: "Human Support", us: "Live chat & calls", them: "Little to no support" },
  { name: "Error Correction", us: "Smart & automatic", them: "Gets stuck often" },
  { name: "Hosting", us: "Scales with you", them: "Limited" }
];

export default function ComparisonSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-8 font-sans bg-transparent overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header Texts */}
        <div 
          className="mb-16 max-w-2xl transition-all duration-700 ease-out"
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? "translateY(0)" : "translateY(20px)" 
          }}
        >
          <h2 className="text-[#0A2540] text-[clamp(2rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight mb-4">
            Why OneAtlas?
          </h2>
          <p className="text-[#425466] text-[17px] leading-relaxed">
            See how OneAtlas stacks up against other AI app builders across the features that matter most.
          </p>
        </div>

        {/* Comparison Table */}
        <div 
          className="relative mt-12 transition-all duration-1000 ease-out delay-200"
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? "translateY(0)" : "translateY(40px)" 
          }}
        >
          
          {/* Highlight Background Box (Desktop) */}
          <div 
            className="absolute top-[-30px] bottom-[-20px] left-[30%] w-[40%] bg-white rounded-[24px] border-[1.5px] border-[#635BFF] shadow-[0_15px_40px_-15px_rgba(99,91,255,0.15)] hover:shadow-[0_20px_50px_-10px_rgba(99,91,255,0.25)] transition-shadow duration-500 z-0 hidden md:block" 
          />

          <div className="relative z-10 flex flex-col">
            
            {/* Table Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] pb-6">
              <div className="hidden md:block"></div>
              
              {/* OneAtlas Logo Header */}
              <div className="flex justify-start md:justify-center items-center px-6">
                <div className="w-12 h-12 rounded-xl bg-[#F0EFFF] text-[#635BFF] flex items-center justify-center mb-4 md:mb-0 shadow-sm border border-[#C7D2FE]">
                  <Globe2 size={24} strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Others Header */}
              <div className="flex justify-start items-center px-6 font-bold text-[#0A2540] text-[17px]">
                Others
              </div>
            </div>

            {/* Table Rows */}
            {features.map((f, i) => (
              <div 
                key={i} 
                className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] py-5 md:py-6 border-b border-[#E4E7EB]/70 group hover:bg-[#fafbfc]/50 transition-colors duration-300 rounded-lg -mx-4 px-4 md:mx-0 md:px-0 md:rounded-none"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease-out ${300 + i * 100}ms, transform 0.6s ease-out ${300 + i * 100}ms, background-color 0.3s ease`
                }}
              >
                {/* Feature Name */}
                <div className="flex items-center px-0 md:px-6 font-bold text-[14.5px] text-[#0A2540] mb-3 md:mb-0 group-hover:text-[#635BFF] transition-colors duration-300">
                  {f.name}
                </div>
                
                {/* OneAtlas Column */}
                <div className="flex items-center gap-3 px-0 md:px-6 text-[14.5px] text-[#425466] mb-3 md:mb-0">
                  <div className="w-[22px] h-[22px] rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-200 transition-all duration-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <span className="font-medium text-[#0A2540]">{f.us}</span>
                </div>
                
                {/* Others Column */}
                <div className="flex items-center gap-3 px-0 md:px-6 text-[14.5px] text-[#97A3B4]">
                  <div className="w-[22px] h-[22px] rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:opacity-70 transition-opacity duration-300">
                    <X className="w-3.5 h-3.5 text-gray-400 stroke-[3]" />
                  </div>
                  <span className="font-medium group-hover:text-gray-400 transition-colors duration-300">{f.them}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
