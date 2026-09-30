import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  Github, 
  Folder, 
  FileText, 
  ArrowRight, 
  Tag, 
  Globe, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Sliders 
} from 'lucide-react';
import { GITHUB_USERNAME } from '../services/github';

interface GitHubImageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubImageGuideModal: React.FC<GitHubImageGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'topics' | 'images' | 'readme'>('quick');

  if (!isOpen) return null;

  const sampleReadme = `# My Project Name

A concise one-line tagline explaining what this software does.

## Live Demo
https://my-demo-url.com

## Preview
![Application Preview](./screenshot.png)

## Overview
Detailed description of the application, why you built it, the problem it solves, and its architecture.

## Key Features
- **Instant Search**: Fast client-side querying.
- **Interactive UI**: Fluid 60fps animations.
- **Offline Storage**: Local persistence.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend / DB**: Node.js, Firebase Firestore
`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(sampleReadme);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121417] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-mono">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                How to Add & Control Projects via GitHub
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Manage your portfolio completely by pushing to <span className="font-semibold text-neutral-800 dark:text-neutral-200">@{GITHUB_USERNAME}</span> with zero code changes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs inside Guide */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-neutral-800 text-xs font-mono overflow-x-auto">
          {[
            { id: 'quick', label: '1. Quick 3-Step Setup' },
            { id: 'topics', label: '2. Topics & Categories' },
            { id: 'images', label: '3. Real Screenshots' },
            { id: 'readme', label: '4. README Template' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-2 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-neutral-900 text-neutral-900 dark:border-white dark:text-white font-bold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* TAB 1: QUICK SETUP */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-mono">1</span>
                  <span>Add the <code className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">portfolio</code> Topic</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-8">
                  Go to your repository on GitHub (<code className="font-mono text-[11px]">github.com/{GITHUB_USERNAME}/&lt;repo&gt;</code>) → Click the <strong>⚙️ (gear icon)</strong> next to the <strong>About</strong> section in the right sidebar → Add the topic:
                </p>
                <div className="pl-8 pt-1">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold">
                    #portfolio
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-mono">2</span>
                  <span>Set Description & Homepage URL (For Live Demo button)</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-8">
                  In the same GitHub <strong>About</strong> popup:
                </p>
                <ul className="list-disc pl-12 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                  <li><strong>Description:</strong> A crisp 1-line summary of the project.</li>
                  <li><strong>Website:</strong> Paste your live app link (e.g. <code className="font-mono">https://myapp.com</code>) — this automatically enables the <strong>[Live Demo]</strong> button.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-mono">3</span>
                  <span>Add Screenshot & README</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pl-8">
                  Add <code className="font-mono bg-white dark:bg-black px-1 rounded">screenshot.png</code> to your repository root or write a <code className="font-mono bg-white dark:bg-black px-1 rounded">README.md</code>. The portfolio auto-detects everything!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TOPICS & CATEGORIES */}
          {activeTab === 'topics' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                You can categorize and highlight any project simply by adding relevant GitHub topics:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>#featured</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    Highlights the project in the large Featured Spotlight hero section at the top of the homepage.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 font-mono">
                    <Globe className="w-3.5 h-3.5" />
                    <span>#web or #web-app</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    Categorizes the repository under the <strong>Web</strong> / <strong>Web Apps</strong> filter tab.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    <Tag className="w-3.5 h-3.5" />
                    <span>#game or #arcade</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    Categorizes the repository under the <strong>Games</strong> filter tab.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400 font-mono">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>#tool or #cli</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    Categorizes the repository under the <strong>Tools</strong> filter tab.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <strong>Example GitHub Topic set:</strong><br />
                <span className="text-neutral-900 dark:text-neutral-200">portfolio, featured, web, react, typescript, tailwind</span>
              </div>
            </div>
          )}

          {/* TAB 3: REAL SCREENSHOTS */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                The showcase automatically fetches real images from your repository. You can use any of these naming conventions:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span className="text-neutral-900 dark:text-white font-bold">screenshot.png / preview.png</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">Root folder</span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="text-neutral-900 dark:text-white font-bold">screenshots/preview.png</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">Subfolder</span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-500" />
                    <span className="text-neutral-900 dark:text-white font-bold">README.md embedded images</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">Auto-extracted gallery</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: README TEMPLATE */}
          {activeTab === 'readme' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Copy-paste this starter template into your repository's <code>README.md</code>:
                </span>
                <button
                  onClick={handleCopyReadme}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-black font-mono text-xs overflow-x-auto leading-relaxed max-h-64 border border-slate-800 dark:border-neutral-800">
                {sampleReadme}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 dark:bg-[#0c0d0e] border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1.5"
          >
            <span>Open GitHub (@{GITHUB_USERNAME})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
