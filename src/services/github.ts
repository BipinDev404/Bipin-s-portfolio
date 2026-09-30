import { Project, ProjectCategory, ProjectStatus, GitHubRateLimitInfo } from '../types/project';

export const GITHUB_USERNAME = 'BipinDev404';
export const PORTFOLIO_TOPIC = 'portfolio';

const CACHE_KEY = `github_portfolio_${GITHUB_USERNAME}_v3`;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

interface GitHubRawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  archived: boolean;
  fork: boolean;
  size: number;
  license: { name: string; spdx_id: string } | null;
  owner: { login: string; avatar_url: string };
}

// Map topics to normalized Project Category
export function inferCategoryFromTopics(topics: string[] = [], primaryLanguage?: string | null): ProjectCategory {
  const lower = topics.map(t => t.toLowerCase());
  
  if (lower.some(t => ['game', 'games', 'gamedev', 'arcade'].includes(t))) return 'Game';
  if (lower.some(t => ['tool', 'tools', 'cli', 'utility', 'library', 'package'].includes(t))) return 'Tool';
  if (lower.some(t => ['experiment', 'experiments', 'prototype', 'audio', 'canvas', 'demo'].includes(t))) return 'Experiment';
  if (lower.some(t => ['app', 'apps', 'mobile', 'react-native', 'electron', 'desktop'].includes(t))) return 'App';
  if (lower.some(t => ['web-app', 'webapp', 'dashboard', 'saas', 'fullstack'].includes(t))) return 'Web App';
  if (lower.some(t => ['web', 'website', 'frontend', 'html', 'css', 'landing'].includes(t))) return 'Web';

  if (primaryLanguage) {
    if (['HTML', 'CSS', 'JavaScript', 'TypeScript'].includes(primaryLanguage)) return 'Web';
  }

  return 'Web App';
}

// Map topics & repo properties to Project Status
export function inferStatusFromRepo(repo: GitHubRawRepo): ProjectStatus {
  if (repo.archived) return 'Archived';
  
  const lower = (repo.topics || []).map(t => t.toLowerCase());
  if (lower.includes('archived')) return 'Archived';
  if (lower.includes('wip') || lower.includes('in-development') || lower.includes('dev')) return 'In Development';
  if (lower.includes('demo')) return 'Demo';
  if (lower.includes('live') || repo.homepage) return 'Live';

  return 'Live';
}

