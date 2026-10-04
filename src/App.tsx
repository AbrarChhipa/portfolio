import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { TitleBar } from './components/layout/TitleBar';
import { ActivityBar } from './components/layout/ActivityBar';
import { Sidebar } from './components/layout/Sidebar';
import { EditorTabs } from './components/layout/EditorTabs';
import { StatusBar } from './components/layout/StatusBar';
import { TerminalPanel } from './components/layout/TerminalPanel';
import { CommandPalette } from './components/layout/CommandPalette';
import { MobileSimulator } from './components/simulator/MobileSimulator';

// Tab Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ProjectsView } from './components/views/ProjectsView';
import { SkillsView } from './components/views/SkillsView';
import { ExperienceView } from './components/views/ExperienceView';
import { ContactView } from './components/views/ContactView';
import { ReadmeView } from './components/views/ReadmeView';
import { ResumeView } from './components/views/ResumeView';
import { PERSONAL_INFO } from './data/portfolioData';

const EditorContent: React.FC = () => {
  const { activeTab, openFile, setCommandPaletteOpen } = useWorkspace();

  if (!activeTab) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none text-vscode-dim">
        <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-vscode-border flex items-center justify-center text-3xl mb-4">
          🔷
        </div>
        <h2 className="text-xl font-bold text-vscode-bright mb-1 font-display">
          {PERSONAL_INFO.name}
        </h2>
        <p className="text-sm text-vscode-dim mb-6">
          {PERSONAL_INFO.role}
        </p>

        <div className="space-y-2 text-xs font-mono max-w-xs w-full text-left">
          <div
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue cursor-pointer flex justify-between items-center"
          >
            <span>Command Palette</span>
            <kbd className="bg-white/10 px-1 rounded text-[10px]">⌘P</kbd>
          </div>
          <div
            onClick={() => openFile('home')}
            className="p-2 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue cursor-pointer flex justify-between items-center"
          >
            <span>Open home.tsx</span>
            <span className="text-vscode-blue">src</span>
          </div>
          <div
            onClick={() => openFile('projects')}
            className="p-2 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue cursor-pointer flex justify-between items-center"
          >
            <span>Open projects.js</span>
            <span className="text-vscode-yellow">src</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-vscode-bg relative selection:bg-vscode-blue2 selection:text-white">
      {(() => {
        switch (activeTab) {
          case 'home':
            return <HomeView />;
          case 'about':
            return <AboutView />;
          case 'projects':
            return <ProjectsView />;
          case 'skills':
            return <SkillsView />;
          case 'experience':
            return <ExperienceView />;
          case 'contact':
            return <ContactView />;
          case 'readme':
            return <ReadmeView />;
          case 'resume':
            return <ResumeView />;
          default:
            return <HomeView />;
        }
      })()}
    </div>
  );
};

const WorkspaceLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-vscode-bg text-vscode-text">
      {/* Title Bar */}
      <TitleBar />

      {/* Main IDE Workspace (Activity Bar + Sidebar + Editor + Terminal) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Leftmost Activity Bar */}
        <ActivityBar />

        {/* Collapsible Sidebar */}
        <Sidebar />

        {/* Editor & Terminal Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Editor Header / Tabs */}
          <EditorTabs />

          {/* Active Tab View */}
          <EditorContent />

          {/* Bottom Interactive Terminal Panel */}
          <TerminalPanel />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette Overlay */}
      <CommandPalette />
      <MobileSimulator />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <WorkspaceLayout />
      </WorkspaceProvider>
    </ThemeProvider>
  );
};

export default App;
