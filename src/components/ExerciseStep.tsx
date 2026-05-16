import { useState } from "react";
import { fmtTime, extractYouTubeId, type ExerciseStep as ExerciseStepType } from "../data";
import { useCountdown, useCustomVideo, beep, type Prefs } from "../hooks";

type ExerciseStepProps = {
  step: ExerciseStepType;
  prefs: Prefs;
  ordinal: string;
  onComplete: () => void;
};

export default function ExerciseStep({ step, prefs, ordinal, onComplete }: ExerciseStepProps) {
  const [currentSet, setCurrentSet] = useState(1);
  const [inRest, setInRest] = useState(false);
  const [customId, setCustomId] = useCustomVideo(step.name);

  const t = step.target;
  const searchUrl =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(step.name + " proper form tutorial");

  const onSetDone = () => {
    if (currentSet < step.sets) setInRest(true);
    else { setCurrentSet(1); setInRest(false); onComplete(); }
  };

  const onRestDone = () => { setCurrentSet((c) => c + 1); setInRest(false); };

  const handleSetVideo = () => {
    const input = prompt(
      `Paste a YouTube URL or video ID for "${step.name}".\nLeave empty to clear.`,
      customId
    );
    if (input === null) return;
    setCustomId(extractYouTubeId(input.trim()));
  };

  if (inRest) {
    const nextSet = currentSet + 1;
    return (
      <RestView
        exerciseName={step.name}
        nextSet={nextSet}
        totalSets={step.sets}
        seconds={prefs.rest}
        soundOn={prefs.sound}
        onDone={onRestDone}
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="kicker">Exercise {ordinal}</p>
        <span className="text-xs font-bold text-(--color-muted) bg-(--color-surface-2) rounded-full px-2.5 py-1">
          Set {currentSet} of {step.sets}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{step.name}</h2>
      <p className="text-xs font-semibold text-(--color-accent-deep) -mt-1">{step.equipment}</p>
      <div className="cue">{step.cue}</div>

      {customId && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-(--color-border)">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(customId)}`}
            title="Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-[11px] font-medium py-0.5 px-2 gap-1"
        >
          ▶ YouTube
        </a>
        <button
          className="btn-ghost text-[11px] font-medium py-0.5 px-2 gap-1"
          onClick={handleSetVideo}
        >
          {customId ? "Change video" : "Custom video"}
        </button>
      </div>

      <div className="flex justify-center gap-2 py-2">
        {Array.from({ length: step.sets }, (_, i) => {
          const n = i + 1;
          const isDone = n < currentSet;
          const isCurrent = n === currentSet;
          return (
            <span
              key={n}
              className={[
                "h-3.5 w-3.5 rounded-full border-2 transition",
                isDone ? "bg-(--color-accent-2) border-(--color-accent-2)" :
                isCurrent ? "border-(--color-accent) ring-4 ring-(--color-accent)/25" :
                "bg-(--color-surface-2) border-(--color-border)"
              ].join(" ")}
            />
          );
        })}
      </div>

      {t.duration ? (
        <ExerciseTimer
          seconds={t.duration}
          eachSide={t.eachSide}
          onDone={onSetDone}
          soundOn={prefs.sound}
        />
      ) : (
        <div className="text-center py-2">
          <div className="text-6xl md:text-7xl font-black tracking-tighter text-(--color-text)">
            {t.reps}
          </div>
          <div className="text-sm font-medium text-(--color-muted) mt-1">
            reps{t.eachSide ? " each side" : (t.note ? ` (${t.note})` : "")}
          </div>
          <div className="flex justify-center pt-3">
            <button className="btn-primary w-full md:w-auto md:px-10" onClick={onSetDone}>
              Done set
            </button>
          </div>
        </div>
      )}
    </>
  );
}

type ExerciseTimerProps = {
  seconds: number;
  eachSide?: boolean;
  onDone: () => void;
  soundOn: boolean;
};

function ExerciseTimer({ seconds, eachSide, onDone, soundOn }: ExerciseTimerProps) {
  const { remaining, running, start, pause, reset } = useCountdown(seconds, {
    onComplete: () => { beep(soundOn); onDone(); }
  });
  return (
    <div className="rounded-2xl text-center px-3 py-4 border border-(--color-border) bg-gradient-to-br from-white to-(--color-surface-2)">
      <div className="timer-digits">{fmtTime(remaining)}</div>
      <div className="text-xs font-medium text-(--color-muted) mt-1">
        seconds{eachSide ? " each side" : ""}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          className="btn-primary flex-1 max-w-[160px]"
          onClick={running ? pause : start}
        >
          {running ? "Pause" : remaining === seconds ? "Start" : "Resume"}
        </button>
        <button
          className="btn-secondary px-3"
          onClick={reset}
          aria-label="Reset timer"
          title="Reset"
        >
          ↻
        </button>
        <button
          className="btn-secondary px-4"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}

type RestViewProps = {
  exerciseName: string;
  nextSet: number;
  totalSets: number;
  seconds: number;
  soundOn: boolean;
  onDone: () => void;
};

function RestView({ exerciseName, nextSet, totalSets, seconds, soundOn, onDone }: RestViewProps) {
  const { remaining, add } = useCountdown(seconds, {
    autoStart: true,
    onComplete: () => { beep(soundOn); onDone(); }
  });
  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center text-center py-6 gap-5">
      <div className="space-y-1">
        <p className="kicker" style={{ color: "#3aa07e" }}>Resting</p>
        <p className="text-sm text-(--color-muted)">
          Next: <span className="font-bold text-(--color-text)">{exerciseName}</span>
          {" · "}Set {nextSet} of {totalSets}
        </p>
      </div>

      <div className="relative h-56 w-56 md:h-64 md:w-64">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#e7f7f0" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="#7dd6b8" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={`${2 * Math.PI * 46 * (1 - pct / 100)}`}
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="timer-digits"
            style={{ backgroundImage: "linear-gradient(180deg, #2b2440 20%, #3aa07e)" }}
          >
            {fmtTime(remaining)}
          </div>
          <div className="text-xs font-semibold text-(--color-muted) mt-1 uppercase tracking-wider">
            rest
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button className="btn-warn" onClick={onDone}>Skip rest</button>
        <button className="btn-secondary" onClick={() => add(15)}>+15s</button>
      </div>
    </div>
  );
}
