import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCw, 
  BookOpen, 
  Tag, 
  Github, 
  PenTool,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types/article';
import { ArticleCard } from '../components/ArticleCard';
import { GITHUB_PROFILE_URL } from '../constants';

interface WritingPageProps {
  articles: Article[];
  loading: boolean;
  onSelectArticle: (article: Article) => void;
  onRefresh: () => void;
  lastUpdated?: string;
  error?: string;
  usingFallback?: boolean;
}

export const WritingPage: React.FC<WritingPageProps> = ({
  articles,
  loading,
  onSelectArticle,
  onRefresh,
  lastUpdated,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'stars'>('newest');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => {
      a.tags.forEach(t => set.add(t));
    });
    return ['All', ...Array.from(set)];
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        // Tag filter
        if (selectedTag !== 'All' && !article.tags.includes(selectedTag)) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = article.title.toLowerCase().includes(q);
          const matchDesc = article.description.toLowerCase().includes(q);
          const matchTags = article.tags.some(t => t.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return (b.stars || 0) - (a.stars || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        }
        // Default: newest
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [articles, selectedTag, searchQuery, sortBy]);

  return (
    <div className="w-full py-8 sm:py-12 animate-fadeIn space-y-10">
      {/* Page Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span className="uppercase tracking-wider">Engineering Notes & Thoughts</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Posts
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              Articles, engineering notes, architectural reflections, and technical deep dives.
            </p>
          </div>

          {/* Sync Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {lastUpdated && (
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                Synced {lastUpdated}
              </span>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 text-xs font-mono transition-colors disabled:opacity-50 shadow-sm"
              title="Refresh posts feed"
            >
              <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-500' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800/80">
        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Input & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="stars">Most Starred</option>
          </select>
        </div>
      </div>

      {/* Posts Grid / List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map(i => (
            <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-[#121417]/50 space-y-4 animate-pulse">
              <div className="h-4 w-1/4 bg-slate-200 dark:bg-neutral-800 rounded" />
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-neutral-800 rounded" />
              <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800/60 rounded" />
            </div>
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
            />
          ))}
        </div>
      ) : (
        <div className="p-10 sm:p-14 text-center border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl space-y-3 bg-white/40 dark:bg-[#121417]/30">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-neutral-900 flex items-center justify-center mx-auto text-neutral-500 dark:text-neutral-400">
            <PenTool className="w-6 h-6 text-sky-500" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              No posts published yet
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Check back soon for new articles, case studies, and engineering explorations.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Explore GitHub Repositories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