// Normalize repository name for clean UI title
export function formatProjectName(rawName: string): string {
  // If it's camelCase, kebab-case or snake_case, format into Title Case
  const words = rawName.split(/[-_]/);
  return words
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Transform raw GitHub repository into our Project model
export function transformGitHubRepo(repo: GitHubRawRepo): Project {
  const topics = repo.topics || [];
  const name = formatProjectName(repo.name);
  const category = inferCategoryFromTopics(topics, repo.language);
  const status = inferStatusFromRepo(repo);
  const isFeatured = topics.map(t => t.toLowerCase()).includes('featured');
  const createdDate = new Date(repo.created_at);

  // Normalize homepage URL
  let liveUrl: string | null = null;
  if (repo.homepage && repo.homepage.trim().length > 0) {
    liveUrl = repo.homepage.trim();
    if (!liveUrl.startsWith('http://') && !liveUrl.startsWith('https://')) {
      liveUrl = `https://${liveUrl}`;
    }
  }

  // Extract technology list from language + topics
  const techSet = new Set<string>();
  if (repo.language) techSet.add(repo.language);
  
  const techTopicKeywords = [
    'react', 'typescript', 'javascript', 'tailwind', 'tailwindcss', 
    'html', 'css', 'canvas', 'node', 'nodejs', 'express', 'firebase', 
    'nextjs', 'vite', 'graphql', 'postgres', 'python', 'rust', 'go',
    'vue', 'svelte', 'web-audio', 'webgl', 'threejs', 'indexeddb'
  ];

  topics.forEach(t => {
    const l = t.toLowerCase();
    if (techTopicKeywords.includes(l)) {
      techSet.add(t.charAt(0).toUpperCase() + t.slice(1));
    }
  });

  // Default tech tags if none detected
  if (techSet.size === 0 && repo.language) {
    techSet.add(repo.language);
  }

  const description = repo.description || `Software project by ${GITHUB_USERNAME}.`;
  const tagline = repo.description ? repo.description : `An open-source ${category.toLowerCase()} project built with ${repo.language || 'code'}.`;

  return {
    id: repo.name,
    name,
    repoName: repo.name,
    slug: repo.name.toLowerCase(),
    tagline,
    description,
    category,
    status,
    year: createdDate.getFullYear() || new Date().getFullYear(),
    updatedAt: repo.pushed_at || repo.updated_at,
    pushedAt: repo.pushed_at,
    technologies: Array.from(techSet),
    primaryLanguage: repo.language,
    liveUrl,
    githubUrl: repo.html_url,
    featured: isFeatured,
    topics,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    defaultBranch: repo.default_branch || 'main',
    license: repo.license?.name || repo.license?.spdx_id || null,
    size: repo.size,
    owner: repo.owner.login,
    isGitHubSource: true
  };
}

// Fallback projects if GitHub API is offline or when repositories haven't yet been tagged with 'portfolio'
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'beepcinema',
    name: 'BeepCinema',
    repoName: 'BeepCinema',
    slug: 'beepcinema',
    tagline: 'A sleek movie discovery and cinema information web application.',
    description: 'A responsive web application allowing cinephiles to explore trending films, search curated collections, read summaries, and view ratings with zero clutter.',
    category: 'Web',
    status: 'Live',
    year: 2024,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['HTML', 'CSS', 'JavaScript', 'JSON', 'REST API'],
    primaryLanguage: 'JavaScript',
    liveUrl: 'https://beepcinema.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/BeepCinema`,
    featured: true,
    topics: ['portfolio', 'featured', 'web', 'javascript'],
    stars: 5,
    forks: 1,
    openIssues: 0,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  },
  {
    id: 'yuvaupdate',
    name: 'YuvaUpdate',
    repoName: 'YuvaUpdate',
    slug: 'yuvaupdate',
    tagline: 'A student-focused platform for real-time educational updates.',
    description: 'A centralized announcement portal designed to streamline academic news, examination schedules, college notices, and student resources into an accessible feed.',
    category: 'Web',
    status: 'Live',
    year: 2024,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    primaryLanguage: 'JavaScript',
    liveUrl: 'https://yuvaupdate.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/YuvaUpdate`,
    featured: false,
    topics: ['portfolio', 'web', 'javascript'],
    stars: 3,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  },
  {
    id: 'quizzy',
    name: 'Quizzy',
    repoName: 'Quizzy',
    slug: 'quizzy',
    tagline: 'An interactive quiz and assessment platform for students and tuition classes.',
    description: 'A real-time quiz platform engineered for educators and private tutors to create timed practice tests, evaluate student comprehension, and provide instant answer breakdowns.',
    category: 'Web App',
    status: 'In Development',
    year: 2025,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    primaryLanguage: 'TypeScript',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Quizzy`,
    featured: true,
    topics: ['portfolio', 'featured', 'web-app', 'react', 'typescript'],
    stars: 8,
    forks: 2,
    openIssues: 1,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  },
  {
    id: 'baula',
    name: 'Baula',
    repoName: 'Baula',
    slug: 'baula',
    tagline: 'A lightweight 2D browser runner game inspired by the Chrome Dino experience.',
    description: 'An arcade browser obstacle-dodging game built on HTML5 Canvas featuring fluid physics, procedural difficulty progression, and custom pixel-inspired art.',
    category: 'Game',
    status: 'Demo',
    year: 2024,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'Web Audio'],
    primaryLanguage: 'JavaScript',
    liveUrl: 'https://baula-game.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Baula`,
    featured: false,
    topics: ['portfolio', 'game', 'canvas', 'javascript'],
    stars: 4,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  },
  {
    id: 'momate',
    name: 'Momate',
    repoName: 'Momate',
    slug: 'momate',
    tagline: 'A clean money management and expense-sharing application for roommates and groups.',
    description: 'A split-billing utility that simplifies shared apartment groceries, rent, utilities, and dining expenses with debt simplification and instant balance summaries.',
    category: 'App',
    status: 'In Development',
    year: 2025,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    primaryLanguage: 'TypeScript',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Momate`,
    featured: false,
    topics: ['portfolio', 'app', 'react', 'typescript'],
    stars: 6,
    forks: 1,
    openIssues: 0,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  },
  {
    id: 'feelam',
    name: 'Feelam',
    repoName: 'Feelam',
    slug: 'feelam',
    tagline: 'A minimal, editorial movie search and discovery concept.',
    description: 'An experimental movie curation web interface stripped down to pure typography, mood palettes, director spotlights, and distraction-free cinema exploration.',
    category: 'Web',
    status: 'In Development',
    year: 2025,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
    technologies: ['JavaScript', 'REST APIs', 'CSS Grid', 'HTML5'],
    primaryLanguage: 'JavaScript',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Feelam`,
    featured: false,
    topics: ['portfolio', 'web', 'javascript'],
    stars: 2,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    license: 'MIT',
    owner: GITHUB_USERNAME,
    isGitHubSource: false
  }
];

