import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { STATUS_CONFIG } from '../data/projects';
import { ProjectImageShowcase } from './ProjectImageShowcase';

interface FeaturedProjectProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project, onSelect }) => {
  const statusInfo = STATUS_CONFIG[project.status] || {
    label: project.status,
    dotClass: 'bg-emerald-400',
    textClass: 'text-emerald-500 dark:text-emerald-400'
  };

  return (
    <section aria-labelledby="featured-project-heading" className="w-full mb-12 sm:mb-16">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
            Featured Highlight
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{project.year}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
          <span className={statusInfo.textClass}>{statusInfo.label}</span>
        </div>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 overflow-hidden transition-all duration-300 hover:border-slate-300 dark:border-neutral-800 dark:bg-[#111316]/90 dark:hover:border-neutral-700 shadow-sm dark:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left / Top: Real GitHub Image Preview */}
          <div 
            onClick={() => onSelect(project)}
            className="lg:col-span-7 aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-slate-950 cursor-pointer group dark:border-neutral-800/90"
          >
            <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.015]">
              <ProjectImageShowcase project={project} variant="hero" />
            </div>
          </div>

          {/* Right / Content Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.primaryLanguage || project.developmentType || 'GitHub Repository'}</span>
              </div>

              <h3 
                id="featured-project-heading"
                onClick={() => onSelect(project)}
                className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer transition-colors"
              >
                {project.name}
              </h3>

              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                {project.tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                Core Technologies
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.technologies.map(tech => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelect(project)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                View Case Study
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs sm:text-sm hover:border-slate-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs sm:text-sm hover:border-slate-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
