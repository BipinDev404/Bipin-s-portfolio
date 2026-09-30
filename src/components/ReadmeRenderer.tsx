import React, { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { BookOpen, FileText, Check, Copy } from 'lucide-react';

interface ReadmeRendererProps {
  content: string;
  className?: string;
  repoName?: string;
}

export const ReadmeRenderer: React.FC<ReadmeRendererProps> = ({ 
  content, 
  className = '',
  repoName
}) => {
  const [copiedRaw, setCopiedRaw] = React.useState(false);

  const sanitizedHtml = useMemo(() => {
    if (!content) return '';

    // Configure marked for full GFM support
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    const rawHtml = marked.parse(content) as string;

    // Sanitize with DOMPurify while allowing clean tags
    return DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_TAGS: ['iframe', 'kbd', 'summary', 'details'],
      ADD_ATTR: ['target', 'rel', 'loading', 'align', 'width', 'height', 'open'],
    });
  }, [content]);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(content);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  if (!content) {
    return (
      <div className="p-8 text-center border border-dashed border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-mono text-neutral-500">
        No README documentation available for this repository.
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Readme Card Container with GFM styling */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121417]/90 shadow-sm overflow-hidden">
        {/* Readme Header Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-neutral-800/80 bg-slate-50/80 dark:bg-[#0e1013] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <BookOpen className="w-4 h-4 text-neutral-500" />
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {repoName ? `${repoName} / README.md` : 'README.md'}
            </span>
          </div>

          <button
            onClick={handleCopyRaw}
            title="Copy raw markdown content"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-2.5 py-1 rounded bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors"
          >
            {copiedRaw ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Raw</span>
              </>
            )}
          </button>
        </div>

        {/* Readme Rendered HTML Content */}
        <div 
          className="p-5 sm:p-8 readme-content overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </div>
  );
};
