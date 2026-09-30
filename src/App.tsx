import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/CommandMenu';
import { GitHubImageGuideModal } from './components/GitHubImageGuideModal';
import { getPortfolioRepositories, GITHUB_USERNAME } from './services/github';
import { Project } from './types/project';

export function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<{ path: string; slug?: string }>({ path: '/' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isImageGuideOpen, setIsImageGuideOpen] = useState(false);
  
  // GitHub Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Fetch GitHub repositories
  const fetchProjects = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await getPortfolioRepositories(forceRefresh);
      setProjects(result.projects);
      setLastUpdated(result.lastUpdated);
      setUsingFallback(!!result.usingFallback);
      if (result.error) {
        setError(result.error);
      }
    } catch (err: any) {
      console.error('Failed to load GitHub portfolio:', err);
      setError(err.message || 'Could not load GitHub projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Sync browser back/forward and initial path
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/projects/')) {
        const slug = pathname.replace('/projects/', '').replace('/', '');
        setCurrentRoute({ path: '/projects/:slug', slug });
      } else if (pathname === '/projects') {
        setCurrentRoute({ path: '/projects' });
      } else if (pathname === '/about') {
        setCurrentRoute({ path: '/about' });
      } else if (pathname === '/contact') {
        setCurrentRoute({ path: '/contact' });
      } else {
        setCurrentRoute({ path: '/' });
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update Page Title
  useEffect(() => {
    if (currentRoute.path === '/projects/:slug' && currentRoute.slug) {
      const p = projects.find(item => item.slug.toLowerCase() === currentRoute.slug?.toLowerCase() || item.id.toLowerCase() === currentRoute.slug?.toLowerCase());
      if (p) {
        document.title = `${p.name} — ${GITHUB_USERNAME} Project Showcase`;
      }
    } else if (currentRoute.path === '/projects') {
      document.title = `Projects Archive — ${GITHUB_USERNAME}`;
    } else if (currentRoute.path === '/about') {
      document.title = `About & Craft — ${GITHUB_USERNAME}`;
    } else if (currentRoute.path === '/contact') {
      document.title = `Contact — ${GITHUB_USERNAME}`;
    } else {
      document.title = `${GITHUB_USERNAME} — GitHub-Powered Project Portfolio`;
    }
  }, [currentRoute, projects]);

  const navigateTo = (path: string, slug?: string) => {
    let targetUrl = '/';
    let newRoute: { path: string; slug?: string } = { path: '/' };

    if (path === 'home' || path === '/') {
      targetUrl = '/';
      newRoute = { path: '/' };
    } else if (path === 'projects' || path === '/projects') {
      targetUrl = '/projects';
      newRoute = { path: '/projects' };
    } else if (path === 'about' || path === '/about') {
      targetUrl = '/about';
      newRoute = { path: '/about' };
    } else if (path === 'contact' || path === '/contact') {
      targetUrl = '/contact';
      newRoute = { path: '/contact' };
    } else if ((path === '/projects/:slug' || path === 'project-detail') && slug) {
      targetUrl = `/projects/${slug}`;
      newRoute = { path: '/projects/:slug', slug };
    }

    window.history.pushState({}, '', targetUrl);
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    navigateTo('/projects/:slug', project.slug);
  };

  const handleBackToProjects = () => {
    navigateTo('/projects');
  };

  // Active Project for Detail Page
  const currentProject = useMemo(() => {
    if (currentRoute.path === '/projects/:slug' && currentRoute.slug) {
      return projects.find(p => p.slug.toLowerCase() === currentRoute.slug?.toLowerCase() || p.id.toLowerCase() === currentRoute.slug?.toLowerCase());
    }
    return null;
  }, [currentRoute, projects]);

  // Determine active section for Top Bar indicators
  const activeNavSection = useMemo(() => {
    if (currentRoute.path.startsWith('/projects')) return 'projects';
    if (currentRoute.path === '/about') return 'about';
    if (currentRoute.path === '/contact') return 'contact';
    return 'home';
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-slate-900 dark:bg-[#0c0d0e] dark:text-[#ededed] bg-grid-pattern transition-colors duration-200">
      {/* Top Bar with distinct page links, search icon, screenshot guide, and theme switch */}
      <Navbar
        activeSection={activeNavSection}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenImageGuide={() => setIsImageGuideOpen(true)}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {currentRoute.path === '/' && (
          <HomePage
            projects={projects}
            loading={loading}
            onSelectProject={handleSelectProject}
            onNavigate={navigateTo}
            onRefresh={() => fetchProjects(true)}
            lastUpdated={lastUpdated}
            usingFallback={usingFallback}
          />
        )}

        {currentRoute.path === '/projects' && (
          <ProjectsPage
            projects={projects}
            loading={loading}
            onSelectProject={handleSelectProject}
            onRefresh={() => fetchProjects(true)}
            lastUpdated={lastUpdated}
            error={error}
            usingFallback={usingFallback}
          />
        )}

        {currentRoute.path === '/projects/:slug' && (
          currentProject ? (
            <ProjectDetail
              project={currentProject}
              onBack={handleBackToProjects}
              onSelectProject={handleSelectProject}
              allProjects={projects}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Project Not Found
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                The requested repository could not be found in your GitHub portfolio topics.
              </p>
              <button
                onClick={handleBackToProjects}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-semibold"
              >
                Back to Projects
              </button>
            </div>
          )
        )}

        {currentRoute.path === '/about' && (
          <AboutPage
            onNavigate={navigateTo}
          />
        )}

        {currentRoute.path === '/contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Minimal Footer */}
      <Footer />

      {/* Global Command / Search Modal */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
      />

      {/* GitHub Screenshot Guide Modal */}
      <GitHubImageGuideModal
        isOpen={isImageGuideOpen}
        onClose={() => setIsImageGuideOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
