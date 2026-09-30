import React from 'react';
import { ArrowUpRight, BookOpen, Calendar, Clock, Github, Sparkles } from 'lucide-react';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article
      onClick={() => onSelect(article)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(article);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Read post: ${article.title}`}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-neutral-800/90 dark:bg-[#121417]/70 dark:hover:border-neutral-600 dark:hover:bg-[#16181d] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 shadow-sm"
    >
      <div className="space-y-3">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{formattedDate}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>{article.readingTime || '4 min read'}</span>
          </div>

          {article.featured && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            </>
          )}
        </div>

        {/* Title & Arrow */}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-white transition-colors leading-snug">
            {article.title}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
        </div>

        {/* Excerpt / Description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* Footer: Tags & Repo Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-neutral-800/60 flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={tag} 
              className="text-neutral-600 dark:text-neutral-400"
            >
              #{tag}{idx < Math.min(article.tags.length, 3) - 1 ? ' ' : ''}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
          <span>Read Post</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};
