'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const EmblaCarousel = dynamic(() => import('@/components/EmblaCarousel'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
});

const SecondaryEmblaCarousel = dynamic(() => import('@/components/SecondaryEmblaCarousel'), {
  loading: () => (
    <div className="flex items-center justify-center py-8">
      <div className="text-white text-lg">Loading carousel...</div>
    </div>
  )
});

// Custom Dropdown Component with smooth animations
const AnimatedDropdown = ({ options, selectedValue, onSelect }: {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer w-40 text-left flex items-center justify-between"
      >
        <span>{selectedValue}</span>
        <svg 
          className={`w-4 h-4 text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`absolute top-full left-0 right-0 mt-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md overflow-hidden z-50 transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-1">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left text-white hover:bg-white/20 transition-all duration-200 transform cursor-pointer ${
                selectedValue === option ? 'bg-white/20' : ''
              } ${
                isOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-2 opacity-0'
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<'buy' | 'rent'>('buy');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Residential');

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

  const secondaryCarouselSlides = [
    {
      src: '/assets/images/auri-keys.jpeg',
      alt: 'Address Grand Downtown',
      title: 'Address Grand Downtown',
      location: 'Downtown',
      deliveryDate: 'Dec, 2028',
      price: 'AED 10,860,000',
      developer: 'NSHAMA x EMAAR'
    },
    {
      src: '/assets/images/auri-keys-2.jpg',
      alt: 'Marina Heights Tower', 
      title: 'Marina Heights Tower',
      location: 'Dubai Marina',
      deliveryDate: 'Q2, 2027',
      price: 'AED 8,500,000',
      developer: 'DAMAC Properties'
    },
    {
      src: '/assets/images/auri-bg.jpg',
      alt: 'Burj Vista',
      title: 'Burj Vista',
      location: 'Downtown',
      deliveryDate: 'Mar, 2029',
      price: 'AED 12,200,000',
      developer: 'EMAAR Properties'
    },
    {
      src: '/assets/images/mobile-bg.jpg',
      alt: 'Dubai Hills Estate',
      title: 'Dubai Hills Estate',
      location: 'Dubai Hills',
      deliveryDate: 'Jun, 2027',
      price: 'AED 6,800,000',
      developer: 'EMAAR Properties'
    },
    {
      src: '/assets/images/auri-keys.jpeg',
      alt: 'Business Bay Residences',
      title: 'Business Bay Residences',
      location: 'Business Bay',
      deliveryDate: 'Sep, 2028',
      price: 'AED 9,750,000',
      developer: 'SOBHA Realty'
    },
    {
      src: '/assets/images/auri-keys-2.jpg',
      alt: 'Jumeirah Beach Residence',
      title: 'Jumeirah Beach Residence',
      location: 'JBR',
      deliveryDate: 'Dec, 2027',
      price: 'AED 7,300,000',
      developer: 'Dubai Properties'
    }
  ];

  return (
    <div className="relative">
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

      {/* Fixed Search Section - Positioned at bottom of carousel, overlapping next section */}
      <div className="relative z-50 -mt-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Buy/Rent Toggle */}
              <div className="flex bg-white/10 backdrop-blur-sm rounded-md p-1 border border-white/20">
                <button 
                  onClick={() => setSelectedOption('buy')}
                  className={`px-4 py-2 rounded-sm font-medium transition-all border cursor-pointer ${
                    selectedOption === 'buy' 
                      ? 'bg-white/20 backdrop-blur-sm border-white/30 text-white' 
                      : 'bg-transparent border-transparent text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setSelectedOption('rent')}
                  className={`px-4 py-2 rounded-sm font-medium transition-all border cursor-pointer ${
                    selectedOption === 'rent' 
                      ? 'bg-white/20 backdrop-blur-sm border-white/30 text-white' 
                      : 'bg-transparent border-transparent text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Rent
                </button>
              </div>
              
               {/* Residential Dropdown */}
               <AnimatedDropdown
                 options={['Residential', 'Commercial']}
                 selectedValue={selectedPropertyType}
                 onSelect={setSelectedPropertyType}
               />
              
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="City, building or community"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              
              {/* Search Button */}
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full font-medium transition-colors border border-white/30 cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Carousel Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900/40 to-gray-900/40 flex flex-col items-center justify-center -mt-16">
        <div className="text-white text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 font-display">Featured Properties</h2>
          <p className="text-lg opacity-70">Discover our exclusive collection of premium real estate</p>
        </div>
        <SecondaryEmblaCarousel 
          slides={secondaryCarouselSlides} 
          options={{ 
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: false,
            containScroll: 'trimSnaps'
          }}
        />
      </div>

      {/* Dummy Section 1 */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Services Section</h2>
          <p className="text-lg opacity-70">Comprehensive real estate solutions tailored to your needs.</p>
        </div>
      </div>

      {/* Dummy Section 2 */}
      <div className="relative min-h-screen bg-gradient-to-br from-green-900/20 to-teal-900/20 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">About Section</h2>
          <p className="text-lg opacity-70">Your trusted partner in finding the perfect property.</p>
        </div>
      </div>

      {/* Dummy Section 3 */}
      <div className="relative min-h-screen bg-gradient-to-br from-orange-900/20 to-red-900/20 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Section</h2>
          <p className="text-lg opacity-70">Get in touch with our expert team today.</p>
        </div>
      </div>

    </div>
  );
}
