"use client";

import React from "react";
import RotatingText from "@/components/RotatingText";

const LuxuryEstatesHomepage: React.FC = () => {
  return (
    <div
      className="dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light md:h-screen relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <main className="flex-grow flex flex-col h-full">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-center flex-shrink-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-background-dark dark:text-background-light mt-12">
            Find Your Dream{" "}
            <RotatingText
              texts={["Address", "Lifestyle", "Home"]}
              mainClassName="inline-block"
              staggerFrom="first"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              rotationInterval={3000}
              auto={true}
              loop={true}
              staggerDuration={0.05}
            />{" "}
            in Dubai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-background-dark/70 dark:text-background-light/70">
            Discover a curated selection of Dubai&apos;s most exclusive
            properties.
          </p>
        </div>

        {/* Services Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 flex-grow flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
            {/* Buy Section */}
            <a
              className="group relative block overflow-hidden rounded-xl h-60 md:h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-transparent" />
              <div className="relative flex flex-col h-full justify-end p-8 text-white">
                <span className="material-symbols-outlined text-5xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  real_estate_agent
                </span>
                <h2 className="text-3xl font-bold tracking-tight">Buy</h2>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm text-background-light/80">
                    Explore premium listings
                  </p>
                  <div className="mt-4 inline-flex items-center font-semibold text-primary">
                    <span>View Properties</span>
                    <span className="material-symbols-outlined ml-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Rent Section */}
            <a
              className="group relative block overflow-hidden rounded-xl h-60 md:h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-transparent" />
              <div className="relative flex flex-col h-full justify-end p-8 text-white">
                <span className="material-symbols-outlined text-5xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  villa
                </span>
                <h2 className="text-3xl font-bold tracking-tight">Rent</h2>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm text-background-light/80">
                    Find your ideal rental home
                  </p>
                  <div className="mt-4 inline-flex items-center font-semibold text-primary">
                    <span>Discover Rentals</span>
                    <span className="material-symbols-outlined ml-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Off-Plan Section */}
            <a
              className="group relative block overflow-hidden rounded-xl h-60 md:h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-transparent" />
              <div className="relative flex flex-col h-full justify-end p-8 text-white">
                <span className="material-symbols-outlined text-5xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  foundation
                </span>
                <h2 className="text-3xl font-bold tracking-tight">Off-Plan</h2>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm text-background-light/80">
                    Invest in the future
                  </p>
                  <div className="mt-4 inline-flex items-center font-semibold text-primary">
                    <span>Explore Projects</span>
                    <span className="material-symbols-outlined ml-1">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LuxuryEstatesHomepage;
