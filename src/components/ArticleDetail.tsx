import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Github, 
  Calendar, 
  Clock, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';
import { Article } from '../types/article';
import { ReadmeRenderer } from './ReadmeRenderer';
import { getRepositoryReadme, resolveRelativeMarkdownImages, GITHUB_USERNAME } from '../services/github';
import { ArticleCard } from './ArticleCard';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles?: Article[];
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles = []
}) => {
  const [copied, setCopied] = useState(false);
  const [markdown, setMarkdown] = useState<string>(article.content || '');
  const [loading, setLoading] = useState<boolean>(!article.content);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;

    async function loadArticleMarkdown() {
      if (article.content) {
        setMarkdown(article.content);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const rawReadme = await getRepositoryReadme(article.repoName || article.id, article.defaultBranch || 'main');
        if (isMounted) {
          if (rawReadme && rawReadme.trim().length > 0) {
            const resolved = resolveRelativeMarkdownImages(rawReadme, article.repoName || article.id, article.defaultBranch || 'main');
            setMarkdown(resolved);
          } else {
            // Fallback content
            setMarkdown(`# ${article.title}\n\n${article.description}\n\n*Published on GitHub under @${GITHUB_USERNAME}/${article.repoName}.*`);
          }
        }
      } catch (err) {
        console.warn('Error fetching article markdown:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadArticleMarkdown();
    return () => { isMounted = false; };
  }, [article.id, article.repoName, article.defaultBranch, article.content, article.title, article.description]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const otherArticles = allArticles.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fadeIn">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-neutral-700"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all posts</span>
        </button>

        <div className="flex items-center gap-2">
          {article.githubUrl && (
            <a
              href={article.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-neutral-700"
              title="View source on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Source</span>
            </a>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-neutral-700"
            title="Copy article link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-10 space-y-4 pb-8 border-b border-slate-200 dark:border-neutral-800/80">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{formattedDate}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>{article.readingTime || '4 min read'}</span>
          </div>
          <span aria-hidden="true">·</span>
          <span>By Bipin</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="min-h-[300px]">
        {loading ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-[#121417]/50 space-y-4 animate-pulse">
            <div className="h-8 w-2/3 bg-slate-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800/60 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-neutral-800/60 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-neutral-800/60 rounded" />
          </div>
        ) : (
          <ReadmeRenderer 
            content={markdown}
            repoName={article.repoName}
          />
        )}
      </main>

      {/* Author Card Footer */}
      <div className="mt-14 p-6 rounded-2xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-[#111316] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-xs">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-neutral-900 dark:text-white text-sm">
            Written by Bipin
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Developer and builder exploring web architecture, TypeScript, UI systems, and browser game physics.
          </p>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shrink-0 hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Follow on GitHub</span>
        </a>
      </div>

      {/* More Articles */}
      {otherArticles.length > 0 && (
        <section className="mt-16 pt-10 border-t border-slate-200 dark:border-neutral-800/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Read Next
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              All posts →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherArticles.map(a => (
              <ArticleCard
                key={a.id}
                article={a}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
