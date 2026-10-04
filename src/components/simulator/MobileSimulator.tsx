import React, { useEffect, useRef, useState } from 'react';
import { BatteryFull, Signal, Smartphone, Wifi, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { MOBILE_APPS, PortfolioApp } from '../../data/mobileApps';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logEvent = (level: LogLevel, event: string, appId?: string) => {
  if (import.meta.env.DEV) {
    console[level]({ scope: 'mobile-simulator', level, event, ...(appId ? { appId } : {}) });
  }
};

const AppIcon: React.FC<{ app: PortfolioApp }> = ({ app }) => {
  const [failed, setFailed] = useState(false);
  const initials = app.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join('');

  return (
    <a
      href={app.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="simulator-app"
      aria-label={`Open ${app.name} on Google Play (opens in a new tab)`}
      onClick={() => logEvent('debug', 'app_opened', app.id)}
    >
      <span className="simulator-app-icon">
        {app.iconSrc && !failed ? (
          <img
            src={app.iconSrc}
            alt=""
            width={64}
            height={64}
            draggable={false}
            onError={() => {
              setFailed(true);
              logEvent('warn', 'icon_load_failed', app.id);
            }}
          />
        ) : (
          <span className="simulator-app-initials" aria-hidden="true">{initials}</span>
        )}
      </span>
      <span className="simulator-app-name">{app.name}</span>
    </a>
  );
};

export const MobileSimulator: React.FC = () => {
  const { simulatorOpen, closeSimulator } = useWorkspace();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const backdropPressRef = useRef(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (simulatorOpen && dialog && !dialog.open) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      logEvent('info', 'opened');
    } else if (!simulatorOpen && dialog?.open) {
      dialog.close();
    }
  }, [simulatorOpen]);

  useEffect(() => {
    if (!simulatorOpen) return;
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit',
    }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, [simulatorOpen]);

  const isBackdrop = (event: React.PointerEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  // Explicit traversal keeps Tab inside the phone on platforms that skip links.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href]',
    ));
    if (!controls.length) return;
    const currentIndex = controls.findIndex((control) => control === document.activeElement);
    const nextIndex = currentIndex < 0
      ? (event.shiftKey ? controls.length - 1 : 0)
      : (currentIndex + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    event.preventDefault();
    controls[nextIndex].focus();
  };

  return (
    <dialog
      ref={dialogRef}
      className="simulator-dialog"
      aria-labelledby="simulator-title"
      aria-describedby="simulator-description"
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        closeSimulator();
      }}
      onClose={() => {
        closeSimulator();
        openerRef.current?.focus({ preventScroll: true });
        logEvent('info', 'closed');
      }}
      onPointerDown={(event) => { backdropPressRef.current = isBackdrop(event); }}
      onPointerUp={(event) => {
        if (backdropPressRef.current && isBackdrop(event)) closeSimulator();
        backdropPressRef.current = false;
      }}
    >
      {simulatorOpen && (
        <>
          <header className="simulator-toolbar">
            <div className="flex items-center gap-2 min-w-0">
              <Smartphone size={14} className="text-vscode-green" aria-hidden="true" />
              <h2 id="simulator-title" className="font-mono text-xs text-vscode-bright">Mobile simulator</h2>
            </div>
            <button
              type="button"
              className="simulator-close"
              aria-label="Close simulator"
              onClick={closeSimulator}
              autoFocus
            >
              <X size={16} aria-hidden="true" />
            </button>
          </header>

          <div className="simulator-phone">
            <div className="simulator-screen">
              <div className="simulator-status-bar" aria-hidden="true">
                <span>{time}</span>
                <span className="simulator-camera" />
                <div className="flex items-center gap-1.5">
                  <Signal size={13} /><Wifi size={13} /><BatteryFull size={17} />
                </div>
              </div>

              <div className="simulator-launcher">
                <div className="simulator-intro">
                  <h3>Apps I've worked on</h3>
                  <p id="simulator-description">Tap an app to explore it on Google Play.</p>
                </div>
                <div className="simulator-app-grid">
                  {MOBILE_APPS.map((app) => <AppIcon key={app.id} app={app} />)}
                </div>
                <div className="simulator-launcher-footer">
                  <span>{MOBILE_APPS.length} apps</span>
                  <span>Android</span>
                </div>
              </div>

              <div className="simulator-navigation" aria-hidden="true"><span /></div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};
