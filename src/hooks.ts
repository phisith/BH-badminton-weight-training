import { useEffect, useRef, useState, useCallback, type Dispatch, type SetStateAction } from "react";

type CountdownOptions = {
  onComplete?: () => void;
  autoStart?: boolean;
};

export type Countdown = {
  remaining: number;
  running: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  add: (s: number) => void;
};

export function useCountdown(
  seconds: number,
  { onComplete, autoStart = false }: CountdownOptions = {}
): Countdown {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(autoStart);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => { setRemaining(seconds); setRunning(autoStart); }, [seconds, autoStart]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => { setRunning(false); setRemaining(seconds); }, [seconds]);
  const add = useCallback((s: number) => setRemaining((r) => r + s), []);

  return { remaining, running, start, pause, reset, add };
}

export type Prefs = { rest: number; sound: boolean };

const PREFS_KEY = "bwf:prefs";
const DEFAULT_PREFS: Prefs = { rest: 90, sound: true };

export function usePrefs(): [Prefs, Dispatch<SetStateAction<Prefs>>] {
  const [prefs, setPrefs] = useState<Prefs>(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
    } catch { return DEFAULT_PREFS; }
  });
  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);
  return [prefs, setPrefs];
}

export function useCustomVideo(name: string): [string, (newId: string) => void] {
  const key = "bwf:vid:" + name;
  const [id, setIdState] = useState<string>(() => localStorage.getItem(key) || "");
  useEffect(() => { setIdState(localStorage.getItem(key) || ""); }, [key]);
  const setId = useCallback((newId: string) => {
    if (newId) localStorage.setItem(key, newId);
    else localStorage.removeItem(key);
    setIdState(newId || "");
  }, [key]);
  return [id, setId];
}

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

let audioCtx: AudioContext | null = null;
export function beep(enabled: boolean): void {
  if (!enabled) return;
  try {
    const Ctor = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
    if (!Ctor) return;
    audioCtx = audioCtx || new Ctor();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = 880; o.type = "sine"; g.gain.value = 0.15;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.25);
    try { navigator.vibrate?.(150); } catch { /* noop */ }
  } catch { /* noop */ }
}
