import React from 'react';
import { 
  Code2, 
  Cpu, 
  Terminal, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Github, 
  Mail, 
  CheckCircle2,
  Compass,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const stackCategories = [
    {
      title: 'Frontend & UI',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5 Canvas', 'Vite', 'CSS Grid & Flexbox']
    },
    {
      title: 'Backend & Data',
      items: ['Node.js', 'Express', 'Firebase Firestore', 'PostgreSQL', 'RESTful APIs', 'JSON Storage']
    },
    {
      title: 'Tools & Workflow',
      items: ['Git & GitHub', 'VS Code', 'Command Line / Bash', 'Figma', 'Postman', 'Performance Profiling']
    }
  ];

  const philosophies = [
    {
      number: '01',
      title: 'Product-First Craftsmanship',
      description: 'Code is a tool to solve real problems. I prioritize intuitive interfaces, low cognitive load, and practical utility over flashy but useless gimmicks.'
    },
    {
      number: '02',
      title: 'Performance & Low Latency',
      description: 'Fast response times, minimal bundle sizes, zero unnecessary network requests, and smooth 60fps canvas/animations.'
    },
    {
      number: '03',
      title: 'Maintainable & Scalable Architecture',
      description: 'Clean data contracts, modular components, strict TypeScript typings, and readable logic that other developers can effortlessly inspect.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 animate-fadeIn space-y-14">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <Compass className="w-3.5 h-3.5" />
          <span>About · Background & Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Building practical software with curiosity and care.
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl pt-2">
          Hi, I'm <strong className="text-neutral-900 dark:text-white font-semibold">Bipin</strong>. I'm a software developer who enjoys turning ideas into working products. This website is a personal software archive—a catalog of applications, educational platforms, arcade experiments, and developer utilities I've engineered.
        </p>
      </section>

      {/* Engineering Ethos / Philosophy */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Engineering Principles
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            How I approach product design, architecture, and code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {philosophies.map((p) => (
            <div
              key={p.number}
              className="p-5 rounded-xl border border-slate-200 bg-white/80 dark:border-neutral-800 dark:bg-[#121417]/80 space-y-2.5 shadow-sm"
            >
              <div className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500">
                {p.number}.
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Arsenal */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Technologies & Tools
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Languages, libraries, frameworks, and environments I use daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stackCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl border border-slate-200 bg-white/80 dark:border-neutral-800 dark:bg-[#121417]/80 space-y-3 shadow-sm"
            >
              <h3 className="text-sm font-semibold font-mono text-neutral-900 dark:text-white uppercase tracking-wider">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer on About Page */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/70 dark:border-neutral-800 dark:bg-[#121417]/60 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Ready to explore the software?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
            Check out the live applications and open-source repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
          >
            <span>Browse Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-neutral-900 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 text-xs font-medium transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};
