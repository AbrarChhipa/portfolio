import React, { useState } from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  PlayCircle, 
  Boxes, 
  Palette, 
  Settings
} from 'lucide-react';
import { useWorkspace, SidebarView } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';

export const ActivityBar: React.FC = () => {
  const { sidebarView, setSidebarView } = useWorkspace();
  const { themes, themeId, setThemeId, currentTheme } = useTheme();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const navItems: { view: SidebarView; icon: React.ReactNode; label: string; shortcut?: string }[] = [
    { view: 'explorer', icon: <Files size={22} />, label: 'Explorer (⇧⌘E)' },
    { view: 'search', icon: <Search size={22} />, label: 'Search (⇧⌘F)' },
    { view: 'git', icon: <GitBranch size={22} />, label: 'Source Control (⌃⇧G)' },
    { view: 'debug', icon: <PlayCircle size={22} />, label: 'Run and Debug (⇧⌘D)' },
    { view: 'extensions', icon: <Boxes size={22} />, label: 'Extensions (⇧⌘X)' },
  ];

  return (
    <div className="w-12 bg-vscode-bg3 border-r border-vscode-border flex flex-col justify-between items-center py-2 select-none z-30 shrink-0">
      {/* Top Nav Icons */}
      <div className="flex flex-col items-center w-full gap-1">
        {navItems.map((item) => {
          const isActive = sidebarView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setSidebarView(item.view)}
              title={item.label}
              className={`w-full h-11 flex items-center justify-center relative group transition-colors ${
                isActive
                  ? 'text-vscode-bright'
                  : 'text-vscode-dim hover:text-vscode-text'
              }`}
            >
              {/* Active Left Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-vscode-blue2 shadow-[0_0_8px_var(--blue2)]" />
              )}
              {item.icon}
              {/* Tooltip */}
              <span className="absolute left-14 bg-vscode-bg4 text-vscode-text text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-vscode-border">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Icons: Theme Picker & Settings */}
      <div className="flex flex-col items-center w-full gap-1 relative">
        {/* Theme Picker Button */}
        <button
          onClick={() => setShowThemePicker(!showThemePicker)}
          title="Color Theme"
          className="w-full h-11 flex items-center justify-center text-vscode-dim hover:text-vscode-bright transition-colors relative group"
        >
          <Palette size={20} />
          <span className="absolute left-14 bg-vscode-bg4 text-vscode-text text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-vscode-border">
            Switch Color Theme ({currentTheme.name})
          </span>
        </button>

        {/* Theme Dropdown */}
        {showThemePicker && (
          <div className="absolute bottom-12 left-12 w-48 bg-vscode-bg2 border border-vscode-border rounded-md shadow-2xl py-1 z-50 animate-fade-in">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-vscode-dim uppercase tracking-wider border-b border-vscode-border">
              Color Themes
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setThemeId(t.id);
                  setShowThemePicker(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                  themeId === t.id ? 'text-vscode-blue font-medium bg-white/5' : 'text-vscode-text'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
                <div 
                  className="w-2.5 h-2.5 rounded-full border border-white/20" 
                  style={{ backgroundColor: t.accent }} 
                />
              </button>
            ))}
          </div>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setShowThemePicker(!showThemePicker)}
          title="Manage"
          className="w-full h-11 flex items-center justify-center text-vscode-dim hover:text-vscode-bright transition-colors group relative"
        >
          <Settings size={20} />
          <span className="absolute left-14 bg-vscode-bg4 text-vscode-text text-xs px-2 py-1 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-vscode-border">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};
