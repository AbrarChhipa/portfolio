import React, { useState } from 'react';
import { 
  GitBranch, 
  RotateCw, 
  AlertCircle, 
  AlertTriangle, 
  Bell, 
  CheckCheck, 
  Radio
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';

export const StatusBar: React.FC = () => {
  const { currentFile, toggleTerminal } = useWorkspace();
  const { currentTheme, setThemeId, themes } = useTheme();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const handleNotificationClick = () => {
    setNotificationMsg("Mohammad Abrar is actively open for React Native developer opportunities!");
    setTimeout(() => setNotificationMsg(null), 4500);
  };

  return (
    <div className="h-6 bg-vscode-title border-t border-vscode-border flex items-center justify-between px-2 text-[11px] text-vscode-dim select-none z-40 relative">
      {/* Toast Notification overlay */}
      {notificationMsg && (
        <div className="absolute bottom-8 right-4 bg-vscode-bg2 border border-vscode-blue text-vscode-bright px-3 py-2 rounded shadow-2xl flex items-center gap-2 animate-fade-in z-50">
          <Radio size={14} className="text-vscode-blue animate-pulse" />
          <span>{notificationMsg}</span>
          <button 
            onClick={() => setNotificationMsg(null)}
            className="ml-2 text-vscode-dim hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Left items */}
      <div className="flex items-center gap-3">
        {/* Remote indicator */}
        <div className="bg-vscode-blue2 text-white px-2 py-0.5 rounded-[2px] font-bold flex items-center gap-1 cursor-pointer">
          <span className="text-[10px]">&gt;&lt;</span>
          <span className="hidden sm:inline">portfolio: main</span>
        </div>

        {/* Git branch */}
        <div className="flex items-center gap-1 hover:text-vscode-bright cursor-pointer">
          <GitBranch size={12} />
          <span>main</span>
        </div>

        {/* Sync */}
        <div className="hover:text-vscode-bright cursor-pointer hidden sm:flex items-center">
          <RotateCw size={11} />
        </div>

        {/* Errors & Warnings */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-vscode-bright" onClick={toggleTerminal}>
          <span className="flex items-center gap-0.5 text-vscode-dim">
            <AlertCircle size={11} /> 0
          </span>
          <span className="flex items-center gap-0.5 text-vscode-dim">
            <AlertTriangle size={11} /> 0
          </span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center gap-3">
        {/* Line & Column */}
        <span className="hidden md:inline hover:text-vscode-bright cursor-pointer">Ln 1, Col 1</span>
        
        {/* Indentation */}
        <span className="hidden md:inline hover:text-vscode-bright cursor-pointer">Spaces: 2</span>

        {/* Encoding */}
        <span className="hidden lg:inline hover:text-vscode-bright cursor-pointer">UTF-8</span>

        {/* Language Mode */}
        <span className="hover:text-vscode-bright cursor-pointer font-medium text-vscode-text">
          {currentFile ? currentFile.lang : 'Plain Text'}
        </span>

        {/* Prettier */}
        <div className="hidden sm:flex items-center gap-1 text-vscode-green cursor-pointer hover:text-vscode-bright" title="Prettier Enabled">
          <CheckCheck size={12} />
          <span>Prettier</span>
        </div>

        {/* Theme Picker trigger */}
        <div 
          onClick={() => setShowThemeModal(!showThemeModal)}
          className="flex items-center gap-1 cursor-pointer hover:text-vscode-bright text-vscode-text px-1 rounded hover:bg-white/10"
          title="Change Theme"
        >
          <span>{currentTheme.icon}</span>
          <span className="hidden sm:inline">{currentTheme.name}</span>
        </div>

        {/* Notification Bell */}
        <div 
          onClick={handleNotificationClick}
          className="hover:text-vscode-bright cursor-pointer p-0.5 rounded hover:bg-white/10 relative" 
          title="Notifications"
        >
          <Bell size={12} />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-vscode-blue rounded-full" />
        </div>
      </div>

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="absolute bottom-7 right-2 w-48 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 z-50">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-vscode-dim font-bold border-b border-vscode-border">
            Select Color Theme
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setThemeId(t.id);
                setShowThemeModal(false);
              }}
              className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between text-xs transition-colors"
            >
              <span>{t.icon} {t.name}</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
