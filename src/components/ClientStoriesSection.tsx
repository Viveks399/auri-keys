import React from "react";
import Image from "next/image";

const ClientStoriesSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Client Stories
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <Image
                alt="Sophia Carter"
                className="h-12 w-12 rounded-full object-cover"
                src="https://ui-avatars.com/api/?name=Sophia+Carter&background=random&color=fff&size=48"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold text-zinc-900">Sophia Carter</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  15 Aug 2023
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              &quot;Auri Keys helped me find the perfect apartment in Downtown
              Dubai. Their expertise and personalized service were
              exceptional.&quot;
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <Image
                alt="Ethan Bennett"
                className="h-12 w-12 rounded-full object-cover"
                src="https://ui-avatars.com/api/?name=Ethan+Bennett&background=random&color=fff&size=48"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold text-zinc-900">Ethan Bennett</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  22 Jul 2023
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              &quot;I was impressed with their knowledge of the market and their
              ability to find a property that exceeded my expectations.&quot;
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200/80 bg-background-light p-6 shadow-sm dark:border-zinc-800/80 dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <Image
                alt="Olivia Hayes"
                className="h-12 w-12 rounded-full object-cover"
                src="https://ui-avatars.com/api/?name=Olivia+Hayes&background=random&color=fff&size=48"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold text-zinc-900">Olivia Hayes</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  10 Jun 2023
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-primary">
                star
              </span>
              <span className="material-symbols-outlined text-xl text-zinc-300 dark:text-zinc-600">
                star
              </span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">
              &quot;Auri Keys provided valuable insights and guidance throughout
              the process. I&apos;m very happy with my new home.&quot;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientStoriesSection;
