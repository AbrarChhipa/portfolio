import React from 'react';
import { BookOpen } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';
import { useWorkspace } from '../../context/WorkspaceContext';

export const ReadmeView: React.FC = () => {
  const { openFile } = useWorkspace();

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-4xl mx-auto font-sans animate-fade-in text-vscode-text">
      <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-6 sm:p-10 space-y-6">
        {/* Title & Badges */}
        <div className="border-b border-vscode-border pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-vscode-dim mb-2">
            <BookOpen size={14} className="text-vscode-blue" />
            <span>README.md</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight mb-3">
            Hi there, I'm {PERSONAL_INFO.name} 👋
          </h1>
          <p className="text-sm text-vscode-dim leading-relaxed">
            {PERSONAL_INFO.role} · {PERSONAL_INFO.location}
          </p>

          {/* Shields / Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#3178c6]/20 text-[#3178c6] border border-[#3178c6]/30">
              React Native: 1.5+ Years
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#4ec9b0]/20 text-[#4ec9b0] border border-[#4ec9b0]/30">
              Apps Shipped: 15+
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#ff6fd8]/20 text-[#ff6fd8] border border-[#ff6fd8]/30">
              AWS S3 4GB+ Multipart
            </span>
            <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#fabd2f]/20 text-[#fabd2f] border border-[#fabd2f]/30">
              B.Tech GPA: 8.4/10
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-display text-vscode-bright">
            🚀 About Me
          </h2>
          <p className="text-sm text-vscode-dim leading-relaxed">
            I am a mobile developer dedicated to crafting high-performance, polished cross-platform applications. My core expertise is in React Native, modern state management (Redux Toolkit &amp; RTK Query), high-throughput media streaming, and robust backend integrations (AWS S3, Razorpay, Firebase).
          </p>
        </div>

        {/* Quick Navigation / Table of Contents */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-display text-vscode-bright">
            📂 Workspace Files
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => openFile('home')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-vscode-blue">src/home.tsx</span>
              <span className="text-vscode-dim text-[11px]">Overview &amp; Stats</span>
            </button>
            <button
              onClick={() => openFile('about')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-[#e34c26]">src/about.html</span>
              <span className="text-vscode-dim text-[11px]">Bio &amp; Education</span>
            </button>
            <button
              onClick={() => openFile('projects')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-[#f7df1e]">src/projects.js</span>
              <span className="text-vscode-dim text-[11px]">Production Apps</span>
            </button>
            <button
              onClick={() => openFile('skills')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-[#dcdcaa]">data/skills.json</span>
              <span className="text-vscode-dim text-[11px]">Technical Stack</span>
            </button>
            <button
              onClick={() => openFile('experience')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-[#3178c6]">src/experience.ts</span>
              <span className="text-vscode-dim text-[11px]">Career Timeline</span>
            </button>
            <button
              onClick={() => openFile('contact')}
              className="text-left p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors flex items-center justify-between"
            >
              <span className="text-[#c586c0]">src/contact.css</span>
              <span className="text-vscode-dim text-[11px]">Get In Touch</span>
            </button>
          </div>
        </div>

        {/* Featured Projects highlights */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-display text-vscode-bright">
            ⭐ Highlights
          </h2>
          <div className="space-y-2">
            {PROJECTS.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3 rounded bg-white/[0.02] border border-vscode-border text-xs">
                <div className="flex items-center gap-2 font-bold text-vscode-bright mb-1">
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                </div>
                <p className="text-vscode-dim">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
