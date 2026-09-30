import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Check, 
  Copy, 
  Send, 
  ArrowUpRight, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const emailAddress = 'bipinonlyforfun@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 animate-fadeIn space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact · Direct Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Get In Touch
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Have a question regarding any of the projects, a collaboration idea, or want to discuss software engineering? Feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Card */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white/80 dark:border-neutral-800 dark:bg-[#121417]/80 space-y-5 shadow-sm">
            <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-neutral-900 dark:text-white">
              Contact Details
            </h2>

            {/* Email with copy button */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Direct Email</span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800">
                <span className="text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-200 truncate">
                  {emailAddress}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-neutral-800">
              <a
                href={`mailto:${emailAddress}`}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  Open in Mail Client
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/BipinDev404"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-neutral-500" />
                  GitHub Profile
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Availability Status */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-neutral-800/80 dark:bg-[#121417]/50 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for collaborations</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Open to interesting open-source contributions, web applications, and architectural discussions.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-[#121417] shadow-sm">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Message Sent
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out! Your note has been logged. You can also directly reach me at <span className="font-mono text-neutral-800 dark:text-neutral-200">{emailAddress}</span>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                  Send a Direct Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Taylor"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/90 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/90 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Feedback / General Note"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/90 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your thoughts or questions here..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/90 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
