import { fmtTime } from "../data.js";
import { useCountdown, beep } from "../hooks.js";

export default function TimedStep({ step, prefs }) {
  const { remaining, running, start, pause, reset } = useCountdown(step.duration, {
    onComplete: () => beep(prefs.sound)
  });

  return (
    <>
      <p className="kicker">{step.type === "warmup" ? "Warm-up" : "Cool down"}</p>
      <h2 className="text-2xl font-extrabold tracking-tight">{step.name}</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {step.items.map((i, idx) => <li key={idx}>{i}</li>)}
      </ul>
      {step.cue && <div className="cue">{step.cue}</div>}

      <TimerCard
        time={fmtTime(remaining)}
        primaryLabel={running ? "Pause" : remaining === step.duration ? "Start" : "Resume"}
        onPrimary={running ? pause : start}
        onReset={reset}
      />
    </>
  );
}

function TimerCard({ time, primaryLabel, onPrimary, onReset }) {
  return (
    <div className="rounded-2xl text-center px-4 py-6 bg-(--color-surface-2) border border-(--color-border)">
      <div className="timer-digits">{time}</div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="btn-primary" onClick={onPrimary}>{primaryLabel}</button>
        <button className="btn-ghost" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
