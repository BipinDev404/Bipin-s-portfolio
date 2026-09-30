import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { STATUS_CONFIG } from '../data/projects';

interface ProjectListViewProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export const ProjectListView: React.FC<ProjectListViewProps> = ({ projects, onSelect }) => {
  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white dark:border-neutral-800 dark:divide-neutral-800/80 dark:bg-[#121417]/50 shadow-sm">
      {projects.map((project) => {
        const statusInfo = STATUS_CONFIG[project.status] || {
          label: project.status,
          dotClass: 'bg-neutral-400',
          textClass: 'text-neutral-500 dark:text-neutral-400',
        };

        return (
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            className="group p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer transition-colors dark:hover:bg-neutral-800/40"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2.5">
                <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-200 flex items-center gap-1.5">
                  {project.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500" />
                </h4>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                  <span className={`text-[11px] font-mono ${statusInfo.textClass}`}>{statusInfo.label}</span>
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 justify-between md:justify-end text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                {project.technologies.slice(0, 3).map((t, idx) => (
                  <span key={t}>
                    {t}{idx < Math.min(project.technologies.length, 3) - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-500 text-[11px]">{project.category} · {project.year}</span>
                
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-neutral-400 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                      title="Live Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
