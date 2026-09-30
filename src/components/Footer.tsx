import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-white/60 py-10 transition-colors dark:border-neutral-800/80 dark:bg-[#0a0b0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-800 dark:text-neutral-300">
            Bipin
          </span>
          <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
          <span className="text-neutral-500 dark:text-neutral-400 font-sans">
            Built with curiosity and code.
          </span>
        </div>

        <div className="flex items-center gap-5 text-neutral-500 dark:text-neutral-400">
          <a
            href="https://github.com/BipinDev404"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:bipinonlyforfun@gmail.com"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-1.5 rounded bg-slate-100 border border-slate-200 hover:border-slate-300 text-neutral-600 hover:text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-600 dark:text-neutral-400 dark:hover:text-white transition-all ml-2"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
