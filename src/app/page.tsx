'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const Beams = dynamic(() => import('@/components/Beams'), {
  ssr: false,
  loading: () => null
});

const EmblaCarousel = dynamic(() => import('@/components/EmblaCarousel'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
});

export default function Home() {
  const [showBeams, setShowBeams] = useState(false);

  useEffect(() => {
    // Only show beams on desktop and high-end devices
    const isHighEndDevice = 
      window.innerWidth > 768 && 
      navigator.hardwareConcurrency > 4 &&
      !navigator.userAgent.includes('Mobile');
    
    setShowBeams(isHighEndDevice);
  }, []);

  const carouselSlides = [
    {
      src: '/assets/images/landing page/real-estate-landing-1.avif',
      alt: 'Luxury Penthouse',
      title: 'Sky-High Luxury',
      subtitle: 'Penthouse Living',
      description: 'Elevate your lifestyle with our exclusive penthouse collection featuring panoramic city views, private terraces, and world-class amenities.',
      features: ['360° City Views', 'Private Elevator', 'Rooftop Garden', 'Concierge Service']
    },
    {
      src: '/assets/images/landing page/real-estate-landing-2.avif',
      alt: 'Modern Villa',
      title: 'Contemporary Elegance',
      subtitle: 'Architectural Masterpiece',
      description: 'Discover cutting-edge design meets timeless elegance in our modern villa collection, crafted for the discerning homeowner.',
      features: ['Smart Home Technology', 'Sustainable Design', 'Open Floor Plans', 'Premium Finishes']
    },
    {
      src: '/assets/images/landing page/real-estate-landing-3.avif',
      alt: 'Exclusive Resort',
      title: 'Resort-Style Living',
      subtitle: 'Ultimate Comfort',
      description: 'Experience resort-style living with our exclusive community featuring championship golf courses, spa facilities, and luxury amenities.',
      features: ['Golf Course Access', 'Spa & Wellness', 'Fine Dining', '24/7 Security']
    }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* ReactBits Animation Background - Only on high-end devices */}
      {showBeams && (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
          <Beams
            beamWidth={4}
            beamHeight={30}
            beamNumber={8}
            lightColor="#ff0000"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
      )}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <EmblaCarousel 
          slides={carouselSlides} 
          options={{ 
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: false
          }}
        />
      </div>

    </div>
  );
}
