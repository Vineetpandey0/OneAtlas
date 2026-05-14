'use client'

import GlobalNavbar from '@/components/builder/GlobalNavbar'
import HeroSection from '@/components/builder/sections/HeroSection'
import ModelsMarquee from '@/components/builder/sections/ModelsMarquee'
import Features from '@/components/builder/sections/features'
import BuildProcess from '@/components/builder/sections/Build-process'
import TemplatesSection from '@/components/builder/sections/TemplatesSection'
import PricingSection from '@/components/builder/sections/PricingSection'
import TestimonialsSection from '@/components/builder/sections/TestimonialsSection'
import AtlasForRoles from '@/components/builder/sections/AtlasForRoles'
import WhyAtlas from '@/components/builder/sections/WhyAtlas'
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
    <div className="bg-white">
      {/* 1. Mega Menu Navbar */}
      <GlobalNavbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. How OneAtlas Works */}
      <BuildProcess />

      {/* 4. AI Models Marquee */}
      <ModelsMarquee />

      {/* 5. Features */}
      <Features />

      {/* 6. Templates */}
      <TemplatesSection />

      {/* 7. Pricing */}
      <PricingSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. Atlas For Roles */}
      <AtlasForRoles />

      {/* 10. Why Atlas */}
      <WhyAtlas />

      {/* 11. FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}