"use client";

import React from "react";
import RotatingText from "@/components/RotatingText";

const LuxuryEstatesHomepage: React.FC = () => {
  return (
    <div
      className="dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light h-screen relative z-10"
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
            Discover a curated selection of Dubai's most exclusive properties.
          </p>
        </div>

        {/* Services Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Buy Section */}
            <a
              className="group relative block overflow-hidden rounded-xl h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsRaqUX70uhH7yiYOIFlqfbMTFcj9gOXHI1B19gGTem3AdmCl5qswfXeRVWKdSrzSMwmQU_nu5uXlHfrpEQvyYWEEUUVOQHnmSl6Fd6xlXVeFqrkPkxAT-nRNouQVrrndKYrbtrNB-wFbeyLdZdK-hXGZ0bUkkTFCmCXENsyLHE_YXjHDVGHyHDWBnYee3vHUhSB-hpKmqtDfhFnxQkZ7l_AuOM9w7kMCYPlOf2RQTRnUVyGuHf3Uld6e-h1WgdcnxQa6J3ZTx1QtE")`,
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
              className="group relative block overflow-hidden rounded-xl h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjFHhlUKnQH2ddKL8KjePw8IytQo-BECI6MONaDKVPxElfHW70pflBwj8cTOmiJkNyUOcUxk4nYnPqaJ20oi8aZp9YGL7FGaCcpttrTWTe7zRd6cLytsnBk951Cy_qjfJHT0_7eijUAjpfK1g6Zt7UmAVh8tvTlh2p7ons2wU6kFVizSCyBZeVkWEbibl94hkhXYGR-Qp1-kdyX2ZI-GAUv_DtIGjcg72f-h9b8OBM7dBVAFQH_8Dalt1IyumrlGFPFR9pc1dsQglL")`,
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
              className="group relative block overflow-hidden rounded-xl h-120 shadow-lg"
              href="#"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6kjV7vJLeYQVcNdhnFKQKr8O46E5_E2RwTkCdTdw3phM4NROao_YI2yN8BffnO0OaahVQ-h0KVR8XHH6ExZJDifaTw8yDEKtYofkIA7hEXc8UX_fo7PZuLWYuVng8IkZwGOcx3gsvvjRMqgKXZw6fC19gsZfEHCtNMmAgJ5V4mIiTGUjeA9kpDCZguP-KMiTp-Lay9t0ocb9czlccE4RoXAZ-FoGqr9LwCB98Ovs_3PKMGIvEeqeVH3dDHCoVmuz5X6-qR42J2yed")`,
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
