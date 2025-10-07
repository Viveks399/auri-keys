'use client';

import LuxuryEstatesHomepage from '@/components/LuxuryEstatesHomepage';
import HeroSection from '@/components/HeroSection';
import CarouselSection from '@/components/CarouselSection';
import PropertiesSection from '@/components/PropertiesSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="relative">
      <LuxuryEstatesHomepage />
      <HeroSection />
      <CarouselSection />
      <PropertiesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
