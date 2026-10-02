import React, { useState } from 'react';
import { Github } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

export const ProjectsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobile' | 'system'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-5xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* Code comment header */}
      <p className="font-mono text-xs text-vscode-gcm mb-2 italic">
        // projects.js : things I've architected, built &amp; shipped
      </p>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight mb-1">
        Featured Projects
      </h1>
      <p className="font-mono text-xs text-vscode-dim mb-6">
        const projects: ProductionApp[] = [ ...shipped, ...engineering_solutions ];
      </p>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-vscode-border pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded transition-colors ${
            activeFilter === 'all'
              ? 'bg-vscode-blue2 text-white font-semibold'
              : 'text-vscode-dim hover:text-vscode-bright hover:bg-white/5'
          }`}
        >
          All ({PROJECTS.length})
        </button>
        <button
          onClick={() => setActiveFilter('mobile')}
          className={`px-3 py-1.5 rounded transition-colors ${
            activeFilter === 'mobile'
              ? 'bg-vscode-blue2 text-white font-semibold'
              : 'text-vscode-dim hover:text-vscode-bright hover:bg-white/5'
          }`}
        >
          Mobile Apps
        </button>
        <button
          onClick={() => setActiveFilter('system')}
          className={`px-3 py-1.5 rounded transition-colors ${
            activeFilter === 'system'
              ? 'bg-vscode-blue2 text-white font-semibold'
              : 'text-vscode-dim hover:text-vscode-bright hover:bg-white/5'
          }`}
        >
          Media &amp; Systems
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white/[0.02] border border-vscode-border rounded-lg p-6 flex flex-col justify-between hover:border-white/20 hover:-translate-y-1 hover:bg-white/[0.035] transition-all duration-200 shadow-lg"
            style={{
              borderLeftColor: project.accent,
              borderLeftWidth: '3px',
            }}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{project.icon}</span>
                  <span className="font-mono text-[11px] text-vscode-dim uppercase tracking-wider">
                    {project.period}
                  </span>
                </div>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded bg-white/5 text-vscode-dim hover:text-vscode-bright hover:bg-white/10 transition-colors"
                    title="View Source on GitHub"
                  >
                    <Github size={15} />
                  </a>
                )}
              </div>

              {/* Title & Tagline */}
              <h2 className="text-lg font-bold font-display text-vscode-bright mb-1 group-hover:text-vscode-blue transition-colors">
                {project.name}
              </h2>
              <p className="text-xs text-vscode-dim font-medium mb-3">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs text-vscode-text/90 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5 mb-5 bg-black/20 p-3 rounded border border-vscode-border/50 text-[11px] text-vscode-dim">
                <div className="text-[10px] uppercase tracking-wider text-vscode-yellow font-mono font-bold mb-1">
                  Key Technical Feats:
                </div>
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-vscode-green shrink-0">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-vscode-border/50">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-vscode-bright border border-vscode-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