export interface FetchProjectsResult {
  projects: Project[];
  fromCache: boolean;
  lastUpdated: string;
  totalPublicRepos: number;
  portfolioTaggedRepos: number;
  rateLimit?: GitHubRateLimitInfo;
  error?: string;
  usingFallback?: boolean;
}

/**
 * Fetch all public repositories for BipinDev404 and filter those with topic 'portfolio'
 */
export async function getPortfolioRepositories(forceRefresh: boolean = false): Promise<FetchProjectsResult> {
  // Check localStorage cache first
  if (!forceRefresh) {
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        const age = Date.now() - (cached.timestamp || 0);
        if (age < CACHE_TTL_MS && Array.isArray(cached.projects) && cached.projects.length > 0) {
          return {
            projects: cached.projects,
            fromCache: true,
            lastUpdated: new Date(cached.timestamp).toLocaleTimeString(),
            totalPublicRepos: cached.totalPublicRepos || cached.projects.length,
            portfolioTaggedRepos: cached.portfolioTaggedRepos || cached.projects.length,
            rateLimit: cached.rateLimit
          };
        }
      }
    } catch (e) {
      console.warn('Failed to read from localStorage cache:', e);
    }
  }

  try {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json, application/vnd.github.v3+json'
      }
    });

    const rateLimit: GitHubRateLimitInfo = {
      limit: parseInt(response.headers.get('x-ratelimit-limit') || '60', 10),
      remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '60', 10),
      reset: parseInt(response.headers.get('x-ratelimit-reset') || '0', 10)
    };

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error('GitHub API rate limit exceeded. Using cached software catalog.');
      }
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos: GitHubRawRepo[] = await response.json();
    const totalPublicRepos = repos.length;

    // Filter strictly for repositories with topic 'portfolio' (case-insensitive)
    const portfolioRepos = repos.filter(repo => {
      if (!repo.topics || !Array.isArray(repo.topics)) return false;
      return repo.topics.some(t => t.toLowerCase() === PORTFOLIO_TOPIC);
    });

    let finalProjects: Project[] = [];
    let usingFallback = false;

    if (portfolioRepos.length > 0) {
      finalProjects = portfolioRepos.map(transformGitHubRepo);
    } else {
      // If user hasn't tagged any repositories with 'portfolio' yet, show fallback sample projects
      // and indicate usingFallback so UI can show a helpful note
      finalProjects = FALLBACK_PROJECTS;
      usingFallback = true;
    }

    // Save to cache
    const cachePayload = {
      timestamp: Date.now(),
      projects: finalProjects,
      totalPublicRepos,
      portfolioTaggedRepos: portfolioRepos.length,
      rateLimit,
      usingFallback
    };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }

    return {
      projects: finalProjects,
      fromCache: false,
      lastUpdated: new Date().toLocaleTimeString(),
      totalPublicRepos,
      portfolioTaggedRepos: portfolioRepos.length,
      rateLimit,
      usingFallback
    };
  } catch (err: any) {
    console.error('GitHub API error:', err);

    // Try fallback from existing cache regardless of age
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        if (Array.isArray(cached.projects) && cached.projects.length > 0) {
          return {
            projects: cached.projects,
            fromCache: true,
            lastUpdated: new Date(cached.timestamp || Date.now()).toLocaleTimeString(),
            totalPublicRepos: cached.totalPublicRepos || cached.projects.length,
            portfolioTaggedRepos: cached.portfolioTaggedRepos || cached.projects.length,
            error: err.message
          };
        }
      }
    } catch {}

    // Fallback to initial local collection
    return {
      projects: FALLBACK_PROJECTS,
      fromCache: false,
      lastUpdated: new Date().toLocaleTimeString(),
      totalPublicRepos: FALLBACK_PROJECTS.length,
      portfolioTaggedRepos: FALLBACK_PROJECTS.length,
      error: err.message,
      usingFallback: true
    };
  }
}

