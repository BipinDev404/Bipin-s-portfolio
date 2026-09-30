export interface Article {
  id: string;
  slug: string;
  title: string;
  repoName: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  githubUrl: string;
  stars: number;
  featured?: boolean;
  coverImage?: string;
  defaultBranch: string;
  isGitHubSource?: boolean;
  content?: string;
}
