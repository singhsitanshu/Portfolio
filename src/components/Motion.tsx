import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { motion, MotionConfig, useInView } from 'framer-motion';

const timing = { entrance: 0.32, step: 650, pulse: 0.4 };
const reducedQuery = '(prefers-reduced-motion: reduce)';
const mobileQuery = '(max-width: 60rem)';

function useMedia(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', notify);
      return () => media.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}

const Settings = createContext({ reduced: true, mobile: true, visible: true, enabled: false, systemReduced: false, requested: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useMedia(reducedQuery);
  const mobile = useMedia(mobileQuery);
  const visible = useSyncExternalStore(
    (notify) => {
      document.addEventListener('visibilitychange', notify);
      return () => document.removeEventListener('visibilitychange', notify);
    },
    () => document.visibilityState !== 'hidden',
    () => true,
  );
  const [requested, setRequested] = useState(() => {
    try { return window.localStorage.getItem('portfolio-reduce-motion') === 'true'; }
    catch { return false; }
  });
  function toggle() {
    const next = !requested;
    setRequested(next);
    try { window.localStorage.setItem('portfolio-reduce-motion', String(next)); }
    catch { /* The control still works when preference storage is unavailable. */ }
  }
  const reduced = systemReduced || requested;
  return <Settings.Provider value={{ reduced, mobile, visible, enabled: !reduced && !mobile && visible, systemReduced, requested, toggle }}>
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <div className="motion-root" data-motion={reduced ? 'reduced' : mobile ? 'mobile' : 'full'}>{children}</div>
    </MotionConfig>
  </Settings.Provider>;
}

export function MotionToggle() {
  const { reduced, systemReduced, toggle } = useContext(Settings);
  return <button className="motion-toggle" type="button" aria-pressed={reduced} disabled={systemReduced} onClick={toggle}>{systemReduced ? 'Reduced motion (system)' : 'Reduce motion'}</button>;
}

// Copy is opaque and interactive from its first render. Only a small offset enters.
export function Entrance({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.1 });
  const { enabled } = useContext(Settings);
  return <motion.div ref={ref} className={`motion-entrance ${className}`} initial={false} animate={{ y: enabled && !entered ? 6 : 0 }} transition={{ duration: enabled ? timing.entrance : 0 }}>{children}</motion.div>;
}

export function MotionRule({ className = '', route = false }: { className?: string; route?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.1 });
  const { enabled } = useContext(Settings);
  return <motion.span ref={ref} className={`motion-rule ${className}`} aria-hidden="true" initial={route && enabled ? { scaleX: 0 } : false} animate={{ scaleX: !enabled || route || entered ? 1 : 0 }} transition={{ duration: enabled ? timing.entrance : 0 }} />;
}

// A finite illustrative sequence. Leaving the viewport or hiding the document
// clears the sole pending timer; re-entry resumes at the same step, never loops.
export function useDiagramSequence(count: number) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const { enabled, reduced, mobile } = useContext(Settings);
  const [step, setStep] = useState(0);
  const active = enabled && inView && step < count;
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setStep(value => Math.min(count, value + 1)), timing.step);
    return () => window.clearTimeout(timer);
  }, [active, step, count]);
  const phase = reduced || mobile ? count : step;
  return { ref, phase, active, state: reduced || mobile ? 'static' : step >= count ? 'complete' : active ? 'running' : 'paused' };
}

export function SequenceSymbol({ active, complete, className, heartbeat = false, children }: {
  active: boolean; complete: boolean; className: string; heartbeat?: boolean; children: ReactNode;
}) {
  return <motion.span className={className} aria-hidden="true" data-complete={complete} data-active={active} initial={false}
    animate={{ scale: active ? [1, 1.08, 1] : 1, rotate: active && heartbeat ? [0, -12, 12, 0] : 0 }} transition={{ duration: active ? timing.pulse : 0 }}>{children}</motion.span>;
}

export function SequencePulse({ active }: { active: boolean }) {
  return <motion.span className="sequence-pulse" aria-hidden="true" initial={false} animate={{ opacity: active ? [0, 1, 0] : 0, x: active ? [0, 10, 0] : 0 }} transition={{ duration: active ? timing.pulse : 0 }} />;
}

export function QueueMarks({ active }: { active: boolean }) {
  return <>{[0, 1, 2].map(index => <motion.i key={index} initial={false} animate={{ x: active ? [0, 3, 0] : 0 }} transition={{ duration: active ? 0.25 : 0, delay: active ? index * 0.04 : 0 }} />)}</>;
}
