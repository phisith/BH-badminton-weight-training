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
    <dialog ref={dlgRef} onClose={onClose} className="rounded-2xl w-[360px]">
      <form
        method="dialog"
        className="card p-5 space-y-4 rounded-2xl"
      >
        <h2 className="text-lg font-bold">Settings</h2>

        <label className="grid gap-1.5 text-sm text-(--color-muted)">
          Rest between sets
          <select
            value={prefs.rest}
            onChange={(e) => setPrefs({ ...prefs, rest: parseInt(e.target.value, 10) })}
            className="rounded-lg bg-(--color-surface-2) text-(--color-text) border border-(--color-border) px-3 py-2.5"
          >
            <option value={60}>60 seconds</option>
            <option value={90}>90 seconds</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-(--color-text)">
          <input
            type="checkbox"
            checked={prefs.sound}
            onChange={(e) => setPrefs({ ...prefs, sound: e.target.checked })}
            className="h-4 w-4 accent-(--color-accent)"
          />
          Beep on timer end
        </label>

        <p className="text-xs text-(--color-muted)">
          Custom tutorial videos are saved per exercise on each exercise screen.
        </p>

        <div className="flex justify-end">
          <button value="close" className="btn-primary">Done</button>
        </div>
      </form>
    </dialog>
  );
}
