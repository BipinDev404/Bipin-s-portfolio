import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedProject } from '../components/FeaturedProject';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectSkeleton, FeaturedSkeleton } from '../components/ProjectSkeleton';
import { Project } from '../types/project';
import { ArrowRight, RefreshCw, Github, Info } from 'lucide-react';
import { GITHUB_USERNAME } from '../services/github';

interface HomePageProps {
  projects: Project[];
  loading: boolean;
  onSelectProject: (project: Project) => void;
  onNavigate: (page: string) => void;
  onRefresh: () => void;
  lastUpdated?: string;
  usingFallback?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  loading,
  onSelectProject,
  onNavigate,
  onRefresh,
  lastUpdated,
  usingFallback,
}) => {
  // Find featured projects (topics includes 'featured')
  const featuredProject = projects.find(p => p.featured);
  const displayProjects = projects.slice(0, 6);

  return (
    <div className="w-full pb-16 sm:pb-24 animate-fadeIn">
      {/* Minimal Hero */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('selected-projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        projectCount={projects.length}
      />

      {/* GitHub Auto-Sync Status Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white dark:border-neutral-800/80 dark:bg-[#121417]/60 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <Github className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
          <span>Source:</span>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-900 dark:text-neutral-100 hover:underline font-semibold"
          >
            @{GITHUB_USERNAME}
          </a>
          <span>·</span>
          <span>Topic: <code className="text-neutral-800 dark:text-neutral-200 font-bold bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">portfolio</code></span>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">
              Updated {lastUpdated}
            </span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            title="Refresh GitHub repositories"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-neutral-400' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton or Featured Project */}
      {loading ? (
        <FeaturedSkeleton />
      ) : (
        featuredProject && (
          <FeaturedProject
            project={featuredProject}
            onSelect={onSelectProject}
          />
        )
      )}

      {/* Selected Projects Showcase */}
      <section id="selected-projects" aria-labelledby="selected-projects-heading" className="w-full pt-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="selected-projects-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Selected Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
              Live web applications, tools, and repositories automatically curated from GitHub.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-colors group"
          >
            <span>View All ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid of Projects */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-[#121417]/40 space-y-3">
            <Info className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
              No projects tagged with 'portfolio' yet
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Add the topic <code className="bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono">portfolio</code> to any repository on your GitHub account to showcase it here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}

        {projects.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-[#121417] dark:text-neutral-200 dark:hover:bg-neutral-800/80 text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore All {projects.length} Projects in Archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Quick About & Contact Teaser */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/70 dark:border-neutral-800 dark:bg-[#121417]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            Looking for something specific?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Read about my development approach, tech stack, and background, or get in touch directly.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('about')}
            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-neutral-900 hover:bg-slate-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 text-xs font-medium transition-colors"
          >
            About Me
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold transition-colors"
          >
            Contact
          </button>
        </div>
      </section>
    </div>
  );
};
