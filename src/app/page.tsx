"use client";

import PropertySearchSection from "@/components/PropertySearchSection";
import LuxuryEstatesHomepage from "@/components/LuxuryEstatesHomepage";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import ExploreAreasSection from "@/components/ExploreAreasSection";
import AboutAuriSection from "@/components/AboutAuriSection";
import PropertyGallerySection from "@/components/PropertyGallerySection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import ContactFormSection from "@/components/ContactFormSection";

export default function Home() {
  return (
    <div className="relative">
      <PropertySearchSection />
      <LuxuryEstatesHomepage />
      <main className="flex flex-col gap-0">
        <FeaturedPropertiesSection />
        <ExploreAreasSection />
        <AboutAuriSection />
        <PropertyGallerySection />
        <PartnersSection />
        <CTASection />
        <ContactFormSection />
      </main>
    </div>
  );
}
