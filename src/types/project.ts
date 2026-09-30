export type ProjectCategory = 'Web' | 'Web App' | 'Game' | 'App' | 'Tool' | 'Experiment' | 'Other';

export type ProjectStatus = 'Live' | 'Demo' | 'In Development' | 'Archived' | 'Active';

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  repoName: string;
  slug: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  updatedAt: string;
  pushedAt: string;
  technologies: string[];
  primaryLanguage: string | null;
  allLanguages?: Record<string, number>;
  image?: string;
  screenshots?: string[];
  liveUrl?: string | null;
  githubUrl: string;
  featured: boolean;
  topics: string[];
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  license?: string | null;
  size?: number;
  owner: string;
  readme?: string | null;
  isGitHubSource?: boolean;
  developmentType?: string;
  role?: string;
  overview?: string;
  features?: (string | ProjectFeature)[];
  challengesAndLearnings?: string[];
  accentColor?: string;
}

export interface GitHubRateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}
