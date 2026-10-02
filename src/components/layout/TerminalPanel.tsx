import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Trash2, 
  X, 
  Maximize2, 
  Minimize2, 
  CheckCircle2,
  Bug,
  Activity
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, GIT_COMMITS, PORTFOLIO_FILES } from '../../data/portfolioData';

interface OutputLine {
  id: number;
  type: 'cmd' | 'output' | 'error' | 'success' | 'info';
  text: string;
}

export const TerminalPanel: React.FC = () => {
  const { 
    terminalOpen, 
    setTerminalOpen, 
    terminalTab, 
    setTerminalTab, 
    openFile 
  } = useWorkspace();
  const { setThemeId, themes } = useTheme();

  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('~');

  const [lines, setLines] = useState<OutputLine[]>([
    { id: 1, type: 'info', text: `Welcome to Mohammad Abrar's Interactive Terminal v1.0.0` },
    { id: 2, type: 'output', text: `Type 'help' to see available commands or 'open <file>' to view in editor.` },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (terminalOpen && terminalTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, terminalOpen, terminalTab]);

  const addLine = (type: OutputLine['type'], text: string) => {
    setLines((prev) => [...prev, { id: Date.now() + Math.random(), type, text }]);
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to command history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Echo command
    addLine('cmd', `abrar@portfolio:${currentDir}$ ${cmd}`);

    const parts = cmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ');

    switch (command) {
      case 'help':
        addLine('success', 'Available Commands:');
        addLine('output', '  help             - Show this help menu');
        addLine('output', '  ls               - List files in workspace');
        addLine('output', '  cat / open <file>- Open file in the editor (e.g. cat home.tsx)');
        addLine('output', '  pwd              - Print working directory');
        addLine('output', '  cd <dir>         - Change directory');
        addLine('output', '  whoami           - Display developer info');
        addLine('output', '  skills           - Display key skills and tech stack');
        addLine('output', '  projects         - List production mobile apps');
        addLine('output', '  contact          - Show phone, email, and social handles');
        addLine('output', '  git log          - Show recent git commits');
        addLine('output', '  git status       - Check working branch status');
        addLine('output', '  theme <name>     - Change theme (default, rose-pine, tokyo-night, catppuccin, nord, gruvbox)');
        addLine('output', '  resume           - Download resume PDF');
        addLine('output', '  date             - Display current date and time');
        addLine('output', '  echo <text>      - Echo message back');
        addLine('output', '  node -v          - Show Node.js version');
        addLine('output', '  clear            - Clear terminal screen');
        break;

      case 'ls':
        const fileNames = PORTFOLIO_FILES.map((f) => f.name).join('   ');
        addLine('output', fileNames);
        break;

      case 'pwd':
        addLine('output', `/Users/mohammadabrar/portfolio/${currentDir === '~' ? '' : currentDir}`);
        break;

      case 'cd':
        if (!argStr || argStr === '~' || argStr === '/' || argStr === '..') {
          setCurrentDir('~');
        } else if (argStr === 'src' || argStr === 'data') {
          setCurrentDir(`~/${argStr}`);
        } else {
          addLine('error', `cd: no such file or directory: ${argStr}`);
        }
        break;

      case 'cat':
      case 'open':
        if (!argStr) {
          addLine('error', `${command}: missing file operand`);
          break;
        }
        const found = PORTFOLIO_FILES.find(
          (f) => f.name.toLowerCase() === argStr.toLowerCase() || f.id === argStr.toLowerCase()
        );
        if (found) {
          addLine('success', `Opening ${found.name} in editor...`);
          openFile(found.id);
        } else {
          addLine('error', `${command}: ${argStr}: No such file. Try: ls`);
        }
        break;

      case 'whoami':
        addLine('success', PERSONAL_INFO.name);
        addLine('output', `${PERSONAL_INFO.role} · ${PERSONAL_INFO.location}`);
        addLine('output', PERSONAL_INFO.summary);
        addLine('info', `Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}`);
        break;

      case 'skills':
        addLine('success', 'Core Technical Skills:');
        SKILL_CATEGORIES.forEach((cat) => {
          const names = cat.skills.map((s) => s.name).join(', ');
          addLine('output', `• ${cat.category}: ${names}`);
        });
        break;

      case 'projects':
        addLine('success', 'Production Mobile Apps & Architectures:');
        PROJECTS.forEach((p) => {
          addLine('output', `• ${p.name} (${p.techStack.slice(0, 3).join(', ')}): ${p.tagline}`);
        });
        break;

      case 'contact':
        addLine('success', 'Direct Contact Channels:');
        addLine('output', `  Email:    ${PERSONAL_INFO.email}`);
        addLine('output', `  Phone:    ${PERSONAL_INFO.phone}`);
        addLine('output', `  Location: ${PERSONAL_INFO.location}`);
        addLine('output', `  LinkedIn: ${PERSONAL_INFO.links.linkedin}`);
        addLine('output', `  GitHub:   ${PERSONAL_INFO.links.github}`);
        break;

      case 'git':
        if (argStr.startsWith('log')) {
          GIT_COMMITS.forEach((c) => {
            addLine('output', `commit ${c.hash} - ${c.message} (${c.date})`);
          });
        } else if (argStr === 'status') {
          addLine('success', 'On branch main');
          addLine('output', 'Your branch is up to date with origin/main.');
          addLine('output', 'nothing to commit, working tree clean');
        } else {
          addLine('output', "git: try 'git log' or 'git status'");
        }
        break;

      case 'theme':
        if (!argStr) {
          addLine('output', `Available themes: ${themes.map((t) => t.id).join(', ')}`);
        } else {
          const tMatch = themes.find((t) => t.id === argStr || t.name.toLowerCase() === argStr.toLowerCase());
          if (tMatch) {
            setThemeId(tMatch.id);
            addLine('success', `Theme switched to: ${tMatch.name}`);
          } else {
            addLine('error', `Unknown theme: ${argStr}. Available: ${themes.map((t) => t.id).join(', ')}`);
          }
        }
        break;

      case 'resume':
        addLine('success', 'Downloading Mohammad Abrar Resume...');
        const link = document.createElement('a');
        link.href = '/Mohammad_Abrar_Resume.pdf';
        link.download = 'Mohammad_Abrar_Resume.pdf';
        link.click();
        break;

      case 'date':
        addLine('output', new Date().toString());
        break;

      case 'echo':
        addLine('output', argStr);
        break;

      case 'node':
        if (argStr === '-v' || argStr === '--version') {
          addLine('output', 'v24.6.0');
        } else {
          addLine('output', 'Node.js interactive REPL is not active in this shell.');
        }
        break;

      case 'python':
      case 'python3':
        addLine('output', 'Python 3.11.0');
        break;

      case 'clear':
        setLines([]);
        break;

      default:
        addLine('error', `zsh: command not found: ${command}. Type 'help' for a list of commands.`);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInputVal(history[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!terminalOpen) return null;

  return (
    <div
      className={`bg-vscode-bg border-t border-vscode-border flex flex-col transition-all duration-200 z-20 shrink-0 ${
        isMaximized ? 'h-[75vh]' : 'h-64 sm:h-56'
      }`}
    >
      {/* Top Header with Tabs & Controls */}
      <div className="h-8 bg-vscode-bg2 border-b border-vscode-border flex items-center justify-between px-3 select-none text-xs">
        {/* Panel Tabs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTerminalTab('terminal')}
            className={`font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors ${
              terminalTab === 'terminal'
                ? 'border-vscode-blue text-vscode-bright font-semibold'
                : 'border-transparent text-vscode-dim hover:text-vscode-text'
            }`}
          >
            <TerminalIcon size={12} />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setTerminalTab('output')}
            className={`font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors ${
              terminalTab === 'output'
                ? 'border-vscode-blue text-vscode-bright font-semibold'
                : 'border-transparent text-vscode-dim hover:text-vscode-text'
            }`}
          >
            <Activity size={12} />
            <span>Output</span>
          </button>

          <button
            onClick={() => setTerminalTab('problems')}
            className={`font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors ${
              terminalTab === 'problems'
                ? 'border-vscode-blue text-vscode-bright font-semibold'
                : 'border-transparent text-vscode-dim hover:text-vscode-text'
            }`}
          >
            <CheckCircle2 size={12} className="text-vscode-green" />
            <span>Problems (0)</span>
          </button>

          <button
            onClick={() => setTerminalTab('debug')}
            className={`font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b-2 transition-colors ${
              terminalTab === 'debug'
                ? 'border-vscode-blue text-vscode-bright font-semibold'
                : 'border-transparent text-vscode-dim hover:text-vscode-text'
            }`}
          >
            <Bug size={12} />
            <span>Debug Console</span>
          </button>
        </div>

        {/* Panel Right Controls */}
        <div className="flex items-center gap-2 text-vscode-dim">
          {terminalTab === 'terminal' && (
            <button
              onClick={() => setLines([])}
              className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded transition-colors"
              title="Clear Terminal"
            >
              <Trash2 size={13} />
            </button>
          )}

          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded transition-colors"
            title={isMaximized ? "Restore Panel Size" : "Maximize Panel Size"}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            onClick={() => setTerminalOpen(false)}
            className="p-1 hover:text-vscode-bright hover:bg-white/10 rounded transition-colors"
            title="Close Panel (Ctrl+`)"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Panel Body Content */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed">
        {/* TERMINAL TAB */}
        {terminalTab === 'terminal' && (
          <div 
            className="h-full flex flex-col justify-between"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="space-y-1">
              {lines.map((line) => {
                if (line.type === 'cmd') {
                  return (
                    <div key={line.id} className="text-vscode-text font-bold">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'error') {
                  return (
                    <div key={line.id} className="text-vscode-red">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'success') {
                  return (
                    <div key={line.id} className="text-vscode-green font-semibold">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'info') {
                  return (
                    <div key={line.id} className="text-vscode-blue">
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={line.id} className="text-vscode-dim whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 mt-2 pt-2">
              <span className="text-vscode-green font-bold shrink-0">abrar@portfolio:{currentDir}$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-vscode-bright font-mono text-[12px] p-0"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* OUTPUT TAB */}
        {terminalTab === 'output' && (
          <div className="space-y-1 text-vscode-dim">
            <div className="text-vscode-blue">[vite] v6.2.0 dev server running at:</div>
            <div className="text-vscode-green">  ➜  Local:   http://localhost:5173/</div>
            <div className="text-vscode-dim">  ➜  Network: use --host to expose</div>
            <div className="text-vscode-yellow mt-2">[vite] React 18 &amp; TypeScript initialized in 142ms.</div>
            <div className="text-vscode-green">[hmr] hot module replacement connected and active.</div>
            <div className="text-vscode-dim mt-2">Ready for deployment on Vercel, Netlify, or GitHub Pages.</div>
          </div>
        )}

        {/* PROBLEMS TAB */}
        {terminalTab === 'problems' && (
          <div className="flex items-center gap-2 text-vscode-green py-4">
            <CheckCircle2 size={16} />
            <span>No problems have been detected in the workspace so far.</span>
          </div>
        )}

        {/* DEBUG CONSOLE TAB */}
        {terminalTab === 'debug' && (
          <div className="space-y-2 text-vscode-dim">
            <div>Mohammad Abrar Debug Session attached.</div>
            <div className="text-vscode-blue">&gt; portfolio.getDeveloper()</div>
            <div className="bg-white/[0.02] p-2 rounded border border-vscode-border text-vscode-text">
              {JSON.stringify({
                name: PERSONAL_INFO.name,
                role: PERSONAL_INFO.role,
                location: PERSONAL_INFO.location,
                projectsCount: PROJECTS.length,
                status: PERSONAL_INFO.status,
              }, null, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
