'use client';

import { useState } from 'react';
import RotatingText from '@/components/RotatingText';

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
        className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer w-40 text-left flex items-center justify-between text-base font-medium"
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

export default function HeroSection() {
  const [selectedOption, setSelectedOption] = useState<'buy' | 'rent'>('buy');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Residential');

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/landing page/main-landing-image.avif')"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Centered Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 font-display leading-tight">
            Find Your Dream{' '}
            <RotatingText
              texts={['Address', 'Lifestyle', 'Home']}
              mainClassName="inline-block"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display relative"
              transition={(index) => {
                const currentText = ['Address', 'Lifestyle', 'Home'][index] || '';
                if (currentText === 'Home') {
                  return { type: "spring", damping: 15, stiffness: 200, mass: 2 };
                }
                return { type: "spring", damping: 30, stiffness: 400 };
              }}
              rotationInterval={2500}
            />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover luxury properties in Dubai's most prestigious locations
          </p>
        </div>
        
        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 sm:p-6 lg:p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            {/* Buy/Rent Toggle */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full sm:w-auto">
              <button 
                onClick={() => setSelectedOption('buy')}
                className={`px-6 py-3 rounded-lg font-medium transition-all border cursor-pointer flex-1 sm:flex-none text-base ${
                  selectedOption === 'buy' 
                    ? 'bg-white/20 backdrop-blur-sm border-white/30 text-white' 
                    : 'bg-transparent border-transparent text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Buy
              </button>
              <button 
                onClick={() => setSelectedOption('rent')}
                className={`px-6 py-3 rounded-lg font-medium transition-all border cursor-pointer flex-1 sm:flex-none text-base ${
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
            <div className="flex-1 relative w-full">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="City, building or community"
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-base font-medium"
              />
            </div>
            
            {/* Search Button */}
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-white/30 cursor-pointer text-base w-full sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
