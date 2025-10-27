import React from "react";

const FeaturedPropertiesSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Exclusive Villa in Emirates Hills
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                5 Bedrooms | 6 Bathrooms | 8,000 sq ft
              </p>
            </div>
          </div>

          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Contemporary Apartment in Downtown Dubai
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                2 Bedrooms | 3 Bathrooms | 1,500 sq ft
              </p>
            </div>
          </div>

          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Luxury Penthouse in Dubai Marina
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                3 Bedrooms | 4 Bathrooms | 3,000 sq ft
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedPropertiesSection;
