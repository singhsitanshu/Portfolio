import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ui } from '../content/site';

// Motion is CSS only (T-16, src/styles/motion.css). This module keeps the
// reader's preference: the system setting always wins, and the Reduce motion
// toggle persists in localStorage. index.html applies a saved preference as
// html[data-reduce-motion] before first paint, so load animations never start.
const reducedQuery = '(prefers-reduced-motion: reduce)';
const storageKey = 'portfolio-reduce-motion';

function useMedia(query: string, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', notify);
      return () => media.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

const Settings = createContext({ reduced: false, systemReduced: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useMedia(reducedQuery);
  // Start with identical server/client markup; read the saved preference after hydration.
  // null until read, so the pre-paint attribute is never cleared before the saved value loads.
  const [requested, setRequested] = useState<boolean | null>(null);
  useEffect(() => {
    try { setRequested(window.localStorage.getItem(storageKey) === 'true'); }
    catch { setRequested(false); /* The control still works when preference storage is unavailable. */ }
  }, []);
  useEffect(() => { if (requested !== null) document.documentElement.toggleAttribute('data-reduce-motion', requested); }, [requested]);
  function toggle() {
    const next = !requested;
    setRequested(next);
    try { window.localStorage.setItem(storageKey, String(next)); }
    catch { /* The control still works when preference storage is unavailable. */ }
  }
  const reduced = systemReduced || requested === true;
  return <Settings.Provider value={{ reduced, systemReduced, toggle }}>
    <div className="motion-root" data-motion={reduced ? 'reduced' : 'full'}>{children}</div>
  </Settings.Provider>;
}

export function MotionToggle() {
  const { reduced, systemReduced, toggle } = useContext(Settings);
  return <button className="motion-toggle" type="button" aria-pressed={reduced} disabled={systemReduced} onClick={toggle}>{systemReduced ? ui.motion.system : ui.motion.toggle}</button>;
}

// A thin accent rule under the index that draws in on each page change.
export function MotionRule({ className = '' }: { className?: string }) {
  return <span className={`motion-rule ${className}`} aria-hidden="true" />;
}
