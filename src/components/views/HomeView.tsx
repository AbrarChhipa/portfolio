import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ArrowRight, 
  Terminal,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useWorkspace } from '../../context/WorkspaceContext';

export const HomeView: React.FC = () => {
  const { openFile, toggleTerminal } = useWorkspace();
  const [roleIndex, setRoleIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.typewriterRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Copy to clipboard
    navigator.clipboard.writeText(PERSONAL_INFO.email).catch(() => {});
    setToastMessage(`Opening Gmail & copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setToastMessage(null), 4000);

    // Open Gmail composer in a new tab
    window.open(PERSONAL_INFO.links.gmail, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-full px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-14 max-w-5xl mx-auto font-sans text-vscode-text relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-12 right-4 sm:right-6 bg-vscode-bg2 border border-vscode-green text-vscode-bright px-3.5 py-2 rounded-lg shadow-2xl flex items-center gap-2 z-50 animate-fade-in text-xs font-mono">
          <Check size={14} className="text-vscode-green" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-vscode-dim hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Code Comment greeting with slide-up motion */}
      <div className="font-mono text-xs sm:text-sm text-vscode-green mb-3 flex items-center gap-2 animate-slide-up delay-100">
        <span>// hello world !! Welcome to my portfolio</span>
        <span className="w-2 h-2 rounded-full bg-vscode-green animate-pulse" />
      </div>

      {/* Main Name & Dynamic Rotating Role */}
      <div className="space-y-2 mb-5 animate-slide-up delay-150">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-vscode-bright">
          {PERSONAL_INFO.name}
        </h1>
        <div className="h-8 flex items-center">
          <p className="font-mono text-base sm:text-xl text-vscode-blue flex items-center gap-2">
            <span className="text-vscode-green font-bold">&gt;</span>
            <span className="font-semibold transition-all duration-300">{PERSONAL_INFO.typewriterRoles[roleIndex]}</span>
            <span className="w-1.5 h-4 sm:h-5 bg-vscode-blue inline-block animate-cursor" />
          </p>
        </div>
      </div>

      {/* Intro Summary */}
      <p className="text-sm sm:text-base md:text-lg text-vscode-dim max-w-3xl leading-relaxed mb-7 animate-slide-up delay-200">
        {PERSONAL_INFO.summary}
      </p>

      {/* Quick Stats Grid with Hover Lift & Staggered Entrance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-8 animate-slide-up delay-250">
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-lg bg-white/[0.02] border border-vscode-border hover:border-vscode-blue/50 hover:bg-white/[0.04] hover-lift transition-all"
          >
            <div className="text-xl sm:text-3xl font-extrabold text-vscode-bright font-mono">
              {stat.value}
            </div>
            <div className="text-[11px] sm:text-sm text-vscode-dim mt-0.5 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons with Staggered Entrance */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8 animate-slide-up delay-300">
        <button
          onClick={() => openFile('projects')}
          className="bg-vscode-blue2 hover:bg-vscode-blue text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded text-xs sm:text-sm font-medium flex items-center gap-2 hover-lift transition-all shadow-lg hover:shadow-vscode-blue2/20"
        >
          <span>Explore Projects</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => openFile('contact')}
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-4 py-2 sm:px-5 sm:py-2.5 rounded text-xs sm:text-sm font-medium flex items-center gap-2 hover-lift transition-colors"
        >
          <span>Contact Me</span>
        </button>

        <a
          href="/Mohammad_Abrar_Resume.pdf"
          download="Mohammad_Abrar_Resume.pdf"
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-4 py-2 sm:px-5 sm:py-2.5 rounded text-xs sm:text-sm font-medium flex items-center gap-2 hover-lift transition-colors"
        >
          <Download size={14} className="text-vscode-red" />
          <span>Resume PDF</span>
        </a>

        <button
          onClick={toggleTerminal}
          className="bg-white/5 hover:bg-white/10 text-vscode-bright border border-vscode-border px-3.5 py-2 sm:px-4 sm:py-2.5 rounded text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors hidden sm:flex"
        >
          <Terminal size={14} className="text-vscode-green" />
          <span>Open Shell</span>
        </button>
      </div>

      {/* Social Badges with Staggered Entrance */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-vscode-border/50 text-xs animate-slide-up delay-400">
        <span className="text-vscode-dim font-mono text-[11px] sm:text-xs">Connect:</span>
        <a
          href={PERSONAL_INFO.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright hover-lift transition-colors"
        >
          <Github size={13} />
          <span>GitHub</span>
        </a>

        <a
          href={PERSONAL_INFO.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright hover-lift transition-colors"
        >
          <Linkedin size={13} className="text-[#0a66c2]" />
          <span>LinkedIn</span>
        </a>

        {/* Email Badge with Smart Gmail & Copy Handler */}
        <button
          onClick={handleEmailClick}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-green text-vscode-text hover:text-vscode-bright hover-lift transition-colors group cursor-pointer"
          title="Click to open in Gmail and copy address"
        >
          <Mail size={13} className="text-vscode-green group-hover:scale-110 transition-transform" />
          <span className="truncate max-w-[180px] sm:max-w-none">{PERSONAL_INFO.email}</span>
        </button>

        <a
          href={PERSONAL_INFO.links.phone}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded bg-white/[0.03] border border-vscode-border hover:border-vscode-blue text-vscode-text hover:text-vscode-bright hover-lift transition-colors"
        >
          <Phone size={13} className="text-vscode-yellow" />
          <span>{PERSONAL_INFO.phone}</span>
        </a>
      </div>

      {/* Code Editor Teaser Block with Staggered Entrance */}
      <div className="mt-8 sm:mt-10 bg-vscode-bg2/60 border border-vscode-border rounded-lg p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-vscode-text leading-relaxed overflow-x-auto no-scrollbar animate-slide-up delay-500">
        <div className="text-vscode-dim mb-2.5 pb-2 border-b border-vscode-border/40 flex items-center justify-between">
          <span>// developer_manifest.ts</span>
          <span className="text-[10px] text-vscode-green font-semibold">✓ Compiled</span>
        </div>
        <div><span className="text-vscode-purple">const</span> <span className="text-vscode-yellow">developer</span>: <span className="text-vscode-green">ReactMobileArchitect</span> = &#123;</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">name</span>: <span className="text-vscode-orange">"{PERSONAL_INFO.name}"</span>,</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">primaryStack</span>: <span className="text-vscode-orange">"React Native (Android &amp; iOS) + React.js"</span>,</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">coreArchitecture</span>: [<span className="text-vscode-orange">"Cross-Platform Android &amp; iOS"</span>, <span className="text-vscode-orange">"Redux Toolkit &amp; RTK Query"</span>, <span className="text-vscode-orange">"Reels &amp; Live Streaming"</span>, <span className="text-vscode-orange">"Razorpay Gateways"</span>],</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">stateManagement</span>: [<span className="text-vscode-orange">"Redux Toolkit"</span>, <span className="text-vscode-orange">"RTK Query (30% latency reduced)"</span>],</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">paymentGateways</span>: [<span className="text-vscode-orange">"Razorpay Webhooks &amp; In-App SDK"</span>],</div>
        <div className="pl-3 sm:pl-4"><span className="text-vscode-blue">currentFocus</span>: <span className="text-vscode-orange">"Building fluid, high-performance mobile experiences"</span>,</div>
        <div>&#125;;</div>
      </div>
    </div>
  );
};
