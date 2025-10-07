'use client';

import dynamic from 'next/dynamic';

const EmblaCarousel = dynamic(() => import('@/components/EmblaCarousel'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
});

export default function CarouselSection() {
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
    <div className="relative min-h-screen flex items-center justify-center">
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
  );
}
