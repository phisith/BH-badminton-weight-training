import { useMemo, useState } from "react";
import { SESSIONS } from "../data.js";
import TimedStep from "./TimedStep.jsx";
import BlockStep from "./BlockStep.jsx";
import ExerciseStep from "./ExerciseStep.jsx";

export default function Session({ sessionKey, prefs, onFinish }) {
  const session = SESSIONS[sessionKey];
  const steps = session.steps;

  const [stepIndex, setStepIndex] = useState(0);
  const [startedAt] = useState(() => Date.now());

  const step = steps[stepIndex];

  const goNext = () => {
    if (stepIndex >= steps.length - 1) {
      const totalSets = steps
        .filter((s) => s.type === "exercise")
        .reduce((sum, s) => sum + s.sets, 0);
      const mins = Math.round((Date.now() - startedAt) / 60000);
      onFinish({ title: session.title, totalSets, mins });
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goPrev = () => setStepIndex((i) => Math.max(0, i - 1));

  const exerciseOrdinal = useMemo(() => {
    let n = 0;
    for (let i = 0; i <= stepIndex; i++) {
      if (steps[i].type === "exercise") n++;
    }
    const total = steps.filter((s) => s.type === "exercise").length;
    return `${n} / ${total}`;
  }, [stepIndex, steps]);

  const progressPct = (stepIndex / (steps.length - 1)) * 100;

  return (
    <section className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-(--color-muted)">
          <span>Step {stepIndex + 1} of {steps.length}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-(--color-surface-2) overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
              width: `${progressPct}%`,
              backgroundImage: "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))"
            }}
          />
        </div>
      </div>

      <div className="card p-5 md:p-7 space-y-3">
        {(step.type === "warmup" || step.type === "cooldown") && (
          <TimedStep step={step} prefs={prefs} key={stepIndex} />
        )}
        {step.type === "block" && <BlockStep step={step} />}
        {step.type === "exercise" && (
          <ExerciseStep
            step={step}
            prefs={prefs}
            ordinal={exerciseOrdinal}
            onComplete={goNext}
            key={stepIndex}
          />
        )}
      </div>

      <nav className="sticky bottom-0 grid grid-cols-[1fr_2fr] gap-2.5 pt-3 pb-[calc(env(safe-area-inset-bottom,0)+12px)] md:static md:py-3 md:bg-transparent"
           style={{
             backgroundImage: "linear-gradient(to top, var(--color-bg) 70%, transparent)"
           }}>
        <button className="btn-ghost" onClick={goPrev} disabled={stepIndex === 0}>Prev</button>
        <button className="btn-primary" onClick={goNext}>
          {stepIndex >= steps.length - 1 ? "Finish session" : "Next"}
        </button>
      </nav>
    </section>
  );
}
