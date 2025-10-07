import React from "react";

const AboutAuriSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            About Auri Keys
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Auri Keys is a premier luxury real estate agency specializing in
            Dubai&apos;s most exclusive properties. With a commitment to
            exceptional service and a deep understanding of the local market, we
            help discerning clients find their perfect home or investment.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <span className="material-symbols-outlined text-3xl text-primary">
              house
            </span>
            <div>
              <h3 className="font-bold text-zinc-900">Property Acquisition</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Finding your dream property.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <span className="material-symbols-outlined text-3xl text-primary">
              key
            </span>
            <div>
              <h3 className="font-bold text-zinc-900">Property Management</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Managing for optimal returns.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <span className="material-symbols-outlined text-3xl text-primary">
              paid
            </span>
            <div>
              <h3 className="font-bold text-zinc-900">Investment Advisory</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Expert real estate advice.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <span className="material-symbols-outlined text-3xl text-primary">
              handshake
            </span>
            <div>
              <h3 className="font-bold text-zinc-900">Trusted Relationships</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Building long-term client relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAuriSection;
