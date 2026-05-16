import { useEffect, useRef, useState, useCallback } from "react";

export function useCountdown(seconds, { onComplete, autoStart = false } = {}) {
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
          onCompleteRef.current && onCompleteRef.current();
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
  const add = useCallback((s) => setRemaining((r) => r + s), []);

  return { remaining, running, start, pause, reset, add };
}

const PREFS_KEY = "bwf:prefs";
const DEFAULT_PREFS = { rest: 90, sound: true };

export function usePrefs() {
  const [prefs, setPrefs] = useState(() => {
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

export function useCustomVideo(name) {
  const key = "bwf:vid:" + name;
  const [id, setIdState] = useState(() => localStorage.getItem(key) || "");
  useEffect(() => { setIdState(localStorage.getItem(key) || ""); }, [key]);
  const setId = useCallback((newId) => {
    if (newId) localStorage.setItem(key, newId);
    else localStorage.removeItem(key);
    setIdState(newId || "");
  }, [key]);
  return [id, setId];
}

let audioCtx = null;
export function beep(enabled) {
  if (!enabled) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = 880; o.type = "sine"; g.gain.value = 0.15;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.25);
    try { navigator.vibrate && navigator.vibrate(150); } catch {}
  } catch {}
}
