import React from "react";

const ExploreAreasSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-8 min-h-screen sm:h-screen">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Explore Dubai&apos;s Top Areas
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-6 flex-1">
          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Downtown Dubai
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Iconic skyscrapers and vibrant city life.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Dubai Marina
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Waterfront living with stunning views.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Palm Jumeirah
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Exclusive villas and resorts.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Jumeirah Beach Residence
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Beachfront apartments and leisure.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Business Bay
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Modern business district with luxury towers.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-2 h-full">
            <div className="h-48 sm:h-3/4 w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Jumeirah Village Circle
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Family-friendly community with modern amenities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreAreasSection;
