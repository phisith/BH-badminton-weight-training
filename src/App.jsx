import { useState } from "react";
import { SESSIONS } from "./data.js";
import { usePrefs } from "./hooks.js";
import Home from "./components/Home.jsx";
import Session from "./components/Session.jsx";
import Summary from "./components/Summary.jsx";
import Settings from "./components/Settings.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const [sessionKey, setSessionKey] = useState(null);
  const [stats, setStats] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefs] = usePrefs();

  const startSession = (key) => { setSessionKey(key); setView("session"); };
  const finishSession = (s) => { setStats(s); setView("summary"); };
  const goHome = () => { setSessionKey(null); setStats(null); setView("home"); };

  const handleBack = () => {
    if (view === "summary") goHome();
    else if (view === "session") {
      if (confirm("Leave this session? Progress will be lost.")) goHome();
    }
  };

  const title =
    view === "home" ? "BWF Training" :
    view === "session" ? SESSIONS[sessionKey].title :
    "Complete";

  return (
    <>
      <header
        className="sticky top-0 z-10 grid grid-cols-[44px_1fr_44px] items-center gap-2 px-3 border-b border-(--color-border) backdrop-blur"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0) + 10px)",
          paddingBottom: 10,
          background: "color-mix(in srgb, var(--color-bg) 80%, transparent)"
        }}
      >
        <button
          onClick={handleBack}
          aria-label="Back"
          className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-xl hover:bg-(--color-surface-2)"
          style={{ visibility: view === "home" ? "hidden" : "visible" }}
        >
          ←
        </button>
        <h1 className="text-base font-semibold text-center truncate">{title}</h1>
        <button
          onClick={() => setSettingsOpen(true)}
          aria-label="Settings"
          className="h-11 w-11 inline-flex items-center justify-center rounded-xl text-xl hover:bg-(--color-surface-2)"
        >
          ⚙
        </button>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-5 md:px-8 md:py-8">
        {view === "home" && <Home onPick={startSession} />}
        {view === "session" && (
          <Session sessionKey={sessionKey} prefs={prefs} onFinish={finishSession} />
        )}
        {view === "summary" && <Summary stats={stats} onHome={goHome} />}
      </main>

      <Settings
        open={settingsOpen}
        prefs={prefs}
        setPrefs={setPrefs}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
