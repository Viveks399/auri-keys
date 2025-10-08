"use client";

import React, { useState } from "react";

const PropertySearchSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/images/landing page/PropertySearchSection-background-image.avif')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/25"></div>

      <div className="relative flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto z-10">
            <div className="flex flex-col items-center text-center text-white mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                Explore with Auri Keys
              </h1>
              <p className="mt-2 text-base md:text-lg opacity-90 drop-shadow-sm">
                Visually pinpoint your perfect property
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {/* Buy/Rent Toggle */}
              <div className="bg-white/15 backdrop-blur-md rounded-full border border-white/20 p-1 shadow-lg flex items-center min-w-[120px] relative transition-all duration-300 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80 text-xl group-hover:opacity-0 transition-opacity duration-300">
                    swap_horiz
                  </span>
                </div>
                <button className="px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-full">
                  Buy
                </button>
                <button className="px-4 py-1 text-white/80 hover:text-white text-sm font-semibold rounded-full z-10 transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full">
                  Rent
                </button>
              </div>

              {/* Property Type Selector */}
              <div className="relative bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-white/80 text-xl group-hover:opacity-0 transition-opacity duration-300">
                    home
                  </span>
                </div>
                <select className="w-full bg-transparent text-white/80 border-0 focus:ring-0 focus:outline-none appearance-none cursor-pointer pl-4 pr-10 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <option
                    className="bg-background-dark text-white/80"
                    value="apartment"
                  >
                    Apartment
                  </option>
                  <option
                    className="bg-background-dark text-white/80"
                    value="villa"
                  >
                    Villa
                  </option>
                  <option
                    className="bg-background-dark text-white/80"
                    value="townhouse"
                  >
                    Townhouse
                  </option>
                  <option
                    className="bg-background-dark text-white/80"
                    value="penthouse"
                  >
                    Penthouse
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/80">
                  <span className="material-symbols-outlined text-base group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Location Search */}
              <div className="relative flex-grow max-w-lg">
                <div className="relative flex items-center w-full bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                  <span className="material-symbols-outlined absolute left-4 text-white/60">
                    search
                  </span>
                  <input
                    className="w-full bg-transparent text-white placeholder:text-white/60 border-0 focus:ring-0 pl-12 pr-4 py-2 text-sm rounded-full"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search by city, building or community"
                    type="text"
                  />
                </div>
              </div>

              {/* Show Map Button */}
              <button className="bg-primary text-white font-bold py-2.5 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center shadow-lg whitespace-nowrap">
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
