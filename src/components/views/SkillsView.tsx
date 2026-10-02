import React, { useState } from 'react';
import { Code2, LayoutGrid, Copy, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export const SkillsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(
    {
      developer: "Mohammad Abrar",
      competencies: SKILL_CATEGORIES.map((c) => ({
        domain: c.category,
        technologies: c.skills.map((s) => ({
          name: s.name,
          level: s.level,
          proficiency: `${s.proficiency}%`,
        })),
      })),
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-5xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* Code comment header */}
      <p className="font-mono text-xs text-vscode-gcm mb-2 italic">
        // skills.json — technical skills &amp; core competencies
      </p>

      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight">
          Skills Arsenal
        </h1>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-md border border-vscode-border text-xs font-mono self-start sm:self-auto">
          <button
            onClick={() => setViewMode('visual')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewMode === 'visual'
                ? 'bg-vscode-blue2 text-white font-medium'
                : 'text-vscode-dim hover:text-vscode-bright'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Visual Cards</span>
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              viewMode === 'json'
                ? 'bg-vscode-blue2 text-white font-medium'
                : 'text-vscode-dim hover:text-vscode-bright'
            }`}
          >
            <Code2 size={13} />
            <span>Raw JSON</span>
          </button>
        </div>
      </div>

      <p className="font-mono text-xs text-vscode-dim mb-8">
        &#123; "status": "shipping_production", "focus": "mobile_performance" &#125;
      </p>

      {/* VISUAL CARDS VIEW */}
      {viewMode === 'visual' ? (
        <div className="space-y-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="bg-white/[0.02] border border-vscode-border rounded-lg p-6 hover:border-vscode-blue/30 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-vscode-border/50">
                <span className="text-xl">{category.icon}</span>
                <h2 className="text-base sm:text-lg font-bold font-display text-vscode-bright">
                  {category.category}
                </h2>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3 rounded bg-white/[0.02] border transition-all ${
                      skill.highlight
                        ? 'border-vscode-blue/40 bg-vscode-blue/5'
                        : 'border-vscode-border/60 hover:border-vscode-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-xs text-vscode-bright">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="text-[9px] font-mono bg-vscode-blue/20 text-vscode-blue px-1.5 py-0.5 rounded font-bold">
                          TOP
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-vscode-dim mb-2 font-mono">
                      <span>{skill.level}</span>
                      <span>{skill.proficiency}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${skill.proficiency}%`,
                          backgroundColor: skill.highlight ? 'var(--blue)' : 'var(--green)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* RAW JSON VIEW */
        <div className="relative bg-vscode-bg2/90 border border-vscode-border rounded-lg p-5 font-mono text-xs overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-vscode-border/50 text-vscode-dim">
            <span>data/skills.json</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-vscode-bright transition-colors"
            >
              {copied ? <Check size={12} className="text-vscode-green" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="text-vscode-text leading-relaxed whitespace-pre-wrap">
            {jsonString}
          </pre>
        </div>
      )}
    </div>
  );
};
