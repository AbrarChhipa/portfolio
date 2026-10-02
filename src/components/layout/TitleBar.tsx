import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Maximize2, 
  Minimize2, 
  Terminal, 
  Download, 
  Github, 
  Linkedin,
  Mail,
  ExternalLink 
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const TitleBar: React.FC = () => {
  const { 
    setCommandPaletteOpen, 
    toggleTerminal, 
    setSidebarView, 
    openFile, 
    currentFile 
  } = useWorkspace();
  const { currentTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="h-9 bg-vscode-title border-b border-vscode-border flex items-center justify-between px-3 text-xs text-vscode-text select-none z-40 relative">
      {/* Left: Window Controls & Dropdown Menus */}
      <div className="flex items-center gap-3" ref={menuRef}>
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 pr-2">
          <div 
            onClick={() => window.close()} 
            title="Close" 
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity" 
          />
          <div 
            onClick={() => setActiveMenu(null)} 
            title="Minimize" 
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80 transition-opacity" 
          />
          <div 
            onClick={toggleFullscreen} 
            title="Fullscreen" 
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition-opacity" 
          />
        </div>

        {/* VS Code Logo */}
        <div className="flex items-center gap-1.5 font-semibold text-vscode-bright">
          <span className="text-[#007acc] text-sm">🔷</span>
          <span className="hidden md:inline font-mono">Code</span>
        </div>

        {/* Menu Bar Dropdowns */}
        <div className="hidden lg:flex items-center gap-0.5">
          {/* File Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick('file')}
              className={`px-2 py-0.5 rounded hover:bg-white/10 transition-colors ${
                activeMenu === 'file' ? 'bg-white/15' : ''
              }`}
            >
              File
            </button>
            {activeMenu === 'file' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-vscode-bg2 border border-vscode-border rounded shadow-2xl py-1 z-50 text-vscode-text">
                <button
                  onClick={() => { openFile('home'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Open home.tsx</span>
                  <span className="text-[10px] text-vscode-dim">⌘1</span>
                </button>
                <button
                  onClick={() => { openFile('projects'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Open projects.js</span>
                  <span className="text-[10px] text-vscode-dim">⌘2</span>
                </button>
                <button
                  onClick={() => { openFile('contact'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Open contact.css (Mail)</span>
                  <span className="text-[10px] text-vscode-dim">⌘3</span>
                </button>
                <div className="my-1 border-t border-vscode-border" />
                <a
                  href="/Mohammad_Abrar_Resume.pdf"
                  download="Mohammad_Abrar_Resume.pdf"
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Download size={13} />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            )}
          </div>

          {/* View Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick('view')}
              className={`px-2 py-0.5 rounded hover:bg-white/10 transition-colors ${
                activeMenu === 'view' ? 'bg-white/15' : ''
              }`}
            >
              View
            </button>
            {activeMenu === 'view' && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-vscode-bg2 border border-vscode-border rounded shadow-2xl py-1 z-50 text-vscode-text">
                <button
                  onClick={() => { setCommandPaletteOpen(true); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Command Palette...</span>
                  <span className="text-[10px] text-vscode-dim">⌘P</span>
                </button>
                <button
                  onClick={() => { setSidebarView('explorer'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Explorer</span>
                  <span className="text-[10px] text-vscode-dim">⇧⌘E</span>
                </button>
                <button
                  onClick={() => { setSidebarView('search'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Search</span>
                  <span className="text-[10px] text-vscode-dim">⇧⌘F</span>
                </button>
                <button
                  onClick={() => { toggleTerminal(); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center justify-between"
                >
                  <span>Toggle Terminal</span>
                  <span className="text-[10px] text-vscode-dim">⌃`</span>
                </button>
              </div>
            )}
          </div>

          {/* Terminal Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick('terminal')}
              className={`px-2 py-0.5 rounded hover:bg-white/10 transition-colors ${
                activeMenu === 'terminal' ? 'bg-white/15' : ''
              }`}
            >
              Terminal
            </button>
            {activeMenu === 'terminal' && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-vscode-bg2 border border-vscode-border rounded shadow-2xl py-1 z-50 text-vscode-text">
                <button
                  onClick={() => { toggleTerminal(); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Terminal size={13} />
                  <span>Toggle Terminal Panel</span>
                </button>
              </div>
            )}
          </div>

          {/* Help Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick('help')}
              className={`px-2 py-0.5 rounded hover:bg-white/10 transition-colors ${
                activeMenu === 'help' ? 'bg-white/15' : ''
              }`}
            >
              Help
            </button>
            {activeMenu === 'help' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-vscode-bg2 border border-vscode-border rounded shadow-2xl py-1 z-50 text-vscode-text">
                <button
                  onClick={() => { openFile('about'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white"
                >
                  About Mohammad Abrar
                </button>
                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Linkedin size={13} className="text-[#0a66c2]" />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Github size={13} />
                  <span>GitHub Profile</span>
                </a>
                <div className="my-1 border-t border-vscode-border" />
                <a
                  href={PERSONAL_INFO.links.gmail}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Mail size={13} className="text-vscode-green" />
                  <span>Compose in Gmail (New Tab)</span>
                </a>
                <button
                  onClick={() => { openFile('contact'); setActiveMenu(null); }}
                  className="w-full text-left px-3 py-1.5 hover:bg-vscode-blue2 hover:text-white flex items-center gap-2"
                >
                  <Mail size={13} className="text-vscode-blue" />
                  <span>In-App Contact (contact.css)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center: Interactive Search / Command Palette Bar */}
      <div 
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center justify-center gap-2 bg-vscode-bg3/80 hover:bg-vscode-bg3 border border-vscode-border/80 hover:border-vscode-blue2 px-3 py-1 rounded-md text-xs cursor-pointer text-vscode-dim hover:text-vscode-text w-64 md:w-96 max-w-lg transition-all shadow-inner"
        title="Quick Search & Command Palette (Ctrl+P / Cmd+P)"
      >
        <Search size={13} />
        <span className="truncate">
          {PERSONAL_INFO.name} — {currentFile ? currentFile.name : 'portfolio'}
        </span>
        <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-vscode-dim font-mono">
          ⌘P
        </kbd>
      </div>

      {/* Right: Window & Status Actions */}
      <div className="flex items-center gap-2 text-vscode-dim">
        <span className="hidden xl:inline text-[11px] text-vscode-dim bg-white/5 px-2 py-0.5 rounded border border-vscode-border">
          {currentTheme.name}
        </span>
        <button
          onClick={toggleTerminal}
          className="p-1 rounded hover:bg-white/10 hover:text-vscode-bright transition-colors"
          title="Toggle Terminal (Ctrl+`)"
        >
          <Terminal size={14} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-1 rounded hover:bg-white/10 hover:text-vscode-bright transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  );
};
