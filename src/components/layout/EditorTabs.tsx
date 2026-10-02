import React from 'react';
import { X, ChevronRight, SplitSquareVertical, MoreHorizontal, Play } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { FileIcon } from '../common/FileIcon';
import { PORTFOLIO_FILES } from '../../data/portfolioData';

export const EditorTabs: React.FC = () => {
  const { openTabs, activeTab, openFile, closeTab, currentFile } = useWorkspace();

  if (openTabs.length === 0) {
    return (
      <div className="h-9 bg-vscode-bg2 border-b border-vscode-border flex items-center px-4 text-xs text-vscode-dim">
        No open files. Choose a file from the Explorer.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-vscode-bg select-none border-b border-vscode-border">
      {/* Tab Bar */}
      <div className="flex items-center justify-between bg-vscode-bg2 overflow-x-auto no-scrollbar">
        <div className="flex items-center">
          {openTabs.map((fileId) => {
            const file = PORTFOLIO_FILES.find((f) => f.id === fileId);
            if (!file) return null;
            const isActive = activeTab === fileId;

            return (
              <div
                key={fileId}
                onClick={() => openFile(fileId)}
                className={`group flex items-center gap-2 px-3 py-2 text-xs border-r border-vscode-border cursor-pointer transition-colors relative border-t-2 ${
                  isActive
                    ? 'bg-vscode-bg text-vscode-bright border-t-vscode-blue font-medium'
                    : 'bg-vscode-bg2 text-vscode-dim hover:bg-vscode-bg3 hover:text-vscode-text border-t-transparent'
                }`}
              >
                <FileIcon type={file.fileType} />
                <span className="font-mono text-[12px] truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(fileId);
                  }}
                  className={`p-0.5 rounded-sm hover:bg-white/10 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity`}
                  title="Close (⌘W)"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Tab Right Actions */}
        <div className="hidden sm:flex items-center gap-2 pr-3 text-vscode-dim">
          <button 
            onClick={() => openFile('projects')}
            className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded" 
            title="Run Project Demo"
          >
            <Play size={13} fill="currentColor" />
          </button>
          <button className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded" title="Split Editor Right">
            <SplitSquareVertical size={13} />
          </button>
          <button className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded" title="More Actions">
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      {currentFile && (
        <div className="h-6 px-4 bg-vscode-bg border-b border-vscode-border/40 flex items-center gap-1.5 text-[11px] text-vscode-dim font-mono">
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
