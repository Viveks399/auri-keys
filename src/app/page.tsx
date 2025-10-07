'use client';

import HeroSection from '@/components/HeroSection';
import CarouselSection from '@/components/CarouselSection';
import PropertiesSection from '@/components/PropertiesSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <CarouselSection />
      <PropertiesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
