import React from "react";

const PropertyGallerySection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8 h-screen">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Property Gallery
        </h2>
        <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
          <div
            className="col-span-2 row-span-2 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80")`,
            }}
          />
          <div
            className="col-span-2 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80")`,
            }}
          />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
            }}
          />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default PropertyGallerySection;
