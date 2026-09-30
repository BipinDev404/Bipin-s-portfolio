import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, FolderGit2, BookOpen } from 'lucide-react';
import { Project } from '../types/project';
import { Article } from '../types/article';
import { STATUS_CONFIG } from '../data/projects';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  articles?: Article[];
  onSelectProject: (project: Project) => void;
  onSelectArticle?: (article: Article) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  projects,
  articles = [],
  onSelectProject,
  onSelectArticle,
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

  const q = query.toLowerCase().trim();

  const filteredProjects = projects.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    );
  });

  const filteredArticles = articles.filter((a) => {
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  type CombinedItem = 
    | { type: 'project'; data: Project }
    | { type: 'article'; data: Article };

  const combinedResults: CombinedItem[] = [
    ...filteredProjects.map(p => ({ type: 'project' as const, data: p })),
    ...filteredArticles.map(a => ({ type: 'article' as const, data: a }))
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, combinedResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedResults.length) % Math.max(1, combinedResults.length));
    } else if (e.key === 'Enter' && combinedResults[selectedIndex]) {
      e.preventDefault();
      const item = combinedResults[selectedIndex];
      if (item.type === 'project') {
        onSelectProject(item.data);
      } else if (item.type === 'article' && onSelectArticle) {
        onSelectArticle(item.data);
      }
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
            placeholder="Search projects, writing, articles, tech..."
            className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono text-neutral-500 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 dark:divide-neutral-900">
          {combinedResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500 font-mono">
              No matching results found for "{query}"
            </div>
          ) : (
            combinedResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              if (item.type === 'project') {
                const proj = item.data;
                const statusInfo = STATUS_CONFIG[proj.status] || {
                  label: proj.status,
                  dotClass: 'bg-neutral-400',
                  textClass: 'text-neutral-500 dark:text-neutral-400',
                };

                return (
                  <div
                    key={`proj-${proj.id}`}
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
                        <FolderGit2 className="w-4 h-4 text-sky-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{proj.name}</span>
                          <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">· Project ({proj.category})</span>
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
              }

              // Article Item
              const art = item.data;
              return (
                <div
                  key={`art-${art.id}`}
                  onClick={() => {
                    if (onSelectArticle) onSelectArticle(art);
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
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">{art.title}</span>
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">· Post</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{art.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                    <span className="text-[11px] text-neutral-400">{art.readingTime}</span>
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
          <span>{combinedResults.length} items</span>
        </div>
      </div>
    </div>
  );
};
