import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceView: React.FC = () => {
  return (
    <div className="min-h-full px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-14 max-w-4xl mx-auto font-sans text-vscode-text">
      {/* Code comment header */}
      <p className="font-mono text-xs text-vscode-gcm mb-2 italic animate-slide-up delay-100">
        // experience.ts — professional career timeline &amp; accomplishments
      </p>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight mb-1 animate-slide-up delay-150">
        Experience
      </h1>
      <p className="font-mono text-xs text-vscode-dim mb-8 animate-slide-up delay-200">
        interface CareerTimeline extends ProfessionalMilestones &#123;&#125;
      </p>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-vscode-border/80 ml-2.5 sm:ml-4 pl-4 sm:pl-8 space-y-8 sm:space-y-12 animate-slide-up delay-250">
        {EXPERIENCES.map((exp, idx) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Dot Indicator with Pulse on Current */}
            <div
              className={`absolute -left-[23px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                exp.current
                  ? 'bg-vscode-blue border-vscode-blue shadow-[0_0_10px_var(--blue)] animate-pulse'
                  : 'bg-vscode-bg border-vscode-dim group-hover:border-vscode-bright'
              }`}
            />

            {/* Experience Card */}
            <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-4 sm:p-6 hover:border-vscode-blue/40 hover-lift transition-all">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h2 className="text-base sm:text-xl font-bold font-display text-vscode-bright">
                    {exp.role}
                  </h2>
                  <div className="text-xs sm:text-sm font-semibold text-vscode-blue mt-0.5">
                    @ {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0">
                  {exp.current && (
                    <span className="text-[10px] font-mono font-bold bg-vscode-green/10 text-vscode-green border border-vscode-green/30 px-2 py-0.5 rounded">
                      Present
                    </span>
                  )}
                  <span className="text-xs font-mono text-vscode-dim flex items-center gap-1">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>
              </div>

              {/* Location & Type */}
              <div className="flex items-center gap-2 text-xs text-vscode-dim mb-3 sm:mb-4">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {exp.location}
                </span>
                <span>•</span>
                <span>{exp.type}</span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-vscode-text/90 leading-relaxed mb-4">
                {exp.summary}
              </p>

              {/* Achievements Bullets */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-vscode-yellow font-bold">
                  Key Production Contributions:
                </div>
                {exp.achievements.map((item, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-1.5 sm:gap-2 text-xs text-vscode-dim leading-relaxed">
                    <span className="text-vscode-blue shrink-0 mt-0.5">▹</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-vscode-border/50">
                {exp.technologies.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-vscode-bright border border-vscode-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
