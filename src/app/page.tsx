"use client";

import LuxuryEstatesHomepage from "@/components/LuxuryEstatesHomepage";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import ExploreAreasSection from "@/components/ExploreAreasSection";
import AboutAuriSection from "@/components/AboutAuriSection";
import PropertyGallerySection from "@/components/PropertyGallerySection";
import ClientStoriesSection from "@/components/ClientStoriesSection";
import CTASection from "@/components/CTASection";
import ContactFormSection from "@/components/ContactFormSection";

export default function Home() {
  return (
    <div className="relative">
      <LuxuryEstatesHomepage />
      <main className="flex flex-col gap-0">
        <FeaturedPropertiesSection />
        <ExploreAreasSection />
        <AboutAuriSection />
        <PropertyGallerySection />
        <ClientStoriesSection />
        <CTASection />
        <ContactFormSection />
      </main>
    </div>
  );
}
