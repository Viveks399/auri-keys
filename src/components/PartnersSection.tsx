import React from "react";
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const PartnersSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
            Trusted Partners
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We work with industry leaders to bring you the finest properties and exceptional service.
          </p>
        </div>
        
        <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#f8f7f6"
            ariaLabel="Technology partners"
          />
        </div>
      </section>
    </div>
  );
};

export default PartnersSection;
