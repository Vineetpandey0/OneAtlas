'use client'

import GlobalNavbar from '@/components/builder/GlobalNavbar'
import HeroSection from '@/components/builder/sections/HeroSection'
import ModelsMarquee from '@/components/builder/sections/ModelsMarquee'
import BuildProcess from '@/components/builder/sections/Build-process'
import ComparisonSection from '@/components/builder/sections/ComparisonSection'
import TemplatesSection from '@/components/builder/sections/TemplatesSection'
import PricingSection from '@/components/builder/sections/PricingSection'
import TestimonialsSection from '@/components/builder/sections/TestimonialsSection'
import AtlasForRoles from '@/components/builder/sections/AtlasForRoles'
import FAQSection from '@/components/builder/sections/FAQSection'
import Footer from '@/components/builder/Footer'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function HomePage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user])

  return (
    <div className="relative bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-[0.03] blur-[120px] animate-pulse"
          style={{ background: "#635BFF" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-[0.02] blur-[120px]"
          style={{ background: "#635BFF" }}
        />
        {/* Load Flash Beam */}
        <div 
          className="absolute inset-y-0 w-[60vw] opacity-[0.35] pointer-events-none"
          style={{ 
            background: "linear-gradient(90deg, transparent, #635BFF, #3ecf8e, #9461fd, transparent)",
            transform: "skewX(-25deg)",
            left: "-120%",
            filter: "blur(40px)",
            animation: "sweep 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards"
          }}
        />
      </div>

      <style jsx global>{`
        @keyframes sweep {
          0% { left: -120%; opacity: 0; }
          20% { opacity: 0.4; }
          100% { left: 220%; opacity: 0; }
        }
      `}</style>

      <div className="relative z-10">
        {/* 1. Mega Menu Navbar */}
        <GlobalNavbar />

        {/* 2. Hero Section */}
        <HeroSection />

        <div className="bg-[#F6F9FC]">
          {/* 3. How OneAtlas Works */}
          <BuildProcess />
        </div>

        <div className="bg-white">
          {/* 4. AI Models Marquee */}
          <ModelsMarquee />
        </div>

        <div className="bg-white">
          {/* 6. Templates */}
          <TemplatesSection />
        </div>

        <div className="bg-[#F6F9FC]">
          {/* 7. Pricing */}
          <PricingSection />
        </div>

        <div className="bg-white">
          {/* 8. Testimonials */}
          <TestimonialsSection />
        </div>

        <div className="bg-[#F6F9FC]">
          {/* 9. Atlas For Roles */}
          <AtlasForRoles />
        </div>

        <div className="bg-[#F6F9FC]">
          {/* 5. Why OneAtlas Comparison */}
          <ComparisonSection />
        </div>



        <div className="bg-white">
          {/* 11. FAQ */}
          <FAQSection />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}