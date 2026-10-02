import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';

export const ResumeView: React.FC = () => {
  return (
    <div className="min-h-full px-4 py-8 md:px-12 md:py-10 max-w-5xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-vscode-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-vscode-dim mb-1">
            <FileText size={14} className="text-vscode-red" />
            <span>Mohammad_Abrar_Resume.pdf</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-vscode-bright">
            Resume / Curriculum Vitae
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/Mohammad_Abrar_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 border border-vscode-border text-xs text-vscode-bright hover:bg-white/10 transition-colors"
          >
            <ExternalLink size={14} />
            <span>Open in Tab</span>
          </a>

          <a
            href="/Mohammad_Abrar_Resume.pdf"
            download="Mohammad_Abrar_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded bg-vscode-blue2 hover:bg-vscode-blue text-xs font-semibold text-white transition-colors shadow-lg"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer Frame */}
      <div className="w-full bg-vscode-bg2 rounded-lg border border-vscode-border overflow-hidden shadow-2xl h-[70vh] sm:h-[80vh]">
        <iframe
          src="/Mohammad_Abrar_Resume.pdf"
          title="Mohammad Abrar Resume"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
