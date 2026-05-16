import { fmtTime, type TimedStep as TimedStepType } from "../data";
import { useCountdown, beep, type Prefs } from "../hooks";

type TimedStepProps = { step: TimedStepType; prefs: Prefs };

export default function TimedStep({ step, prefs }: TimedStepProps) {
  const { remaining, running, start, pause, reset } = useCountdown(step.duration, {
    onComplete: () => beep(prefs.sound)
  });

  return (
    <>
      <p className="kicker">{step.type === "warmup" ? "Warm-up" : "Cool down"}</p>
      <h2 className="text-2xl font-extrabold tracking-tight">{step.name}</h2>
      <ul className="space-y-1 text-sm">
        {step.items.map((i, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-(--color-accent)">•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
      {step.cue && <div className="cue">{step.cue}</div>}

      <div className="rounded-2xl text-center px-4 py-7 border border-(--color-border) bg-gradient-to-br from-white to-(--color-surface-2)">
        <div className="timer-digits">{fmtTime(remaining)}</div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="btn-primary" onClick={running ? pause : start}>
            {running ? "Pause" : remaining === step.duration ? "Start" : "Resume"}
          </button>
          <button className="btn-secondary" onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
}
