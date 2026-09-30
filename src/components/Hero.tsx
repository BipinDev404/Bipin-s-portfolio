import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  projectCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, projectCount }) => {
  return (
    <section aria-label="Introduction" className="w-full pt-8 pb-12 sm:pt-14 sm:pb-16">
      <div className="max-w-3xl space-y-4 text-left">
        {/* Subtle Status Line */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span>Independent Software Builder</span>
          <span className="text-neutral-400 dark:text-neutral-600">·</span>
          <span>{projectCount} Projects Cataloged</span>
        </div>

        {/* Minimal Hero Statement */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
          Hi, I'm Bipin.
          <span className="block text-neutral-500 dark:text-neutral-400 font-normal mt-1 text-2xl sm:text-3xl md:text-4xl">
            Developer who builds useful things for the web.
          </span>
        </h1>

        {/* Short explanation */}
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
          This site is a personal software archive and collection of web applications, interactive games, developer utilities, and product experiments I have designed and built.
        </p>

        {/* Scroll affordance */}
        <div className="pt-2">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group cursor-pointer"
          >
            <span>Explore projects</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
