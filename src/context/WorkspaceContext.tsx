import React, { createContext, useContext, useState } from 'react';
import { PORTFOLIO_FILES, PortfolioFile } from '../data/portfolioData';

export type SidebarView = 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | null;
export type TerminalTab = 'terminal' | 'output' | 'problems' | 'debug';

interface WorkspaceContextType {
  activeTab: string;
  openTabs: string[];
  sidebarView: SidebarView;
  isSidebarOpen: boolean;
  terminalOpen: boolean;
  terminalTab: TerminalTab;
  commandPaletteOpen: boolean;
  searchQuery: string;
  currentFile: PortfolioFile;
  openFile: (fileId: string) => void;
  closeTab: (fileId: string) => void;
  closeAllTabs: () => void;
  setSidebarView: (view: SidebarView) => void;
  toggleSidebar: () => void;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setTerminalTab: (tab: TerminalTab) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [openTabs, setOpenTabs] = useState<string[]>([
    'home',
    'about',
    'projects',
    'skills',
    'experience',
    'contact',
    'readme',
  ]);
  const [sidebarView, setSidebarViewInternal] = useState<SidebarView>('explorer');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(true);
  const [terminalTab, setTerminalTab] = useState<TerminalTab>('terminal');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isSidebarOpen = sidebarView !== null;

  const openFile = (fileId: string) => {
    if (fileId === 'resume') {
      // Also trigger file open for preview
      if (!openTabs.includes('resume')) {
        setOpenTabs((prev) => [...prev, 'resume']);
      }
      setActiveTab('resume');
      return;
    }

    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
    setActiveTab(fileId);
  };

  const closeTab = (fileId: string) => {
    const newTabs = openTabs.filter((id) => id !== fileId);
    setOpenTabs(newTabs);
    if (activeTab === fileId) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1]);
      } else {
        setActiveTab('');
      }
    }
  };

  const closeAllTabs = () => {
    setOpenTabs([]);
    setActiveTab('');
  };

  const setSidebarView = (view: SidebarView) => {
    if (sidebarView === view) {
      setSidebarViewInternal(null);
    } else {
      setSidebarViewInternal(view);
    }
  };

  const toggleSidebar = () => {
    setSidebarViewInternal((prev) => (prev ? null : 'explorer'));
  };

  const toggleTerminal = () => {
    setTerminalOpen((prev) => !prev);
  };

  const currentFile = PORTFOLIO_FILES.find((f) => f.id === activeTab) || PORTFOLIO_FILES[0];

  return (
    <WorkspaceContext.Provider
      value={{
        activeTab,
        openTabs,
        sidebarView,
        isSidebarOpen,
        terminalOpen,
        terminalTab,
        commandPaletteOpen,
        searchQuery,
        currentFile,
        openFile,
        closeTab,
        closeAllTabs,
        setSidebarView,
        toggleSidebar,
        setTerminalOpen,
        toggleTerminal,
        setTerminalTab,
        setCommandPaletteOpen,
        setSearchQuery,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
