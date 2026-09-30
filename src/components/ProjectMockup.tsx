import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types/project';
import { Play, Pause, Search, Film, Star, CheckCircle, Clock, Volume2, ArrowRight, ShieldCheck, Terminal, BookOpen, Layers } from 'lucide-react';

interface ProjectMockupProps {
  project: Project;
  variant?: 'card' | 'hero' | 'detail' | 'screenshot';
  screenshotId?: string;
  className?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({
  project,
  variant = 'card',
  screenshotId,
  className = ''
}) => {
  // BeepCinema Mockup
  if (project.id === 'beepcinema') {
    return (
      <div className={`w-full h-full bg-[#101216] text-neutral-100 flex flex-col font-sans select-none overflow-hidden ${className}`}>
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#181a20] border-b border-neutral-800 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-neutral-400">beepcinema.app</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
            <span className="text-red-400 font-bold tracking-wider">BEEP CINEMA</span>
          </div>
        </div>

        {/* Mock Content */}
        <div className="p-4 flex-1 flex flex-col gap-3 overflow-hidden bg-gradient-to-b from-[#13151b] to-[#0c0d10]">
          {/* Mock Search Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e222b] border border-neutral-700/60 rounded-lg text-xs text-neutral-400 flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-neutral-400 text-xs">Search sci-fi, noir, classics...</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
              <span className="text-white bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">Trending</span>
              <span className="text-neutral-400 hover:text-white px-2 py-0.5">Top Rated</span>
            </div>
          </div>

          {/* Film Showcase Row */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 flex-1 pt-1">
            {[
              { title: 'Interstellar Drift', year: '2024', rating: '8.9', color: 'from-blue-900/60 to-purple-950/80', tag: 'Sci-Fi' },
              { title: 'Tokyo Midnight', year: '2023', rating: '8.4', color: 'from-amber-900/60 to-rose-950/80', tag: 'Noir' },
              { title: 'The Silent Grid', year: '2024', rating: '9.1', color: 'from-emerald-900/60 to-cyan-950/80', tag: 'Thriller' },
              { title: 'Solar Solaris', year: '2022', rating: '8.7', color: 'from-red-900/60 to-orange-950/80', tag: 'Drama' },
            ].map((film, idx) => (
              <div 
                key={idx}
                className={`relative rounded-lg border border-neutral-800/80 overflow-hidden bg-gradient-to-br ${film.color} p-2 flex flex-col justify-between group/poster transition-all duration-200 hover:border-neutral-600`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/60 text-neutral-300 border border-white/10">
                    {film.tag}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                    <span>{film.rating}</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-xs text-white leading-tight line-clamp-1">{film.title}</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{film.year} · 4K UHD</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick playback strip */}
          <div className="hidden sm:flex items-center justify-between p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white">
                <Film className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-300 text-[11px] font-medium">Currently Curating: 1,420 Films indexed with JSON cache</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">● 60ms latency</span>
          </div>
        </div>
      </div>
    );
  }

  // YuvaUpdate Mockup
  if (project.id === 'yuvaupdate') {
    return (
      <div className={`w-full h-full bg-[#0f141c] text-neutral-100 flex flex-col font-sans select-none overflow-hidden ${className}`}>
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#161f2c] border-b border-blue-950/60 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <span className="ml-2 font-mono text-[11px] text-blue-300/80">yuvaupdate.edu.org</span>
          </div>
          <div className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">
            STUDENT NOTICE BOARD
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-2.5 bg-gradient-to-b from-[#111823] to-[#0a0f16] overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white tracking-tight">Academic Alerts & Circulars</span>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 rounded">
              Semester VI Active
            </span>
          </div>

          <div className="space-y-2 flex-1 overflow-hidden">
            {[
              { tag: 'EXAM', title: 'Winter 2024 End Semester Examination Timetable Published', date: 'Today · 09:30 AM', priority: 'High Priority' },
              { tag: 'ADMISSION', title: 'Scholarship Portal Open for Technical & Polytechnic Courses', date: 'Yesterday', priority: 'Notice' },
              { tag: 'SYLLABUS', title: 'Updated Practical Laboratory Manuals for Computer Engineering', date: '2 days ago', priority: 'Update' },
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[#15202e] border border-blue-900/40 flex items-start justify-between gap-3 hover:border-blue-700/60 transition-colors">
                <div className="flex items-start gap-2.5">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${i === 0 ? 'bg-red-950 text-red-300 border border-red-800/40' : 'bg-blue-950 text-blue-300 border border-blue-800/40'}`}>
                    {item.tag}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-100 line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{item.date} · Verified Circular PDF attached</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center text-[10px] text-blue-400 font-medium whitespace-nowrap">
                  View Notice →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quizzy Mockup
  if (project.id === 'quizzy') {
    return (
      <div className={`w-full h-full bg-[#120f1d] text-neutral-100 flex flex-col font-sans select-none overflow-hidden ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#1b152d] border-b border-purple-900/40 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-400 tracking-tight text-xs">QUIZZY PRO</span>
            <span className="text-[10px] text-purple-300/60 font-mono">/ Physics 101 Class</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] text-amber-300 font-bold">04:18 left</span>
          </div>
        </div>

        {/* Quiz Interface */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#140e22] to-[#0d0918]">
          <div>
            <div className="flex justify-between items-center text-[11px] font-mono text-purple-300/80 mb-1.5">
              <span>Question 7 of 15</span>
              <span>4 points</span>
            </div>
            <div className="w-full bg-purple-950/60 h-1.5 rounded-full overflow-hidden mb-3">
              <div className="bg-purple-500 h-full w-[46%]" />
            </div>

            <h3 className="text-xs sm:text-sm font-semibold text-white mb-3">
              Which law states that the induced electromotive force in any closed circuit is equal to the negative rate of change of the magnetic flux?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { letter: 'A', text: 'Ohm’s Law', selected: false },
                { letter: 'B', text: 'Faraday’s Law of Induction', selected: true },
                { letter: 'C', text: 'Ampère’s Circuital Law', selected: false },
                { letter: 'D', text: 'Coulomb’s Inverse Square', selected: false },
              ].map((opt, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${opt.selected ? 'bg-purple-600/20 border-purple-500 text-white font-medium shadow-[0_0_12px_rgba(168,85,247,0.15)]' : 'bg-[#1a1429] border-purple-900/30 text-neutral-300 hover:border-purple-700/40'}`}
                >
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold ${opt.selected ? 'bg-purple-500 text-white' : 'bg-purple-950/60 text-purple-300'}`}>
                    {opt.letter}
                  </span>
                  <span className="truncate">{opt.text}</span>
                  {opt.selected && <CheckCircle className="w-3.5 h-3.5 text-purple-400 ml-auto shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-purple-900/30 text-xs">
            <span className="text-[10px] font-mono text-neutral-400">Class Room: #PHY-849</span>
            <button className="px-3 py-1 bg-purple-600 text-white font-medium rounded text-xs hover:bg-purple-500 transition-colors flex items-center gap-1">
              Next Question <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Baula Game Mockup (Canvas Runner Simulation)
  if (project.id === 'baula') {
    return <BaulaGamePreview className={className} />;
  }

  // Momate App Mockup
  if (project.id === 'momate') {
    return (
      <div className={`w-full h-full bg-[#15130e] text-neutral-100 flex flex-col font-sans select-none overflow-hidden ${className}`}>
        {/* Top Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#1f1b13] border-b border-amber-900/30 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-amber-400 text-xs tracking-tight">MOMATE</span>
            <span className="text-[10px] text-amber-300/60 font-mono">/ Flat 402 Group</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            All Settled Up
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-3 bg-gradient-to-b from-[#18150f] to-[#0e0c08] justify-between">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-[#221c12] border border-amber-900/40">
              <span className="text-[10px] font-mono text-amber-300/80 uppercase">Total Spent This Month</span>
              <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">$1,840.50</div>
              <span className="text-[9px] text-neutral-400 font-mono">4 active roommates</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#221c12] border border-amber-900/40">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Your Net Balance</span>
              <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mt-0.5">+$124.00</div>
              <span className="text-[9px] text-emerald-300/70 font-mono">You are owed by Alex</span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1 overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Recent Roommate Splits</span>
            {[
              { item: 'Whole Foods Grocery Run', payer: 'Paid by You', amount: '$142.80', split: '4-way equal', icon: '🛒' },
              { item: 'High Speed Fiber Internet', payer: 'Paid by Kevin', amount: '$89.00', split: '4-way equal', icon: '⚡' },
            ].map((exp, i) => (
              <div key={i} className="p-2 rounded-lg bg-[#1d1810] border border-amber-950/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{exp.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-[11px]">{exp.item}</div>
                    <div className="text-[9px] text-neutral-400 font-mono">{exp.payer} · {exp.split}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white text-xs">{exp.amount}</div>
                  <div className="text-[9px] text-amber-400 font-mono">settled</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-950/40 text-[10px] font-mono text-neutral-400">
            <span>Minimum Graph Transactions: 2 transfers</span>
            <span className="text-amber-400 font-medium">+ Add Expense</span>
          </div>
        </div>
      </div>
    );
  }

  // Feelam Mockup
  if (project.id === 'feelam') {
    return (
      <div className={`w-full h-full bg-[#0d0d11] text-neutral-100 flex flex-col font-sans select-none overflow-hidden ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#14141a] border-b border-pink-950/40 text-xs text-neutral-400">
          <span className="font-serif italic font-bold text-pink-400 text-sm tracking-wider">feelam.</span>
          <span className="text-[10px] font-mono text-neutral-400">Atmospheric Cinema Curations</span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#111117] to-[#08080a]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-400/80">Director in Focus</span>
            <h2 className="text-sm sm:text-base font-serif font-bold text-white mt-1">Wong Kar-wai — The Mood for Love & Colors</h2>
            <p className="text-[11px] text-neutral-400 font-sans mt-1 line-clamp-2">
              Deep saturated greens, yearning silhouettes in rainy alleyways, and step-printed shutter aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2">
            {[
              { color: 'from-pink-900/60 via-red-950/80 to-black', title: 'Chungking Express', year: '1994' },
              { color: 'from-emerald-950/70 via-teal-950/80 to-black', title: 'In the Mood for Love', year: '2000' },
              { color: 'from-amber-950/70 via-rose-950/80 to-black', title: 'Fallen Angels', year: '1995' },
            ].map((m, i) => (
              <div key={i} className={`p-2 rounded-lg bg-gradient-to-b ${m.color} border border-pink-950/60 flex flex-col justify-end h-20 sm:h-24`}>
                <div className="text-[11px] font-medium text-white leading-tight">{m.title}</div>
                <div className="text-[9px] font-mono text-pink-300/70">{m.year} · 35mm</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 border-t border-pink-950/30">
            <span>Color Palette Extraction</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-900 inline-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DevSnippets CLI Mockup
  if (project.id === 'devsnippets-cli') {
    return (
      <div className={`w-full h-full bg-[#0a0f14] text-neutral-200 flex flex-col font-mono select-none overflow-hidden text-xs ${className}`}>
        <div className="flex items-center justify-between px-3 py-2 bg-[#101820] border-b border-cyan-950/60">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-cyan-300 font-semibold">devsnippets --interactive</span>
          </div>
          <span className="text-[10px] text-neutral-400">bash / zsh</span>
        </div>
        <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#080d12]">
          <div className="space-y-1.5 text-[11px]">
            <div className="text-cyan-400 font-bold">$ devsnippets find "docker multi-stage"</div>
            <div className="text-neutral-400">Found 1 matching snippet in 4ms:</div>
            <div className="p-2 rounded bg-black/60 border border-cyan-950/80 text-[10px] text-neutral-300 space-y-0.5 overflow-hidden font-mono">
              <div className="text-purple-400">FROM node:20-alpine AS builder</div>
              <div className="text-neutral-400">WORKDIR /app</div>
              <div className="text-neutral-400">COPY package*.json ./ && RUN npm ci</div>
              <div className="text-neutral-400">COPY . . && RUN npm run build</div>
              <div className="text-emerald-400"># ✓ Copied to clipboard!</div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-2 border-t border-cyan-950/40">
            <span>[Enter] Copy · [E] Edit · [D] Delete</span>
            <span className="text-cyan-400">v1.2.0</span>
          </div>
        </div>
      </div>
    );
  }

  // AudioWave Synth Mockup
  if (project.id === 'audiowave-synth') {
    return (
      <div className={`w-full h-full bg-[#091414] text-neutral-200 flex flex-col font-mono select-none overflow-hidden text-xs ${className}`}>
        <div className="flex items-center justify-between px-3 py-2 bg-[#0e1d1d] border-b border-teal-950/60">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[11px] text-teal-300 font-semibold">AudioWave Engine</span>
          </div>
          <span className="text-[10px] text-emerald-400">44.1 kHz / 24-bit</span>
        </div>
        <div className="p-3.5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0a1616] to-[#060e0e]">
          {/* Waveform graphic */}
          <div className="h-20 bg-black/50 border border-teal-950 rounded flex items-center justify-center p-2 relative overflow-hidden">
            <svg viewBox="0 0 200 60" className="w-full h-full text-teal-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 30 Q 15 5, 30 30 T 60 30 T 90 30 T 120 30 T 150 30 T 180 30 T 200 30" />
            </svg>
            <div className="absolute top-1 right-2 text-[9px] text-teal-300/80 font-mono">Sine 440.0Hz (A4)</div>
          </div>
          <div className="grid grid-cols-4 gap-1.5 pt-2 text-center text-[10px]">
            <div className="p-1 rounded bg-teal-950/40 border border-teal-800/40 text-teal-300">Sine</div>
            <div className="p-1 rounded bg-black/40 border border-teal-950 text-neutral-400">Square</div>
            <div className="p-1 rounded bg-black/40 border border-teal-950 text-neutral-400">Saw</div>
            <div className="p-1 rounded bg-black/40 border border-teal-950 text-neutral-400">Tri</div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Generic Mockup
  return (
    <div className={`w-full h-full bg-[#121316] text-neutral-300 flex flex-col font-sans select-none overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[#18191f] border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="ml-2 font-mono text-[11px] text-neutral-400">{project.slug}.app</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">{project.category}</span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#14151a] to-[#0c0d10]">
        <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white mb-2">
          <Layers className="w-5 h-5 text-neutral-300" />
        </div>
        <h3 className="text-sm font-semibold text-white">{project.name}</h3>
        <p className="text-xs text-neutral-400 max-w-xs mt-1">{project.tagline}</p>
      </div>
    </div>
  );
};

// Mini Interactive Canvas Runner for Baula Game
const BaulaGamePreview: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(140);
  const [highScore, setHighScore] = useState(890);
  const [playerY, setPlayerY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isJumping) {
      setIsJumping(true);
      setPlayerY(28);
      setTimeout(() => {
        setPlayerY(0);
        setIsJumping(false);
        setScore(prev => prev + 20);
      }, 450);
    }
  };

  return (
    <div className={`w-full h-full bg-[#0c130e] text-neutral-100 flex flex-col font-mono select-none overflow-hidden ${className}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#121c15] border-b border-emerald-950/60 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-emerald-400 text-xs tracking-wider">BAULA RUNNER</span>
          <span className="text-[10px] text-neutral-400">60 FPS Canvas</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-neutral-400">HI <span className="text-white font-bold">{highScore}</span></span>
          <span className="text-emerald-400 font-bold">{score.toString().padStart(5, '0')}</span>
        </div>
      </div>

      {/* Mini Game Canvas Stage */}
      <div 
        onClick={handleJump}
        className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0f1712] to-[#070b08] relative cursor-pointer group"
      >
        <div className="flex justify-between items-center text-[10px] text-neutral-400">
          <span>Click canvas or tap to Jump</span>
          <span className="text-emerald-400/80 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
            SPEED 1.4x
          </span>
        </div>

        {/* Stage floor & runner */}
        <div className="relative h-24 border-b-2 border-emerald-500/80 flex items-end justify-between px-6 pb-0 overflow-hidden">
          {/* Runner Dino / Character */}
          <div 
            className="transition-all duration-200 ease-out"
            style={{ transform: `translateY(-${playerY}px)` }}
          >
            <div className="w-7 h-7 bg-emerald-400 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.5)]">
              <div className="w-1.5 h-1.5 bg-black rounded-full ml-2 -mt-1" />
            </div>
          </div>

          {/* Obstacles */}
          <div className="flex items-end gap-16 pr-12">
            <div className="w-4 h-6 bg-emerald-700/80 rounded-t border-t border-l border-r border-emerald-400" />
            <div className="w-5 h-9 bg-emerald-700/80 rounded-t border-t border-l border-r border-emerald-400" />
          </div>

          {/* Cloud elements in background */}
          <div className="absolute top-2 right-16 w-8 h-2 bg-emerald-950/40 rounded-full" />
          <div className="absolute top-5 left-1/3 w-12 h-2.5 bg-emerald-950/40 rounded-full" />
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-400">
          <span>AABB Hitbox System</span>
          <span className="text-emerald-400 font-medium">Interactive Demo Available</span>
        </div>
      </div>
    </div>
  );
};
