import React from 'react';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { Project } from '../types/project';
import { STATUS_CONFIG } from '../data/projects';
import { ProjectImageShowcase } from './ProjectImageShowcase';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

// Format relative date nicely
function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    if (diffDays < 365) return `Updated ${Math.round(diffDays / 30)}mo ago`;
    return `Updated ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  } catch {
    return 'Updated recently';
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const statusInfo = STATUS_CONFIG[project.status] || {
    label: project.status,
    dotClass: 'bg-neutral-400',
    textClass: 'text-neutral-500 dark:text-neutral-400'
  };

  const updatedText = formatRelativeDate(project.updatedAt || project.pushedAt);

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-neutral-800/90 dark:bg-[#121417]/70 dark:hover:border-neutral-600 dark:hover:bg-[#16181d] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 shadow-sm"
    >
      <div>
        {/* Real Project Image Showcase Window */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-950 mb-4 dark:border-neutral-800/80 transition-transform duration-300 ease-out group-hover:scale-[1.015]">
          <ProjectImageShowcase project={project} variant="card" />

          {/* Subtle Hover Action Overlay Pill */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="flex items-center gap-1 text-[11px] font-medium bg-black/80 text-white px-2 py-1 rounded-md border border-white/20 backdrop-blur-sm shadow-md">
              Case Study <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Clean Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-800 dark:text-neutral-300">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
              <span className={statusInfo.textClass}>{statusInfo.label}</span>
            </div>
          </div>

          {project.stars > 0 && (
            <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Title & Arrow */}
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-white transition-colors flex items-center gap-1.5">
            {project.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </div>

        {/* One-line / short description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
          {project.description}
        </p>
      </div>

      {/* Footer: Clean Technologies List & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-neutral-800/60 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-1.5 truncate max-w-[65%]">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span key={tech}>
                {tech}
                {idx < Math.min(project.technologies.length, 3) - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>

          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
            {updatedText}
          </span>
        </div>

        {/* Action Buttons: Live Demo + GitHub */}
        <div className="flex items-center gap-2 pt-0.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onSelect(project)}
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 dark:text-neutral-200 text-xs font-medium transition-colors text-center"
          >
            View Project
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="py-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/50 text-xs font-medium transition-colors inline-flex items-center gap-1"
              title="Live Demo"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-neutral-800/90 dark:hover:bg-neutral-700 dark:text-neutral-300 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
