import React from 'react';
import { Github, Sun, Moon, Search, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { GITHUB_PROFILE_URL } from '../constants';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-neutral-800/80 dark:bg-[#0c0d0e]/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-sm"
        >
          <div className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-neutral-800 dark:text-neutral-100 flex items-center justify-center shadow-sm border border-neutral-800 dark:border-neutral-700/80">
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
            Bipin
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 pl-1 border-l border-slate-200 dark:border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Software Archive
          </span>
        </button>

        {/* Zone 2: Navigation Links for Separate Pages */}
        <nav className="flex items-center gap-5 sm:gap-8 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors relative py-1 ${
              activeSection === 'home'
                ? 'text-neutral-900 dark:text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Home
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
            )}
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className={`transition-colors relative py-1 ${
              activeSection === 'projects'
                ? 'text-neutral-900 dark:text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Projects
            {activeSection === 'projects' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
            )}
          </button>
          <button
            onClick={() => onNavigate('posts')}
            className={`transition-colors relative py-1 ${
              activeSection === 'posts' || activeSection === 'writing'
                ? 'text-neutral-900 dark:text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Posts
            {(activeSection === 'posts' || activeSection === 'writing') && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
            )}
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors relative py-1 ${
              activeSection === 'about'
                ? 'text-neutral-900 dark:text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            About
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
            )}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors relative py-1 ${
              activeSection === 'contact'
                ? 'text-neutral-900 dark:text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Contact
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 dark:bg-white rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Actions (Search Icon, Theme Toggle, GitHub Icon) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Icon button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search projects and posts"
            title="Search (⌘K)"
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 hover:text-amber-200 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700 hover:text-neutral-900 transition-colors" />
            )}
          </button>

          {/* GitHub Profile Link */}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            title="GitHub Profile (@BipinDev404)"
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
