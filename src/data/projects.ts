import { Project } from '../types/project';
import { GITHUB_USERNAME } from '../services/github';

export const STATUS_CONFIG: Record<string, { label: string; dotClass: string; textClass: string }> = {
  'Live': {
    label: 'Live',
    dotClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    textClass: 'text-emerald-500 dark:text-emerald-400'
  },
  'Active': {
    label: 'Active',
    dotClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    textClass: 'text-emerald-500 dark:text-emerald-400'
  },
  'Demo': {
    label: 'Demo',
    dotClass: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',
    textClass: 'text-sky-500 dark:text-sky-400'
  },
  'In Development': {
    label: 'In Development',
    dotClass: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] animate-pulse',
    textClass: 'text-amber-500 dark:text-amber-400'
  },
  'Archived': {
    label: 'Archived',
    dotClass: 'bg-neutral-500',
    textClass: 'text-neutral-500 dark:text-neutral-400'
  }
};

export const PROJECTS: Project[] = [
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
    featured: true,
    developmentType: 'Solo Project',
    role: 'Frontend Developer & UI Designer',
    accentColor: '#E50914',
    liveUrl: 'https://beepcinema.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/BeepCinema`,
    topics: ['portfolio', 'featured', 'web', 'javascript'],
    stars: 5,
    forks: 1,
    openIssues: 0,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'BeepCinema was designed to solve the problem of overwhelming, ad-heavy movie databases. It focuses on fast search indexing, client-side caching of movie payloads, clean typography, and a dark theater-mode aesthetic that puts movie posters front and center.',
    features: [
      {
        title: 'Instant Search & Filter',
        description: 'Debounced search queries across thousands of film records loaded via lightweight JSON feeds.'
      },
      {
        title: 'Cinematic Details View',
        description: 'Comprehensive movie metadata including cast, synopsis, runtime, genre tags, and rating scores.'
      },
      {
        title: 'Watchlist Storage',
        description: 'Client-side local storage integration allowing users to save and curate movies without an account.'
      },
      {
        title: 'Adaptive Dark Interface',
        description: 'Minimalist high-contrast dark theme inspired by cinema theater viewing environments.'
      }
    ],
    challengesAndLearnings: [
      'Architected efficient client-side pagination and lazy image loading to ensure sub-second initial paint times on 3G connections.',
      'Designed a normalized JSON schema for offline fallback data when external API endpoints experience rate limits.',
      'Refined CSS Grid layouts to dynamically adapt from mobile viewports to ultra-wide desktop monitors.'
    ],
    screenshots: [
      'beepcinema-home',
      'beepcinema-search',
      'beepcinema-detail'
    ]
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
    featured: false,
    developmentType: 'Solo Project',
    role: 'Full-Stack Builder',
    accentColor: '#3B82F6',
    liveUrl: 'https://yuvaupdate.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/YuvaUpdate`,
    topics: ['portfolio', 'web', 'javascript'],
    stars: 3,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'Educational updates are often fragmented across disparate social groups, PDF bulletins, and physical notice boards. YuvaUpdate aggregates vital notices into clean chronological feeds with categorized tags and search filters.',
    features: [
      {
        title: 'Chronological Notice Feed',
        description: 'Time-stamped announcements categorized by examinations, admissions, syllabus changes, and holidays.'
      },
      {
        title: 'Document & PDF Quick Preview',
        description: 'In-app previewing for official circulars and academic PDFs without requiring separate downloads.'
      },
      {
        title: 'Category Filtering',
        description: 'One-click filtering across departments and academic years for tailored notice discovery.'
      },
      {
        title: 'Lightweight Mobile Build',
        description: 'Optimized for low-bandwidth mobile networks with zero heavy framework overhead.'
      }
    ],
    challengesAndLearnings: [
      'Created a pure vanilla JavaScript state engine with no dependencies, keeping total asset bundle size under 45KB.',
      'Implemented accessible keyboard shortcuts and high-contrast typography for improved student readability.'
    ],
    screenshots: [
      'yuvaupdate-feed',
      'yuvaupdate-filter'
    ]
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
    featured: true,
    developmentType: 'Solo Project',
    role: 'Lead Architect',
    accentColor: '#8B5CF6',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Quizzy`,
    topics: ['portfolio', 'featured', 'web-app', 'react', 'typescript'],
    stars: 8,
    forks: 2,
    openIssues: 1,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'Quizzy replaces cumbersome paper worksheets and rigid test software with an interactive, delightful testing interface tailored for tuition classes. Educators can compose modular question banks while students enjoy a focused, distraction-free testing environment.',
    features: [
      {
        title: 'Timed Assessment Engine',
        description: 'Configurable countdown timers per question or test session with automatic submission upon expiry.'
      },
      {
        title: 'Modular Question Builder',
        description: 'Support for multiple choice, multi-select, boolean true/false, and short-form text questions.'
      },
      {
        title: 'Detailed Score Analysis',
        description: 'Instant scorecards with question-by-question explanations and performance metrics.'
      },
      {
        title: 'Tuition Class Room Codes',
        description: 'Simple join codes allowing students to enter custom class quizzes without tedious registration.'
      }
    ],
    challengesAndLearnings: [
      'Engineered an anti-cheat timer state model that handles tab switches and browser backgrounding accurately.',
      'Utilized TypeScript strict type unions to model complex question formats and score aggregation pipelines.'
    ],
    screenshots: [
      'quizzy-test-screen',
      'quizzy-results',
      'quizzy-builder'
    ]
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
    featured: false,
    developmentType: 'Solo Project',
    role: 'Game Designer & Programmer',
    accentColor: '#10B981',
    liveUrl: 'https://baula-game.example.com',
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Baula`,
    topics: ['portfolio', 'game', 'canvas', 'javascript'],
    stars: 4,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'Baula was created as a deep dive into 60fps canvas rendering, collision detection algorithms, and game loop mathematics. Players guide a spirited character across dynamically generated obstacles with crisp jumping mechanics.',
    features: [
      {
        title: '60 FPS Canvas Game Loop',
        description: 'Smooth requestAnimationFrame animation loop with frame-rate independent physics calculations.'
      },
      {
        title: 'AABB Collision Detection',
        description: 'Precise bounding-box collision algorithm with forgiving hitboxes for competitive arcade feel.'
      },
      {
        title: 'Dynamic Speed Ramp',
        description: 'Gradual velocity and obstacle frequency scaling as the player survives longer runs.'
      },
      {
        title: 'Local High Score Persistence',
        description: 'Tracks personal records, best streaks, and total jump counts in local storage.'
      }
    ],
    challengesAndLearnings: [
      'Solved frame-rate jitter across high-refresh (120Hz/144Hz) monitors using delta-time based velocity integration.',
      'Synthesized retro 8-bit sound effects directly in code using the Web Audio API without audio file latency.'
    ],
    screenshots: [
      'baula-gameplay',
      'baula-gameover'
    ]
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
    featured: false,
    developmentType: 'Solo Project',
    role: 'Product Engineer',
    accentColor: '#F59E0B',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Momate`,
    topics: ['portfolio', 'app', 'react', 'typescript'],
    stars: 6,
    forks: 1,
    openIssues: 0,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'Living with roommates often leads to confusing financial spreadsheets. Momate provides a dedicated space where flatmates log shared costs, track who paid what, and settle balances with minimal transactions using graph debt simplification.',
    features: [
      {
        title: 'Debt Simplification Algorithm',
        description: 'Optimizes multi-party debts into the minimum possible number of direct peer-to-peer transfers.'
      },
      {
        title: 'Custom Split Weights',
        description: 'Split expenses equally, by exact custom amounts, or by custom percentage ratios.'
      },
      {
        title: 'Receipt Categorization',
        description: 'Categorizes expenses into Rent, Groceries, Utilities, Subscriptions, and Entertainment.'
      },
      {
        title: 'Offline-First Storage',
        description: 'Fully functional offline with local database syncing when connection resumes.'
      }
    ],
    challengesAndLearnings: [
      'Implemented the minimum cash flow debt-settlement graph algorithm in pure TypeScript.',
      'Designed a clean, mobile-first touch UI with large tap targets for effortless expense entry on the go.'
    ],
    screenshots: [
      'momate-dashboard',
      'momate-split-calc'
    ]
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
    featured: false,
    developmentType: 'Prototype',
    role: 'Concept Designer & Developer',
    accentColor: '#EC4899',
    liveUrl: null,
    githubUrl: `https://github.com/${GITHUB_USERNAME}/Feelam`,
    topics: ['portfolio', 'web', 'javascript'],
    stars: 2,
    forks: 0,
    openIssues: 0,
    defaultBranch: 'main',
    owner: GITHUB_USERNAME,
    overview: 'Feelam explores an editorial magazine approach to film discovery. Unlike standard streaming grid catalogues, Feelam presents curated director filmographies, atmospheric color grading palettes, and quote excerpts.',
    features: [
      {
        title: 'Mood & Aesthetic Filtering',
        description: 'Discover films based on tone, color palette, pacing, and visual atmosphere.'
      },
      {
        title: 'Director Filmography Timelines',
        description: 'Interactive career timelines tracing a filmmaker’s evolutions from indie debuts to masterpieces.'
      },
      {
        title: 'Editorial Typography Layout',
        description: 'High-contrast typography with balanced hierarchy and cinematic stills.'
      }
    ],
    challengesAndLearnings: [
      'Crafted custom CSS transition states for smooth page transforms without relying on heavy client animation libraries.',
      'Created custom color-extraction routines from movie poster art to tint background vignettes dynamically.'
    ],
    screenshots: [
      'feelam-spotlight',
      'feelam-timeline'
    ]
  }
];
