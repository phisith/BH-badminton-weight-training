import { useState } from "react";
import { fmtTime, extractYouTubeId } from "../data.js";
import { useCountdown, useCustomVideo, beep } from "../hooks.js";

export default function ExerciseStep({ step, prefs, ordinal, onComplete }) {
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

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="kicker">Exercise {ordinal}</p>
        <span className="text-xs font-semibold text-(--color-muted)">
          Set {currentSet} of {step.sets}
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{step.name}</h2>
      <p className="text-xs text-(--color-muted) -mt-1">{step.equipment}</p>
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

      <div className="flex flex-wrap gap-2">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost no-underline"
        >
          <span>▶</span> Search YouTube
        </a>
        <button className="btn-ghost" onClick={handleSetVideo}>
          {customId ? "Change video" : "Set custom video"}
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

      <div className="text-center py-2">
        <div className="text-5xl md:text-7xl font-black tracking-tighter">
          {t.duration ?? t.reps}
        </div>
        <div className="text-sm text-(--color-muted) mt-1">
          {t.duration ? `seconds${t.eachSide ? " each side" : ""}`
            : `reps${t.eachSide ? " each side" : (t.note ? ` (${t.note})` : "")}`}
        </div>
      </div>

      {t.duration && !inRest && (
        <ExerciseTimer seconds={t.duration} onDone={onSetDone} soundOn={prefs.sound} />
      )}

      {!t.duration && !inRest && (
        <div className="flex justify-center pt-1">
          <button className="btn-primary w-full md:w-auto md:px-10" onClick={onSetDone}>
            Done set
          </button>
        </div>
      )}

      {inRest && (
        <RestTimer seconds={prefs.rest} onDone={onRestDone} soundOn={prefs.sound} />
      )}
    </>
  );
}

function ExerciseTimer({ seconds, onDone, soundOn }) {
  const { remaining, running, start, pause, reset } = useCountdown(seconds, {
    onComplete: () => { beep(soundOn); onDone(); }
  });
  return (
    <div className="rounded-2xl text-center px-4 py-6 bg-(--color-surface-2) border border-(--color-border)">
      <div className="timer-digits">{fmtTime(remaining)}</div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="btn-primary" onClick={running ? pause : start}>
          {running ? "Pause" : remaining === seconds ? "Start set" : "Resume"}
        </button>
        <button className="btn-ghost" onClick={reset}>Reset</button>
        <button className="btn-ghost" onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

function RestTimer({ seconds, onDone, soundOn }) {
  const { remaining, add } = useCountdown(seconds, {
    autoStart: true,
    onComplete: () => { beep(soundOn); onDone(); }
  });
  return (
    <div className="rounded-2xl text-center px-4 py-6 border border-(--color-accent) bg-(--color-accent)/10">
      <p className="kicker text-(--color-accent) mb-1">Resting</p>
      <div className="timer-digits">{fmtTime(remaining)}</div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="btn-warn" onClick={onDone}>Skip rest</button>
        <button className="btn-ghost" onClick={() => add(15)}>+15s</button>
      </div>
    </div>
  );
}
