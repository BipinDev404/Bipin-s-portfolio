import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Project } from '../types/project';
import { STATUS_CONFIG } from '../data/projects';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = projects.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      onSelectProject(filtered[selectedIndex]);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121417] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-neutral-800/80 gap-3">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, technologies, categories..."
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono text-neutral-500 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-neutral-900">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500 font-mono">
              No matching projects found for "{query}"
            </div>
          ) : (
            filtered.map((proj, idx) => {
              const statusInfo = STATUS_CONFIG[proj.status] || {
                label: proj.status,
                dotClass: 'bg-neutral-400',
                textClass: 'text-neutral-500 dark:text-neutral-400',
              };
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-slate-100 text-neutral-900 dark:bg-neutral-800/80 dark:text-white' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 dark:bg-neutral-900 dark:border-neutral-700/60 flex items-center justify-center text-neutral-800 dark:text-neutral-300 shrink-0 font-mono text-xs font-bold">
                      {proj.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">{proj.name}</span>
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">· {proj.category}</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{proj.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                    <span className={`text-[11px] ${statusInfo.textClass}`}>{statusInfo.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#0d0e11] border-t border-slate-200 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Use ↑↓ to navigate</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
          <span>{filtered.length} projects</span>
        </div>
      </div>
    </div>
  );
};
