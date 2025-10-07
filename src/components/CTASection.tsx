import React from "react";

const CTASection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col items-center justify-center gap-6 rounded-xl border border-zinc-200/80 bg-background-light p-10 text-center shadow-sm dark:border-zinc-800/80 dark:bg-background-dark mx-4 my-8 sm:mx-6 lg:mx-8">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900">
          Ready to Find Your Dream Home?
        </h2>
        <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Browse our exclusive listings and discover the finest properties in
          Dubai. Your journey to luxury living starts here.
        </p>
        <button className="rounded-lg bg-primary px-8 py-3 font-bold text-zinc-900 transition-transform hover:scale-105">
          Explore Our Properties
        </button>
      </section>
    </div>
  );
};

export default CTASection;
