export default function Summary({ stats, onHome }) {
  return (
    <section className="text-center py-10 space-y-4">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-(--color-accent) to-(--color-accent-2) flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(91,140,255,0.5)]">
        ✓
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Session complete</h2>
      {stats && (
        <div className="card max-w-md mx-auto p-5 space-y-2">
          <div className="font-semibold">{stats.title}</div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-(--color-surface-2) p-3">
              <div className="text-2xl font-extrabold text-(--color-accent)">{stats.totalSets}</div>
              <div className="text-xs text-(--color-muted) uppercase tracking-wider">sets</div>
            </div>
            <div className="rounded-xl bg-(--color-surface-2) p-3">
              <div className="text-2xl font-extrabold text-(--color-accent-2)">{stats.mins}</div>
              <div className="text-xs text-(--color-muted) uppercase tracking-wider">minutes</div>
            </div>
          </div>
        </div>
      )}
      <button className="btn-primary mx-auto px-8" onClick={onHome}>Back to home</button>
    </section>
  );
}
