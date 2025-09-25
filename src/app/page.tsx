'use client';

import Beams from '@/components/Beams';
import EmblaCarousel from '@/components/EmblaCarousel';

export default function Home() {
  const carouselSlides = [
    {
      src: '/assets/images/landing page/real-estate-landing-1.jpg',
      alt: 'Luxury Penthouse',
      title: 'Sky-High Luxury',
      subtitle: 'Penthouse Living',
      description: 'Elevate your lifestyle with our exclusive penthouse collection featuring panoramic city views, private terraces, and world-class amenities.',
      features: ['360° City Views', 'Private Elevator', 'Rooftop Garden', 'Concierge Service']
    },
    {
      src: '/assets/images/landing page/real-estate-landing-2.jpg',
      alt: 'Modern Villa',
      title: 'Contemporary Elegance',
      subtitle: 'Architectural Masterpiece',
      description: 'Discover cutting-edge design meets timeless elegance in our modern villa collection, crafted for the discerning homeowner.',
      features: ['Smart Home Technology', 'Sustainable Design', 'Open Floor Plans', 'Premium Finishes']
    },
    {
      src: '/assets/images/landing page/real-estate-landing-3.jpg',
      alt: 'Exclusive Resort',
      title: 'Resort-Style Living',
      subtitle: 'Ultimate Comfort',
      description: 'Experience resort-style living with our exclusive community featuring championship golf courses, spa facilities, and luxury amenities.',
      features: ['Golf Course Access', 'Spa & Wellness', 'Fine Dining', '24/7 Security']
    }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* ReactBits Animation Background */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <Beams
          beamWidth={4}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ff0000"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <EmblaCarousel 
          slides={carouselSlides} 
          options={{ loop: true }}
        />
      </div>

      {/* Dummy Section for Scrolling */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
            Scroll Down Section
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-80 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-6 sm:mb-7 md:mb-8 leading-relaxed">
            This section demonstrates how the beams background stays fixed while content scrolls over it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">Feature 1</h3>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">Feature 2</h3>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">Sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">Feature 3</h3>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">Ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
