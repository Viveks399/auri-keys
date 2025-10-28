"use client";

import React, { useState, useRef, useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import { useCarouselLoading } from "@/contexts/CarouselLoadingContext";

const PropertySearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setCarouselImagesLoaded } = useCarouselLoading();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "townhouse", label: "Townhouse" },
    { value: "penthouse", label: "Penthouse" }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePropertyTypeSelect = (value: string) => {
    setSelectedPropertyType(value);
    setIsDropdownOpen(false);
  };

  const handleCarouselImagesLoaded = () => {
    setCarouselImagesLoaded(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const slides = [
    {
      src: "/assets/images/landing page/PropertySearchSection-background-image.avif",
      alt: "Luxury Property Search",
      title: "Explore with Auri Keys",
      subtitle: "Premium Real Estate",
      description: "Visually pinpoint your perfect property in Dubai's most exclusive locations",
      features: ["Luxury Villas", "Penthouse Suites", "Waterfront Properties", "Prime Locations"]
    },
    {
      src: "/assets/images/landing page/PropertySearchSection-background-image-2.avif",
      alt: "Modern Apartments",
      title: "Modern Living Spaces",
      subtitle: "Contemporary Design",
      description: "Discover contemporary apartments with stunning city views and world-class amenities",
      features: ["City Views", "Modern Amenities", "Smart Home", "Concierge Service"]
    },
    {
      src: "/assets/images/landing page/PropertySearchSection-background-image-3.avif",
      alt: "Exclusive Communities",
      title: "Exclusive Communities",
      subtitle: "Gated Communities",
      description: "Experience luxury living in Dubai's most prestigious gated communities",
      features: ["24/7 Security", "Private Beach", "Golf Course", "Spa & Wellness"]
    },
    {
      src: "/assets/images/landing page/PropertySearchSection-background-image-4.avif",
      alt: "Investment Opportunities",
      title: "Investment Opportunities",
      subtitle: "Smart Investments",
      description: "Maximize your returns with strategic real estate investments in Dubai's booming market",
      features: ["High ROI", "Rental Income", "Capital Appreciation", "Tax Benefits"]
    }
  ];

  const carouselOptions = {
    loop: true,
    align: "center" as const,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps" as const,
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <EmblaCarousel 
          slides={slides} 
          options={carouselOptions}
          onImagesLoaded={handleCarouselImagesLoaded}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative flex flex-col min-h-screen z-30">
        <main className="flex-grow flex items-center justify-center p-4 md:items-center  md:pt-0 pt-25">
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center text-white md:mb-8 mb-25">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                Explore with Auri Keys
              </h1>
              <p className="mt-2 text-base md:text-lg opacity-90 drop-shadow-sm">
                Visually pinpoint your perfect property
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {/* Buy/Rent Toggle */}
              <div className="bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center min-w-[120px] relative transition-all duration-300 group h-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80 text-xl group-hover:opacity-0 transition-opacity duration-300">
                    swap_horiz
                  </span>
                </div>
                <button className="px-4 bg-primary text-white text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-full cursor-pointer h-full flex items-center">
                  Buy
                </button>
                <button className="px-4 text-white/80 hover:text-white text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full cursor-pointer h-full flex items-center">
                  Rent
                </button>
              </div>

              {/* Property Type Selector */}
              <div className="relative w-36" ref={dropdownRef}>
                <div className="relative bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg group w-full h-10">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-white/80 text-xl group-hover:opacity-0 transition-opacity duration-300">
                      home
                    </span>
                  </div>
                  <button
                    className="w-full bg-transparent text-white/80 border-0 focus:ring-0 focus:outline-none cursor-pointer pl-4 pr-4 py-2.5 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between min-w-0 gap-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                  >
                    <span className="truncate flex-1">{propertyTypes.find(type => type.value === selectedPropertyType)?.label}</span>
                    <span className={`material-symbols-outlined text-base transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                </div>
                
                {/* Custom Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden z-50">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:bg-white/10 ${
                          selectedPropertyType === type.value 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/80 hover:text-white'
                        }`}
                        onClick={() => handlePropertyTypeSelect(type.value)}
                        type="button"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Search */}
              <div className="relative flex-grow max-w-72 md:max-w-lg">
                <div className="relative flex items-center w-full bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg h-10">
                  <span className="material-symbols-outlined absolute left-4 text-white/60">
                    search
                  </span>
                  <input
                    className="w-full bg-transparent text-white placeholder:text-white/60 border-0 focus:ring-0 focus:outline-none pl-12 pr-4 py-2.5 text-sm rounded-full cursor-pointer"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search by city, building or community"
                    type="text"
                  />
                </div>
              </div>

              {/* Show Map Button */}
              <button className="bg-primary text-white font-bold px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center shadow-lg whitespace-nowrap cursor-pointer h-10">
                <span className="material-symbols-outlined mr-2">map</span>
                <span>Show Map</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertySearchSection;