/**
 * Fetch detailed README content for a repository
 */
export async function getRepositoryReadme(repoName: string, defaultBranch: string = 'main'): Promise<string | null> {
  const cacheKey = `github_readme_${repoName}_${defaultBranch}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {}

  try {
    // Try raw github usercontent first (bypasses API rate limits)
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/README.md`;
    const res = await fetch(rawUrl);
    if (res.ok) {
      const markdown = await res.text();
      try {
        sessionStorage.setItem(cacheKey, markdown);
      } catch {}
      return markdown;
    }

    // Try uppercase README
    const rawUrlUpper = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/readme.md`;
    const resUpper = await fetch(rawUrlUpper);
    if (resUpper.ok) {
      const markdown = await resUpper.text();
      try {
        sessionStorage.setItem(cacheKey, markdown);
      } catch {}
      return markdown;
    }
  } catch (err) {
    console.warn(`Could not load README for ${repoName}:`, err);
  }

  return null;
}

/**
 * Fetch language breakdown for a repository
 */
export async function getRepositoryLanguages(repoName: string): Promise<Record<string, number>> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Could not load languages for ${repoName}:`, err);
  }
  return {};
}

/**
 * Resolve relative image URLs in markdown so they point directly to GitHub raw assets
 */
export function resolveRelativeMarkdownImages(markdown: string, repoName: string, defaultBranch: string = 'main'): string {
  const baseUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}`;

  // Replace markdown images: ![alt](./path) or ![alt](path)
  let resolved = markdown.replace(
    /!\[(.*?)\]\((?!https?:\/\/)(.*?)\)/g,
    (match, alt, relativePath) => {
      const cleanPath = relativePath.replace(/^\.?\//, '');
      return `![${alt}](${baseUrl}/${cleanPath})`;
    }
  );

  // Replace HTML <img> tags with relative src
  resolved = resolved.replace(
    /<img\s+([^>]*?)src=["'](?!https?:\/\/)(.*?)["']([^>]*?)>/gi,
    (match, before, relativePath, after) => {
      const cleanPath = relativePath.replace(/^\.?\//, '');
      return `<img ${before}src="${baseUrl}/${cleanPath}"${after}>`;
    }
  );

  return resolved;
}

/**
 * Extract screenshot image URLs from README markdown
 */
export function extractScreenshotsFromReadme(markdown: string, repoName: string, defaultBranch: string = 'main'): string[] {
  const screenshots: string[] = [];
  const baseUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}`;

  // Markdown image syntax regex
  const mdImgRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match;
  while ((match = mdImgRegex.exec(markdown)) !== null) {
    const src = match[2].trim();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      screenshots.push(src);
    } else {
      const cleanPath = src.replace(/^\.?\//, '');
      screenshots.push(`${baseUrl}/${cleanPath}`);
    }
  }

  return screenshots;
}

/**
 * Return prioritized candidate URLs for real repository images hosted on GitHub
 */
export function getProjectImageCandidates(project: Project): string[] {
  const repo = project.repoName || project.id;
  const branch = project.defaultBranch || 'main';
  const base = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo}/${branch}`;

  const candidates: string[] = [];

  // If project has explicit screenshot from README or metadata, prioritize it
  if (project.image && (project.image.startsWith('http://') || project.image.startsWith('https://'))) {
    candidates.push(project.image);
  }

  // Standard screenshot conventions in repository:
  candidates.push(`${base}/screenshot.png`);
  candidates.push(`${base}/preview.png`);
  candidates.push(`${base}/cover.png`);
  candidates.push(`${base}/screenshots/preview.png`);
  candidates.push(`${base}/screenshots/home.png`);
  candidates.push(`${base}/screenshots/screenshot.png`);
  candidates.push(`${base}/screenshots/1.png`);
  candidates.push(`${base}/.github/preview.png`);
  candidates.push(`${base}/.github/screenshot.png`);
  candidates.push(`${base}/.github/cover.png`);
  candidates.push(`${base}/screenshot.jpg`);
  candidates.push(`${base}/preview.jpg`);
  candidates.push(`${base}/screenshot.webp`);

  // GitHub's official dynamic OpenGraph card for the repo as clean fallback:
  candidates.push(`https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo}`);

  return candidates;
}
