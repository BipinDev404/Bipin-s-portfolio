import React from 'react';
import { Github, Mail, Globe, Code, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full max-w-4xl mx-auto py-16 sm:py-20 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
            About This Archive
          </span>
          <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-white dark:text-white light:text-neutral-900 mt-2">
            Engineering & Product Craft
          </h2>
        </div>

        <p className="text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed max-w-3xl">
          I'm a developer who enjoys turning ideas into working products. This website is a personal software archive—a collection of projects I've designed, engineered, experimented with, and shipped across the web.
        </p>

        <p className="text-sm sm:text-base text-neutral-400 dark:text-neutral-400 light:text-neutral-600 leading-relaxed max-w-3xl">
          My focus is on crafting clean user interfaces, intuitive interactions, and performant web architecture. Whether it's a student alert aggregator, real-time assessment platform, canvas game loop, or financial splitting utility, each project represents a focused effort to solve practical needs with clean code.
        </p>

        {/* Social / Connect Links */}
        <div id="contact" className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          <a
            href="https://github.com/bipin"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white transition-colors flex items-center gap-2 font-mono dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 light:bg-neutral-100 light:border-neutral-200 light:text-neutral-800"
          >
            <Github className="w-4 h-4" />
            <span>github.com/bipin</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>

          <a
            href="mailto:bipinonlyforfun@gmail.com"
            className="px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white transition-colors flex items-center gap-2 font-mono dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 light:bg-neutral-100 light:border-neutral-200 light:text-neutral-800"
          >
            <Mail className="w-4 h-4" />
            <span>bipinonlyforfun@gmail.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
