import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { WritingPage } from './pages/WritingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectDetail } from './components/ProjectDetail';
import { ArticleDetail } from './components/ArticleDetail';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/CommandMenu';
import { getPortfolioRepositories, getBlogArticles } from './services/github';
import { GITHUB_USERNAME } from './constants';
import { Project } from './types/project';
import { Article } from './types/article';

export function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<{ path: string; slug?: string }>({ path: '/' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // GitHub Projects Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [projectError, setProjectError] = useState<string | undefined>();
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // GitHub Articles / Posts Data State
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(true);
  const [articleLastUpdated, setArticleLastUpdated] = useState<string>('');
  const [articleError, setArticleError] = useState<string | undefined>();

  // Fetch GitHub repositories for Projects
  const fetchProjects = useCallback(async (forceRefresh = false) => {
    setLoadingProjects(true);
    setProjectError(undefined);
    try {
      const result = await getPortfolioRepositories(forceRefresh);
      setProjects(result.projects);
      setLastUpdated(result.lastUpdated);
      setUsingFallback(!!result.usingFallback);
      if (result.error) {
        setProjectError(result.error);
      }
    } catch (err: any) {
      console.error('Failed to load GitHub portfolio:', err);
      setProjectError(err.message || 'Could not load GitHub projects');
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch GitHub repositories for Posts / Articles
  const fetchArticles = useCallback(async (forceRefresh = false) => {
    setLoadingArticles(true);
    setArticleError(undefined);
    try {
      const result = await getBlogArticles(forceRefresh);
      setArticles(result.articles);
      setArticleLastUpdated(result.lastUpdated);
      if (result.error) {
        setArticleError(result.error);
      }
    } catch (err: any) {
      console.error('Failed to load GitHub posts:', err);
      setArticleError(err.message || 'Could not load GitHub posts');
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchArticles();
  }, [fetchProjects, fetchArticles]);

  // Sync browser back/forward and initial path
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/projects/')) {
        const slug = pathname.replace('/projects/', '').replace('/', '');
        setCurrentRoute({ path: '/projects/:slug', slug });
      } else if (pathname === '/projects') {
        setCurrentRoute({ path: '/projects' });
      } else if (pathname.startsWith('/posts/')) {
        const slug = pathname.replace('/posts/', '').replace('/', '');
        setCurrentRoute({ path: '/posts/:slug', slug });
      } else if (pathname.startsWith('/writing/')) {
        const slug = pathname.replace('/writing/', '').replace('/', '');
        setCurrentRoute({ path: '/posts/:slug', slug });
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').replace('/', '');
        setCurrentRoute({ path: '/posts/:slug', slug });
      } else if (pathname === '/posts' || pathname === '/writing' || pathname === '/blog') {
        setCurrentRoute({ path: '/posts' });
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
    } else if (currentRoute.path === '/posts/:slug' && currentRoute.slug) {
      const a = articles.find(item => item.slug.toLowerCase() === currentRoute.slug?.toLowerCase() || item.id.toLowerCase() === currentRoute.slug?.toLowerCase());
      if (a) {
        document.title = `${a.title} — ${GITHUB_USERNAME} Posts`;
      }
    } else if (currentRoute.path === '/projects') {
      document.title = `Projects Archive — ${GITHUB_USERNAME}`;
    } else if (currentRoute.path === '/posts') {
      document.title = `Posts & Notes — ${GITHUB_USERNAME}`;
    } else if (currentRoute.path === '/about') {
      document.title = `About & Craft — ${GITHUB_USERNAME}`;
    } else if (currentRoute.path === '/contact') {
      document.title = `Contact — ${GITHUB_USERNAME}`;
    } else {
      document.title = `${GITHUB_USERNAME} — Developer Portfolio & Software Showcase`;
    }
  }, [currentRoute, projects, articles]);

  const navigateTo = (path: string, slug?: string) => {
    let targetUrl = '/';
    let newRoute: { path: string; slug?: string } = { path: '/' };

    if (path === 'home' || path === '/') {
      targetUrl = '/';
      newRoute = { path: '/' };
    } else if (path === 'projects' || path === '/projects') {
      targetUrl = '/projects';
      newRoute = { path: '/projects' };
    } else if (path === 'posts' || path === '/posts' || path === 'writing' || path === '/writing' || path === 'blog' || path === '/blog') {
      targetUrl = '/posts';
      newRoute = { path: '/posts' };
    } else if (path === 'about' || path === '/about') {
      targetUrl = '/about';
      newRoute = { path: '/about' };
    } else if (path === 'contact' || path === '/contact') {
      targetUrl = '/contact';
      newRoute = { path: '/contact' };
    } else if ((path === '/projects/:slug' || path === 'project-detail') && slug) {
      targetUrl = `/projects/${slug}`;
      newRoute = { path: '/projects/:slug', slug };
    } else if ((path === '/posts/:slug' || path === 'article-detail' || path === 'post-detail' || path === '/writing/:slug') && slug) {
      targetUrl = `/posts/${slug}`;
      newRoute = { path: '/posts/:slug', slug };
    }

    window.history.pushState({}, '', targetUrl);
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    navigateTo('/projects/:slug', project.slug);
  };

  const handleSelectArticle = (article: Article) => {
    navigateTo('/posts/:slug', article.slug);
  };

  const handleBackToProjects = () => {
    navigateTo('/projects');
  };

  const handleBackToWriting = () => {
    navigateTo('/posts');
  };

  // Active Project for Detail Page
  const currentProject = useMemo(() => {
    if (currentRoute.path === '/projects/:slug' && currentRoute.slug) {
      return projects.find(p => p.slug.toLowerCase() === currentRoute.slug?.toLowerCase() || p.id.toLowerCase() === currentRoute.slug?.toLowerCase());
    }
    return null;
  }, [currentRoute, projects]);

  // Active Article for Detail Page
  const currentArticle = useMemo(() => {
    if (currentRoute.path === '/posts/:slug' && currentRoute.slug) {
      return articles.find(a => a.slug.toLowerCase() === currentRoute.slug?.toLowerCase() || a.id.toLowerCase() === currentRoute.slug?.toLowerCase());
    }
    return null;
  }, [currentRoute, articles]);

  // Determine active section for Top Bar indicators
  const activeNavSection = useMemo(() => {
    if (currentRoute.path.startsWith('/projects')) return 'projects';
    if (currentRoute.path.startsWith('/posts') || currentRoute.path.startsWith('/writing') || currentRoute.path.startsWith('/blog')) return 'posts';
    if (currentRoute.path === '/about') return 'about';
    if (currentRoute.path === '/contact') return 'contact';
    return 'home';
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-slate-900 dark:bg-[#0c0d0e] dark:text-[#ededed] bg-grid-pattern transition-colors duration-200">
      {/* Top Bar with distinct page links, search icon, and theme switch */}
      <Navbar
        activeSection={activeNavSection}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {currentRoute.path === '/' && (
          <HomePage
            projects={projects}
            articles={articles}
            loading={loadingProjects}
            onSelectProject={handleSelectProject}
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
            onRefresh={() => { fetchProjects(true); fetchArticles(true); }}
            lastUpdated={lastUpdated}
            usingFallback={usingFallback}
          />
        )}

        {currentRoute.path === '/projects' && (
          <ProjectsPage
            projects={projects}
            loading={loadingProjects}
            onSelectProject={handleSelectProject}
            onRefresh={() => fetchProjects(true)}
            lastUpdated={lastUpdated}
            error={projectError}
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
                The requested repository could not be found.
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

        {currentRoute.path === '/posts' && (
          <WritingPage
            articles={articles}
            loading={loadingArticles}
            onSelectArticle={handleSelectArticle}
            onRefresh={() => fetchArticles(true)}
            lastUpdated={articleLastUpdated}
            error={articleError}
          />
        )}

        {currentRoute.path === '/posts/:slug' && (
          currentArticle ? (
            <ArticleDetail
              article={currentArticle}
              onBack={handleBackToWriting}
              onSelectArticle={handleSelectArticle}
              allArticles={articles}
            />
          ) : (
            <div className="py-20 text-center space-y-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Post Not Found
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                The requested post could not be found.
              </p>
              <button
                onClick={handleBackToWriting}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-semibold"
              >
                Back to Posts
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
        articles={articles}
        onSelectProject={handleSelectProject}
        onSelectArticle={handleSelectArticle}
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
