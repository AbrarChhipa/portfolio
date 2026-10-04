import React from 'react';
import { X, ChevronRight, SplitSquareVertical, MoreHorizontal, Play } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { FileIcon } from '../common/FileIcon';
import { PORTFOLIO_FILES } from '../../data/portfolioData';

export const EditorTabs: React.FC = () => {
  const { openTabs, activeTab, openFile, closeTab, currentFile, openSimulator } = useWorkspace();

  return (
    <div className="flex flex-col bg-vscode-bg select-none border-b border-vscode-border shrink-0">
      {/* Tab Bar */}
      <div className="flex items-center bg-vscode-bg2 min-w-0">
        <div className="flex flex-1 min-w-0 items-center overflow-x-auto no-scrollbar touch-scroll whitespace-nowrap">
          {openTabs.length === 0 && (
            <span className="px-3 py-2 text-xs text-vscode-dim truncate">
              No open files. Choose a file from the Explorer.
            </span>
          )}
          {openTabs.map((fileId) => {
            const file = PORTFOLIO_FILES.find((f) => f.id === fileId);
            if (!file) return null;
            const isActive = activeTab === fileId;

            return (
              <div
                key={fileId}
                onClick={() => openFile(fileId)}
                className={`group flex items-center gap-2 px-3 py-2 text-xs border-r border-vscode-border cursor-pointer transition-colors relative border-t-2 shrink-0 ${
                  isActive
                    ? 'bg-vscode-bg text-vscode-bright border-t-vscode-blue font-medium'
                    : 'bg-vscode-bg2 text-vscode-dim hover:bg-vscode-bg3 hover:text-vscode-text border-t-transparent'
                }`}
              >
                <FileIcon type={file.fileType} />
                <span className="font-mono text-[11px] sm:text-[12px] truncate max-w-[120px] sm:max-w-[160px]">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(fileId);
                  }}
                  className={`p-0.5 rounded-sm hover:bg-white/10 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity`}
                  title="Close (⌘W)"
                  aria-label={`Close ${file.name}`}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Tab Right Actions */}
        <div className="flex items-center gap-1 px-2 text-vscode-dim shrink-0 border-l border-vscode-border">
          <button 
            onClick={openSimulator}
            className="min-h-9 min-w-9 flex items-center justify-center hover:text-vscode-green hover:bg-white/10 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-vscode-blue"
            title="Run Project Demo"
            aria-label="Run Project Demo"
          >
            <Play size={13} fill="currentColor" />
          </button>
          <button className="hidden sm:block p-1 hover:text-vscode-bright hover:bg-white/10 rounded" title="Split Editor Right">
            <SplitSquareVertical size={13} />
          </button>
          <button className="hidden sm:block p-1 hover:text-vscode-bright hover:bg-white/10 rounded" title="More Actions">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      {openTabs.length > 0 && currentFile && (
        <div className="h-6 px-3 sm:px-4 bg-vscode-bg border-b border-vscode-border/40 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-vscode-dim font-mono overflow-x-auto no-scrollbar">
          <span className="hover:text-vscode-bright cursor-pointer" onClick={() => openFile('home')}>portfolio</span>
          <ChevronRight size={11} className="text-vscode-dim/60" />
          <span className="hover:text-vscode-bright cursor-pointer">{currentFile.folder}</span>
          <ChevronRight size={11} className="text-vscode-dim/60" />
          <div className="flex items-center gap-1 text-vscode-text font-medium">
            <FileIcon type={currentFile.fileType} size={11} />
            <span>{currentFile.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};
