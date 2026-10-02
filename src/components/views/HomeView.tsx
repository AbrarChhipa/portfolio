import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ArrowRight, 
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useWorkspace } from '../../context/WorkspaceContext';

export const HomeView: React.FC = () => {
  const { openFile, toggleTerminal } = useWorkspace();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.typewriterRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-5xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* Code Comment greeting */}
      <div className="font-mono text-sm text-vscode-green mb-3 flex items-center gap-2">
        <span>// hello world !! Welcome to my portfolio</span>
        <span className="w-2 h-2 rounded-full bg-vscode-green animate-pulse" />
      </div>

      {/* Main Name & Dynamic Role */}
      <div className="space-y-2 mb-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-vscode-bright">
          {PERSONAL_INFO.name}
        </h1>
        <div className="h-8 flex items-center">
          <p className="font-mono text-lg sm:text-xl text-vscode-blue flex items-center gap-2">
            <span>&gt;</span>
            <span className="font-semibold">{PERSONAL_INFO.typewriterRoles[roleIndex]}</span>
          </p>
        </div>
      </div>

      {/* Intro Summary */}
      <p className="text-base sm:text-lg text-vscode-dim max-w-3xl leading-relaxed mb-8">
        {PERSONAL_INFO.summary}
      </p>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-white/[0.02] border border-vscode-border hover:border-vscode-blue/50 hover:bg-white/[0.04] transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-vscode-bright font-mono">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-vscode-dim mt-1 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <button
          onClick={() => openFile('projects')}
          className="bg-vscode-blue2 hover:bg-vscode-blue text-white px-5 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-vscode-blue2/20"
        >
          <span>Explore Projects</span>
          <ArrowRight size={15} />
        </button>

        <button
          onClick={() => openFile('contact')}
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-5 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <span>Contact Me</span>
        </button>

        <a
          href="/Mohammad_Abrar_Resume.pdf"
          download="Mohammad_Abrar_Resume.pdf"
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-5 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Download size={15} className="text-vscode-red" />
          <span>Resume PDF</span>
        </a>

        <button
          onClick={toggleTerminal}
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-4 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-colors hidden sm:flex"
        >
          <Terminal size={15} className="text-vscode-green" />
          <span>Open Shell</span>
        </button>
      </div>

      {/* Social Badges */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-vscode-border/50 text-xs">
        <span className="text-vscode-dim font-mono">Connect:</span>
        <a
          href={PERSONAL_INFO.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright transition-colors"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>

        <a
          href={PERSONAL_INFO.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright transition-colors"
        >
          <Linkedin size={14} className="text-[#0a66c2]" />
          <span>LinkedIn</span>
        </a>

        <a
          href={PERSONAL_INFO.links.email}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright transition-colors"
        >
          <Mail size={14} className="text-vscode-green" />
          <span>{PERSONAL_INFO.email}</span>
        </a>

        <a
          href={PERSONAL_INFO.links.phone}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright transition-colors"
        >
          <Phone size={14} className="text-vscode-yellow" />
          <span>{PERSONAL_INFO.phone}</span>
        </a>
      </div>

      {/* Code Editor Teaser Block */}
      <div className="mt-12 bg-vscode-bg2/60 border border-vscode-border rounded-lg p-5 font-mono text-xs text-vscode-text leading-relaxed">
        <div className="text-vscode-dim mb-3 pb-2 border-b border-vscode-border/40 flex items-center justify-between">
          <span>// developer_manifest.ts</span>
          <span className="text-[10px] text-vscode-green">✓ Compiled</span>
        </div>
        <div><span className="text-vscode-purple">const</span> <span className="text-vscode-yellow">developer</span>: <span className="text-vscode-green">ReactMobileArchitect</span> = &#123;</div>
        <div className="pl-4"><span className="text-vscode-blue">name</span>: <span className="text-vscode-orange">"{PERSONAL_INFO.name}"</span>,</div>
        <div className="pl-4"><span className="text-vscode-blue">coreSpecialization</span>: <span className="text-vscode-orange">"React Native (iOS &amp; Android) + React.js"</span>,</div>
        <div className="pl-4"><span className="text-vscode-blue">heavyMediaProcessing</span>: [<span className="text-vscode-orange">"AWS S3 Multipart 4GB+"</span>, <span className="text-vscode-orange">"ZegoCloud Live RTC"</span>, <span className="text-vscode-orange">"Instagram Reels"</span>],</div>
        <div className="pl-4"><span className="text-vscode-blue">stateManagement</span>: [<span className="text-vscode-orange">"Redux Toolkit"</span>, <span className="text-vscode-orange">"RTK Query (30% latency reduced)"</span>],</div>
        <div className="pl-4"><span className="text-vscode-blue">paymentGateways</span>: [<span className="text-vscode-orange">"Razorpay Webhooks &amp; In-App SDK"</span>],</div>
        <div className="pl-4"><span className="text-vscode-blue">currentFocus</span>: <span className="text-vscode-orange">"Building fluid, high-performance mobile experiences"</span>,</div>
        <div>&#125;;</div>
      </div>
    </div>
  );
};
