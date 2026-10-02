import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, Palette, Download, ExternalLink, Mail, Copy } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { PORTFOLIO_FILES, PERSONAL_INFO } from '../../data/portfolioData';
import { FileIcon } from '../common/FileIcon';

interface PaletteItem {
  id: string;
  category: 'file' | 'theme' | 'action';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, openFile, toggleTerminal } = useWorkspace();
  const { themes, setThemeId } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut listener for Cmd+P / Ctrl+P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Construct items
  const allItems: PaletteItem[] = [
    // Files
    ...PORTFOLIO_FILES.map((f) => ({
      id: `file-${f.id}`,
      category: 'file' as const,
      title: f.name,
      subtitle: `${f.folder} · ${f.description}`,
      icon: <FileIcon type={f.fileType} size={14} />,
      action: () => openFile(f.id),
    })),
    // Mail & Contact Actions
    {
      id: 'action-gmail',
      category: 'action' as const,
      title: 'Mail: Compose Email via Gmail',
      subtitle: `Open Gmail in new tab (${PERSONAL_INFO.email})`,
      icon: <Mail size={14} className="text-vscode-green" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email).catch(() => {});
        window.open(PERSONAL_INFO.links.gmail, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'action-contact-tab',
      category: 'action' as const,
      title: 'Mail: Open Contact Center (contact.css)',
      subtitle: 'In-app message form & direct channels',
      icon: <Mail size={14} className="text-vscode-blue" />,
      action: () => openFile('contact'),
    },
    {
      id: 'action-copy-email',
      category: 'action' as const,
      title: 'Mail: Copy Email Address',
      subtitle: PERSONAL_INFO.email,
      icon: <Copy size={14} className="text-vscode-yellow" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email).catch(() => {});
      },
    },
    // LinkedIn
    {
      id: 'action-linkedin',
      category: 'action' as const,
      title: 'External: Visit LinkedIn Profile',
      subtitle: PERSONAL_INFO.links.linkedin,
      icon: <ExternalLink size={14} className="text-[#0a66c2]" />,
      action: () => window.open(PERSONAL_INFO.links.linkedin, '_blank', 'noopener,noreferrer'),
    },
    // GitHub
    {
      id: 'action-github',
      category: 'action' as const,
      title: 'External: Visit GitHub Profile',
      subtitle: PERSONAL_INFO.links.github,
      icon: <ExternalLink size={14} className="text-vscode-green" />,
      action: () => window.open(PERSONAL_INFO.links.github, '_blank', 'noopener,noreferrer'),
    },
    // Actions
    {
      id: 'action-terminal',
      category: 'action' as const,
      title: 'View: Toggle Terminal Panel',
      subtitle: 'Open or close the bottom terminal and console',
      icon: <Terminal size={14} className="text-vscode-blue" />,
      action: () => toggleTerminal(),
    },
    {
      id: 'action-resume',
      category: 'action' as const,
      title: 'File: Download Resume (PDF)',
      subtitle: 'Save Mohammad_Abrar_Resume.pdf locally',
      icon: <Download size={14} className="text-vscode-red" />,
      action: () => {
        const link = document.createElement('a');
        link.href = '/Mohammad_Abrar_Resume.pdf';
        link.download = 'Mohammad_Abrar_Resume.pdf';
        link.click();
      },
    },
    // Themes
    ...themes.map((t) => ({
      id: `theme-${t.id}`,
      category: 'theme' as const,
      title: `Preferences: Color Theme - ${t.name}`,
      subtitle: `Apply ${t.name} VS Code color scheme`,
      icon: <Palette size={14} style={{ color: t.accent }} />,
      action: () => setThemeId(t.id),
    })),
  ];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (item: PaletteItem) => {
    item.action();
    setCommandPaletteOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-vscode-bg2 border border-vscode-border rounded-lg shadow-2xl overflow-hidden flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-vscode-border bg-vscode-bg">
          <Search size={16} className="text-vscode-blue" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or filename (e.g. mail, projects, theme, linkedin)..."
            className="flex-1 bg-transparent text-sm text-vscode-bright placeholder-vscode-dim outline-none"
          />
          <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-vscode-dim">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? 'bg-vscode-blue2 text-white'
                      : 'text-vscode-text hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="font-medium truncate">{item.title}</span>
                  </div>
                  {item.subtitle && (
                    <span className={`text-[11px] truncate ml-3 ${
                      isSelected ? 'text-white/80' : 'text-vscode-dim'
                    }`}>
                      {item.subtitle}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-vscode-dim text-xs">
              No matching commands or files.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
