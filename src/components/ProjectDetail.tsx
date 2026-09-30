import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Share2, 
  Check, 
  ArrowUpRight,
  Star,
  GitFork,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '../types/project';
import { STATUS_CONFIG } from '../data/projects';
import { ProjectImageShowcase } from './ProjectImageShowcase';
import { ProjectCard } from './ProjectCard';
import { ReadmeRenderer } from './ReadmeRenderer';
import { 
  getRepositoryReadme, 
  resolveRelativeMarkdownImages, 
  extractScreenshotsFromReadme 
} from '../services/github';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  allProjects?: Project[];
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onSelectProject,
  allProjects = []
}) => {
  const [copied, setCopied] = useState(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [loadingReadme, setLoadingReadme] = useState(true);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;

    async function loadReadme() {
      setLoadingReadme(true);
      try {
        const rawReadme = await getRepositoryReadme(project.repoName || project.id, project.defaultBranch || 'main');
        if (isMounted) {
          if (rawReadme && rawReadme.trim().length > 0) {
            const resolved = resolveRelativeMarkdownImages(rawReadme, project.repoName || project.id, project.defaultBranch || 'main');
            setReadme(resolved);
            
            // Extract any screenshot images from README
            const extracted = extractScreenshotsFromReadme(rawReadme, project.repoName || project.id, project.defaultBranch || 'main');
            setScreenshots(extracted);
          } else {
            // Generate structured markdown fallback
            const generated = `# ${project.name}

> ${project.tagline}

## Overview
${project.overview || project.description}

${project.features && project.features.length > 0 ? `## Key Features
${project.features.map(f => typeof f === 'string' ? `- **${f}**` : `- **${f.title}**: ${f.description}`).join('\n')}
` : ''}

${project.challengesAndLearnings && project.challengesAndLearnings.length > 0 ? `## Architecture & Development Notes
${project.challengesAndLearnings.map((n, i) => `${i + 1}. ${n}`).join('\n')}
` : ''}

## Technologies & Environment
- **Primary Language**: ${project.primaryLanguage || 'JavaScript / TypeScript'}
- **Core Stack**: ${project.technologies.join(', ')}
- **Category**: ${project.category}
- **Status**: ${project.status}

## Repository Links
- **Source Code**: [${project.githubUrl}](${project.githubUrl})
${project.liveUrl ? `- **Live Demo**: [${project.liveUrl}](${project.liveUrl})` : ''}
`;
            setReadme(generated);
            setScreenshots(project.screenshots || []);
          }
        }
      } catch (err) {
        console.warn('Error loading README:', err);
      } finally {
        if (isMounted) setLoadingReadme(false);
      }
    }

    loadReadme();
    return () => { isMounted = false; };
  }, [project.id, project.repoName, project.defaultBranch, project.overview, project.description, project.tagline, project.features, project.challengesAndLearnings, project.technologies, project.primaryLanguage, project.category, project.status, project.githubUrl, project.liveUrl, project.screenshots]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusInfo = STATUS_CONFIG[project.status] || {
    label: project.status,
    dotClass: 'bg-neutral-400',
    textClass: 'text-neutral-500 dark:text-neutral-400',
  };

  // Find 3 other related projects
  const relatedProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fadeIn">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-neutral-700"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all projects</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 dark:bg-neutral-900/60 dark:border-neutral-800/80 dark:hover:border-neutral-700"
          title="Copy project link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Case Study Header */}
      <header className="mb-8 space-y-4">
        {/* Unboxed Metadata Header (Zero-Pill Rule) */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {project.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
            <span className={statusInfo.textClass}>{statusInfo.label}</span>
          </div>
          {project.primaryLanguage && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-neutral-600 dark:text-neutral-400">{project.primaryLanguage}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg bg-neutral-900 text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs sm:text-sm hover:border-slate-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Large Hero Project Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 mb-12 dark:border-neutral-800">
        <ProjectImageShowcase project={project} variant="detail" />
      </div>

      {/* Structured Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Screenshots Gallery if available in README */}
          {screenshots.length > 0 && (
            <section aria-labelledby="screenshots-heading" className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  <h2 id="screenshots-heading" className="text-lg font-bold text-neutral-900 dark:text-white">
                    Repository Screenshots
                  </h2>
                </div>
                <span className="text-xs font-mono text-neutral-500">{screenshots.length} captured</span>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-950">
                <img
                  src={screenshots[selectedScreenshotIndex]}
                  alt={`${project.name} preview`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {screenshots.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                  {screenshots.map((src, idx) => (
                    <button
                      key={src}
                      onClick={() => setSelectedScreenshotIndex(idx)}
                      className={`h-14 w-24 rounded-lg overflow-hidden border shrink-0 transition-all ${
                        selectedScreenshotIndex === idx
                          ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-400'
                          : 'border-slate-200 dark:border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Section: README / Documentation */}
          <section aria-labelledby="readme-heading" className="space-y-3">
            {loadingReadme ? (
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-[#121417]/50 space-y-4 animate-pulse">
                <div className="h-7 w-1/3 bg-slate-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-full bg-slate-200 dark:bg-neutral-800/60 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-neutral-800/60 rounded" />
                <div className="h-4 w-4/6 bg-slate-200 dark:bg-neutral-800/60 rounded" />
              </div>
            ) : (
              <ReadmeRenderer 
                content={readme || ''} 
                repoName={project.repoName || project.name}
              />
            )}
          </section>
        </div>

        {/* Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* GitHub Spec & Statistics Box */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121417]/80 space-y-5 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase font-mono tracking-wider flex items-center justify-between">
              <span>Repository Spec</span>
              <Github className="w-4 h-4 text-neutral-500" />
            </h3>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center font-mono">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase">Stars</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{project.stars || 0}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase">Forks</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 flex items-center justify-center gap-1">
                  <GitFork className="w-3 h-3 text-neutral-400" />
                  <span>{project.forks || 0}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase">Issues</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5">
                  {project.openIssues || 0}
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div>
                <span className="text-neutral-500 font-mono block mb-1">Status</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
                  <span className={`font-medium ${statusInfo.textClass}`}>{statusInfo.label}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 font-mono block mb-1">Primary Language</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-mono font-medium">
                  {project.primaryLanguage || 'Not specified'}
                </span>
              </div>

              {project.license && (
                <div>
                  <span className="text-neutral-500 font-mono block mb-1">License</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-mono">
                    {project.license}
                  </span>
                </div>
              )}

              <div>
                <span className="text-neutral-500 font-mono block mb-1">Default Branch</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-mono">
                  {project.defaultBranch || 'main'}
                </span>
              </div>

              <div>
                <span className="text-neutral-500 font-mono block mb-1">Created / Updated</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-mono">
                  {project.year} · {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* GitHub Topics */}
            {project.topics && project.topics.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80">
                <span className="text-neutral-500 font-mono text-xs block mb-2">GitHub Topics</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 text-[11px]"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Links */}
            <div className="pt-4 border-t border-slate-200 dark:border-neutral-800/80 space-y-2">
              <span className="text-neutral-500 font-mono text-xs block mb-1">Links</span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-300 dark:hover:text-white flex items-center justify-between text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                    Live Homepage
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-300 dark:hover:text-white flex items-center justify-between text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-neutral-500" />
                    GitHub Repository
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom: "More Projects" (3 Related Projects) */}
      {relatedProjects.length > 0 && (
        <section aria-labelledby="more-projects-heading" className="mt-16 pt-10 border-t border-slate-200 dark:border-neutral-800/80">
          <div className="flex items-center justify-between mb-6">
            <h2 id="more-projects-heading" className="text-xl font-bold text-neutral-900 dark:text-white">
              More Projects
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              View full archive →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProjects.map(relProject => (
              <ProjectCard
                key={relProject.id}
                project={relProject}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
