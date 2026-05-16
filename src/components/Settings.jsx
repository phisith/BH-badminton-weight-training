import { useEffect, useRef } from "react";

export default function Settings({ open, prefs, setPrefs, onClose }) {
  const dlgRef = useRef(null);

  useEffect(() => {
    const dlg = dlgRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  return (
    <dialog ref={dlgRef} onClose={onClose} className="rounded-3xl w-[360px]">
      <form method="dialog" className="card p-6 space-y-5 rounded-3xl">
        <h2 className="text-lg font-extrabold tracking-tight">Settings</h2>

        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wider uppercase text-(--color-muted)">
            Rest between sets
          </label>
          <Segmented
            value={prefs.rest}
            onChange={(v) => setPrefs({ ...prefs, rest: v })}
            options={[
              { value: 60, label: "60s" },
              { value: 90, label: "90s" }
            ]}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-(--color-text)">Beep on timer end</div>
            <div className="text-xs text-(--color-muted)">
              Plays a short tone and vibrates
            </div>
          </div>
          <Switch
            checked={prefs.sound}
            onChange={(v) => setPrefs({ ...prefs, sound: v })}
          />
        </div>

        <p className="text-xs text-(--color-muted) pt-1">
          Custom tutorial videos are saved per exercise on each exercise screen.
        </p>

        <div className="flex justify-end pt-1">
          <button value="close" className="btn-primary">Done</button>
        </div>
      </form>
    </dialog>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div
      role="radiogroup"
      className="grid bg-(--color-surface-2) border border-(--color-border) rounded-full p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={[
              "rounded-full py-2 text-sm font-semibold transition",
              active
                ? "text-white shadow-[0_6px_18px_-8px_rgba(255,138,138,0.6)]"
                : "text-(--color-muted) hover:text-(--color-text)"
            ].join(" ")}
            style={active ? {
              backgroundImage: "linear-gradient(135deg, var(--color-accent) 0%, #ffa56e 100%)"
            } : undefined}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-7 w-12 shrink-0 rounded-full border transition",
        checked
          ? "border-transparent"
          : "border-(--color-border) bg-(--color-surface-2)"
      ].join(" ")}
      style={checked ? {
        backgroundImage: "linear-gradient(135deg, var(--color-accent) 0%, #ffa56e 100%)"
      } : undefined}
    >
      <span
        className="absolute top-1/2 left-0 h-6 w-6 rounded-full bg-white shadow-md transition-transform"
        style={{
          transform: `translate(${checked ? 21 : 1}px, -50%)`
        }}
      />
    </button>
  );
}
