import React, { useState, useMemo } from 'react';
import { Project } from '../types/project';
import { ProjectFilters, FilterCategory } from '../components/ProjectFilters';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectListView } from '../components/ProjectListView';
import { ProjectSkeleton } from '../components/ProjectSkeleton';
import { Layers, RefreshCw, Github, AlertTriangle } from 'lucide-react';
import { GITHUB_USERNAME } from '../services/github';

interface ProjectsPageProps {
  projects: Project[];
  loading: boolean;
  onSelectProject: (project: Project) => void;
  onRefresh: () => void;
  lastUpdated?: string;
  error?: string;
  usingFallback?: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  loading,
  onSelectProject,
  onRefresh,
  lastUpdated,
  error,
  usingFallback,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'newest' | 'oldest' | 'stars'>('updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dynamically compute category filters based on available projects
  const dynamicCategories = useMemo<FilterCategory[]>(() => {
    const base: FilterCategory[] = [{ label: 'All', value: 'All' }];

    const hasFeatured = projects.some(p => p.featured);
    if (hasFeatured) {
      base.push({ label: 'Featured', value: 'Featured' });
    }

    const availableCats = new Set<string>();
    projects.forEach(p => {
      if (p.category) availableCats.add(p.category);
    });

    ['Web', 'Web App', 'Game', 'App', 'Tool', 'Experiment'].forEach(cat => {
      if (availableCats.has(cat)) {
        base.push({ 
          label: cat === 'Web App' ? 'Web Apps' : cat === 'Game' ? 'Games' : cat === 'App' ? 'Apps' : cat === 'Tool' ? 'Tools' : cat === 'Experiment' ? 'Experiments' : cat, 
          value: cat 
        });
      }
    });

    return base;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Category filter
    if (selectedCategory === 'Featured') {
      result = result.filter(p => p.featured);
    } else if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter (against name, description, topics, language)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.primaryLanguage && p.primaryLanguage.toLowerCase().includes(q)) ||
        p.topics.some(t => t.toLowerCase().includes(q)) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'updated') {
      result.sort((a, b) => new Date(b.updatedAt || b.pushedAt).getTime() - new Date(a.updatedAt || a.pushedAt).getTime());
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'stars') {
      result.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }

    return result;
  }, [projects, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full py-8 sm:py-12 animate-fadeIn">
      {/* Page Header */}
      <div className="mb-6 space-y-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <Layers className="w-3.5 h-3.5" />
            <span>GitHub Sync</span>
            <span>·</span>
            <span>@{GITHUB_USERNAME}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-1">
            Projects Archive
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-1">
            All public projects tagged with <code className="font-mono bg-slate-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.5 rounded text-xs">portfolio</code> on GitHub.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
          {lastUpdated && (
            <span className="text-neutral-400 hidden sm:inline">
              Updated {lastUpdated}
            </span>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-neutral-800 dark:border-neutral-800 dark:bg-[#121417] dark:text-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync GitHub</span>
          </button>
        </div>
      </div>

      {/* Optional Warning/Notice Banner if API is limited or using fallback */}
      {error && (
        <div className="mb-6 p-3.5 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">GitHub API Notice: {error}</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
              Displaying cached projects. Hit "Sync GitHub" to re-check the API.
            </div>
          </div>
        </div>
      )}

      {/* Filter, Search & Sort Bar */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={dynamicCategories}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={projects.length}
        filteredCount={filteredProjects.length}
      />

      {/* Projects Grid / List View */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-[#121417]/40">
          <p className="text-sm text-neutral-500 font-mono mb-3">
            No projects found matching the filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      ) : (
        <ProjectListView
          projects={filteredProjects}
          onSelect={onSelectProject}
        />
      )}
    </div>
  );
};
