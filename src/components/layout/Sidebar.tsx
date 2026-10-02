import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  Download, 
  MoreHorizontal, 
  RefreshCw, 
  Check, 
  GitCommit,
  Play,
  RotateCcw,
  X
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { FileIcon } from '../common/FileIcon';
import { PORTFOLIO_FILES, GIT_COMMITS, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, PERSONAL_INFO } from '../../data/portfolioData';

export const Sidebar: React.FC = () => {
  const { 
    sidebarView, 
    setSidebarView,
    activeTab, 
    openFile, 
    searchQuery, 
    setSearchQuery 
  } = useWorkspace();

  // Collapsible sections
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
  const [isSrcOpen, setIsSrcOpen] = useState(true);
  const [isDataOpen, setIsDataOpen] = useState(true);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

  // Group files
  const srcFiles = PORTFOLIO_FILES.filter((f) => f.folder === 'src');
  const dataFiles = PORTFOLIO_FILES.filter((f) => f.folder === 'data');
  const rootFiles = PORTFOLIO_FILES.filter((f) => f.folder === 'root');

  // Handle open file with mobile auto-dismiss
  const handleOpenFile = (fileId: string) => {
    openFile(fileId);
    if (window.innerWidth < 768) {
      setSidebarView(null);
    }
  };

  // Search logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const results: { fileId: string; fileName: string; matchText: string }[] = [];

    // Search in files
    PORTFOLIO_FILES.forEach((f) => {
      if (f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)) {
        results.push({ fileId: f.id, fileName: f.name, matchText: f.description });
      }
    });

    // Search in projects
    PROJECTS.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.techStack.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({ fileId: 'projects', fileName: 'projects.js', matchText: `${p.name}: ${p.tagline}` });
      }
    });

    // Search in skills
    SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((s) => {
        if (s.name.toLowerCase().includes(q)) {
          results.push({ fileId: 'skills', fileName: 'skills.json', matchText: `${s.name} (${cat.category})` });
        }
      });
    });

    // Search in experiences
    EXPERIENCES.forEach((e) => {
      if (e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)) {
        results.push({ fileId: 'experience', fileName: 'experience.ts', matchText: `${e.role} @ ${e.company}` });
      }
    });

    return results;
  }, [searchQuery]);

  if (!sidebarView) return null;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
        onClick={() => setSidebarView(null)}
      />

      <div className="fixed md:static top-9 bottom-6 left-12 md:left-auto w-64 bg-vscode-bg2 border-r border-vscode-border flex flex-col select-none text-xs text-vscode-text overflow-hidden shrink-0 z-40 shadow-2xl md:shadow-none animate-fade-in">
        {/* ================= EXPLORER VIEW ================= */}
        {sidebarView === 'explorer' && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between font-semibold tracking-wider text-vscode-dim text-[11px] border-b border-vscode-border/30">
              <span>EXPLORER</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSidebarView(null)}
                  className="md:hidden p-0.5 rounded hover:bg-white/10 hover:text-vscode-bright"
                  title="Close sidebar"
                >
                  <X size={14} />
                </button>
                <button title="More actions" className="hover:text-vscode-bright hidden md:inline">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Folder: PORTFOLIO */}
              <div className="border-b border-vscode-border/50">
                <button
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className="w-full flex items-center gap-1 px-2 py-1 font-bold text-[11px] text-vscode-bright hover:bg-white/5 transition-colors"
                >
                  {isPortfolioOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className="uppercase tracking-wider">PORTFOLIO</span>
                </button>

                {isPortfolioOpen && (
                  <div className="pb-1">
                    {/* Folder: src */}
                    <div>
                      <button
                        onClick={() => setIsSrcOpen(!isSrcOpen)}
                        className="w-full flex items-center gap-1.5 px-4 py-1 hover:bg-white/5 transition-colors text-vscode-text"
                      >
                        {isSrcOpen ? <ChevronDown size={13} className="text-vscode-dim" /> : <ChevronRight size={13} className="text-vscode-dim" />}
                        {isSrcOpen ? <FolderOpen size={14} className="text-vscode-blue" /> : <Folder size={14} className="text-vscode-blue" />}
                        <span className="font-mono text-[12px]">src</span>
                      </button>

                      {isSrcOpen && (
                        <div className="pl-6">
                          {srcFiles.map((file) => {
                            const isActive = activeTab === file.id;
                            return (
                              <button
                                key={file.id}
                                onClick={() => handleOpenFile(file.id)}
                                className={`w-full flex items-center justify-between px-3 py-1 hover:bg-white/5 transition-colors text-left ${
                                  isActive ? 'bg-white/10 text-vscode-bright font-medium' : 'text-vscode-text'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileIcon type={file.fileType} />
                                  <span className="font-mono text-[12px] truncate">{file.name}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Folder: data */}
                    <div>
                      <button
                        onClick={() => setIsDataOpen(!isDataOpen)}
                        className="w-full flex items-center gap-1.5 px-4 py-1 hover:bg-white/5 transition-colors text-vscode-text"
                      >
                        {isDataOpen ? <ChevronDown size={13} className="text-vscode-dim" /> : <ChevronRight size={13} className="text-vscode-dim" />}
                        {isDataOpen ? <FolderOpen size={14} className="text-vscode-yellow" /> : <Folder size={14} className="text-vscode-yellow" />}
                        <span className="font-mono text-[12px]">data</span>
                      </button>

                      {isDataOpen && (
                        <div className="pl-6">
                          {dataFiles.map((file) => {
                            const isActive = activeTab === file.id;
                            return (
                              <button
                                key={file.id}
                                onClick={() => handleOpenFile(file.id)}
                                className={`w-full flex items-center justify-between px-3 py-1 hover:bg-white/5 transition-colors text-left ${
                                  isActive ? 'bg-white/10 text-vscode-bright font-medium' : 'text-vscode-text'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileIcon type={file.fileType} />
                                  <span className="font-mono text-[12px] truncate">{file.name}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Root files (README.md & Resume.pdf) */}
                    <div className="pl-3">
                      {rootFiles.map((file) => {
                        const isActive = activeTab === file.id;
                        return (
                          <div
                            key={file.id}
                            className={`group w-full flex items-center justify-between px-3 py-1 hover:bg-white/5 transition-colors ${
                              isActive ? 'bg-white/10 text-vscode-bright font-medium' : 'text-vscode-text'
                            }`}
                          >
                            <button
                              onClick={() => handleOpenFile(file.id)}
                              className="flex items-center gap-2 truncate flex-1 text-left"
                            >
                              <FileIcon type={file.fileType} />
                              <span className="font-mono text-[12px] truncate">{file.name}</span>
                            </button>
                            {file.id === 'resume' && (
                              <a
                                href="/Mohammad_Abrar_Resume.pdf"
                                download="Mohammad_Abrar_Resume.pdf"
                                title="Download PDF"
                                className="opacity-0 group-hover:opacity-100 hover:text-vscode-blue p-0.5"
                              >
                                <Download size={13} />
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible: OUTLINE */}
              <div>
                <button
                  onClick={() => setIsOutlineOpen(!isOutlineOpen)}
                  className="w-full flex items-center gap-1 px-2 py-1 font-bold text-[11px] text-vscode-dim hover:bg-white/5 transition-colors border-t border-vscode-border/50"
                >
                  {isOutlineOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className="uppercase tracking-wider">OUTLINE</span>
                </button>
                {isOutlineOpen && (
                  <div className="px-4 py-2 text-vscode-dim space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('home')}>
                      <span className="text-vscode-blue">#</span> Hero &amp; Stats
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('about')}>
                      <span className="text-vscode-blue">#</span> Bio &amp; Education
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('projects')}>
                      <span className="text-vscode-blue">#</span> Production Apps
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('skills')}>
                      <span className="text-vscode-blue">#</span> Technical Skills
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('experience')}>
                      <span className="text-vscode-blue">#</span> Career Timeline
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-vscode-bright cursor-pointer" onClick={() => handleOpenFile('contact')}>
                      <span className="text-vscode-blue">#</span> Direct Contact
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= SEARCH VIEW ================= */}
        {sidebarView === 'search' && (
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 flex items-center justify-between font-semibold tracking-wider text-vscode-dim text-[11px] border-b border-vscode-border/30">
              <span>SEARCH</span>
              <button
                onClick={() => setSidebarView(null)}
                className="md:hidden p-0.5 rounded hover:bg-white/10 hover:text-vscode-bright"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across files..."
                  className="w-full bg-vscode-bg border border-vscode-border rounded px-2.5 py-1 text-xs text-vscode-text focus:outline-none focus:border-vscode-blue"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1.5 text-vscode-dim hover:text-vscode-bright"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {searchQuery ? (
                searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <div className="text-[11px] text-vscode-dim px-2 mb-2">
                      {searchResults.length} results found
                    </div>
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => handleOpenFile(res.fileId)}
                        className="w-full text-left p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-vscode-border"
                      >
                        <div className="font-mono text-vscode-blue text-[11px] flex items-center gap-1.5">
                          <FileIcon type={res.fileName.split('.').pop() || 'js'} size={12} />
                          {res.fileName}
                        </div>
                        <div className="text-vscode-text text-[11px] truncate mt-0.5">
                          {res.matchText}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-vscode-dim text-center py-8">
                    No matching files or symbols found.
                  </div>
                )
              ) : (
                <div className="text-vscode-dim text-center py-8 px-4 leading-relaxed">
                  Type keywords like <span className="text-vscode-blue">"React Native"</span>, <span className="text-vscode-yellow">"Redux"</span>, or <span className="text-vscode-green">"Razorpay"</span>.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= SOURCE CONTROL VIEW ================= */}
        {sidebarView === 'git' && (
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 flex items-center justify-between font-semibold tracking-wider text-vscode-dim text-[11px] border-b border-vscode-border/30">
              <span>SOURCE CONTROL: GIT</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSidebarView(null)}
                  className="md:hidden p-0.5 rounded hover:bg-white/10 hover:text-vscode-bright"
                >
                  <X size={14} />
                </button>
                <RefreshCw size={13} className="hover:text-vscode-bright cursor-pointer" />
                <Check size={13} className="hover:text-vscode-bright cursor-pointer" />
              </div>
            </div>

            <div className="p-3 border-b border-vscode-border">
              <div className="flex items-center gap-2 text-vscode-green font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-vscode-green" />
                branch: main (up to date)
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <div className="px-2 py-1.5 font-bold text-vscode-dim text-[11px] uppercase tracking-wider flex items-center gap-1">
                <GitCommit size={13} />
                Recent Commits
              </div>
              <div className="space-y-2 mt-1">
                {GIT_COMMITS.map((c) => (
                  <div key={c.hash} className="p-2 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-vscode-yellow">{c.hash}</span>
                      <span className="text-vscode-dim">{c.date}</span>
                    </div>
                    <div className="text-[12px] text-vscode-bright mt-1 font-mono">
                      {c.message}
                    </div>
                    <div className="text-[10px] text-vscode-dim mt-1">
                      {c.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= RUN & DEBUG VIEW ================= */}
        {sidebarView === 'debug' && (
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 flex items-center justify-between font-semibold tracking-wider text-vscode-dim text-[11px] border-b border-vscode-border/30">
              <span>RUN AND DEBUG</span>
              <button
                onClick={() => setSidebarView(null)}
                className="md:hidden p-0.5 rounded hover:bg-white/10 hover:text-vscode-bright"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-3 border-b border-vscode-border flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-vscode-blue2 text-white px-3 py-1 rounded text-xs hover:opacity-90">
                <Play size={12} fill="white" /> Launch Mobile App
              </button>
              <button className="p-1 rounded hover:bg-white/10 text-vscode-dim">
                <RotateCcw size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-[11px]">
              <div>
                <div className="text-vscode-dim font-bold uppercase tracking-wider text-[10px] mb-1">
                  VARIABLES (ENVIRONMENT)
                </div>
                <div className="space-y-1 bg-white/[0.02] p-2 rounded border border-vscode-border">
                  <div><span className="text-vscode-blue">NAME:</span> <span className="text-vscode-orange">"{PERSONAL_INFO.name}"</span></div>
                  <div><span className="text-vscode-blue">TITLE:</span> <span className="text-vscode-orange">"{PERSONAL_INFO.role}"</span></div>
                  <div><span className="text-vscode-blue">LOCATION:</span> <span className="text-vscode-orange">"{PERSONAL_INFO.location}"</span></div>
                  <div><span className="text-vscode-blue">STATUS:</span> <span className="text-vscode-green">"Available"</span></div>
                  <div><span className="text-vscode-blue">TOTAL_PROJECTS:</span> <span className="text-vscode-yellow">15</span></div>
                  <div><span className="text-vscode-blue">GPA:</span> <span className="text-vscode-yellow">8.4</span></div>
                </div>
              </div>

              <div>
                <div className="text-vscode-dim font-bold uppercase tracking-wider text-[10px] mb-1">
                  ACTIVE STACK
                </div>
                <div className="space-y-0.5 text-vscode-text">
                  <div>• React Native 0.74+</div>
                  <div>• TypeScript 5.x</div>
                  <div>• Redux Toolkit &amp; RTK Query</div>
                  <div>• Razorpay Payment Integration</div>
                  <div>• Agora RTC Engine</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= EXTENSIONS VIEW ================= */}
        {sidebarView === 'extensions' && (
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 flex items-center justify-between font-semibold tracking-wider text-vscode-dim text-[11px] border-b border-vscode-border/30">
              <span>EXTENSIONS: INSTALLED</span>
              <button
                onClick={() => setSidebarView(null)}
                className="md:hidden p-0.5 rounded hover:bg-white/10 hover:text-vscode-bright"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[
                { name: "React Native Tools", author: "Microsoft", version: "v1.12.0", desc: "Debugging and integrated commands for React Native", rating: "★★★★★" },
                { name: "Tailwind CSS IntelliSense", author: "Tailwind Labs", version: "v0.9.11", desc: "Intelligent Tailwind tooling for VS Code", rating: "★★★★★" },
                { name: "ESLint", author: "Microsoft", version: "v2.4.2", desc: "Integrates ESLint into VS Code", rating: "★★★★☆" },
                { name: "Prettier - Code formatter", author: "Prettier", version: "v10.1.0", desc: "Code formatter using prettier", rating: "★★★★★" },
                { name: "GitLens — Git supercharged", author: "GitKraken", version: "v15.2.0", desc: "Supercharge Git within VS Code", rating: "★★★★★" },
                { name: "Tokyo Night", author: "enkia", version: "v1.0.8", desc: "A clean, dark Visual Studio Code theme", rating: "★★★★★" },
              ].map((ext, idx) => (
                <div key={idx} className="p-2.5 rounded bg-white/[0.02] border border-vscode-border hover:border-vscode-blue transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-vscode-bright text-[12px]">{ext.name}</span>
                    <span className="text-[10px] text-vscode-yellow">{ext.rating}</span>
                  </div>
                  <div className="text-[10px] text-vscode-dim">{ext.author} · {ext.version}</div>
                  <div className="text-[11px] text-vscode-text mt-1">{ext.desc}</div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[10px] bg-vscode-green/10 text-vscode-green border border-vscode-green/30 px-1.5 py-0.5 rounded">
                      Enabled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
