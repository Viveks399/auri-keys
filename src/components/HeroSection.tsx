"use client";

import { useState } from "react";
import RotatingText from "@/components/RotatingText";

// Custom Dropdown Component with smooth animations
const AnimatedDropdown = ({
  options,
  selectedValue,
  onSelect,
}: {
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
        className="appearance-none bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer w-full text-left flex items-center justify-between text-sm font-semibold shadow-xl hover:bg-white/20 transition-all duration-300"
      >
        <span>{selectedValue}</span>
        <svg
          className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl overflow-hidden z-50 transition-all duration-300 ease-out shadow-2xl ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left text-white hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-300 transform cursor-pointer font-medium ${
                selectedValue === option ? "bg-white/25 backdrop-blur-sm" : ""
              } ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
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
  const [selectedOption, setSelectedOption] = useState<"buy" | "rent">("buy");
  const [selectedPropertyType, setSelectedPropertyType] = useState("Apartment");

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/images/landing page/main-landing-image.avif')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 font-display leading-tight">
            Find Your Dream{" "}
            <RotatingText
              texts={["Address", "Lifestyle", "Home"]}
              mainClassName="inline-block"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display relative"
              transition={(index) => {
                const currentText =
                  ["Address", "Lifestyle", "Home"][index] || "";
                if (currentText === "Home") {
                  return {
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    mass: 2,
                  };
                }
                return { type: "spring", damping: 30, stiffness: 400 };
              }}
              rotationInterval={2500}
            />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover luxury properties in Dubai&apos;s most prestigious
            locations
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-4xl mx-auto">
          {/* Buy/Rent Toggle */}
          <div className="bg-white/15 backdrop-blur-md rounded-full border border-white/20 p-1 shadow-lg flex items-center gap-1 draggable-filter cursor-grab">
            <button
              onClick={() => setSelectedOption("buy")}
              className={`px-4 py-1 text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                selectedOption === "buy"
                  ? "bg-yellow-500 text-gray-900 shadow-lg scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedOption("rent")}
              className={`px-4 py-1 text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                selectedOption === "rent"
                  ? "bg-yellow-500 text-gray-900 shadow-lg scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Rent
            </button>
          </div>

          {/* Property Type Dropdown */}
          <div className="relative draggable-filter cursor-grab">
            <AnimatedDropdown
              options={["Apartment", "Villa", "Townhouse", "Penthouse"]}
              selectedValue={selectedPropertyType}
              onSelect={setSelectedPropertyType}
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-grow max-w-lg draggable-filter cursor-grab">
            <div className="relative flex items-center w-full bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <input
                className="w-full bg-transparent text-white placeholder:text-white/60 border-0 focus:ring-0 pl-4 pr-12 py-2 text-sm rounded-full"
                placeholder="Search by city, building or community..."
                type="text"
                disabled
              />
              <span className="material-symbols-outlined absolute right-4 text-white/70 text-xl cursor-pointer">
                location_on
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-primary text-white font-bold py-2.5 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center shadow-lg whitespace-nowrap">
            <span className="material-symbols-outlined mr-2">search</span>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
