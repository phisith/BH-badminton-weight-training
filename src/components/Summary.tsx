export type SessionStats = {
  title: string;
  totalSets: number;
  mins: number;
};

type SummaryProps = {
  stats: SessionStats | null;
  onHome: () => void;
};

export default function Summary({ stats, onHome }: SummaryProps) {
  return (
    <section className="text-center py-10 space-y-5">
      <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-(--color-accent) via-(--color-yellow) to-(--color-accent-2) flex items-center justify-center text-5xl text-white shadow-[0_18px_42px_-12px_rgba(255,138,138,0.55)]">
        ✓
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Nice work!</h2>
      {stats && (
        <div className="card max-w-md mx-auto p-6 space-y-4">
          <div className="font-bold text-(--color-text)">{stats.title}</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#fff0ec] p-4">
              <div className="text-3xl font-extrabold text-(--color-accent-deep)">{stats.totalSets}</div>
              <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wider mt-1">sets</div>
            </div>
            <div className="rounded-2xl bg-[#e7f7f0] p-4">
              <div className="text-3xl font-extrabold text-[#3aa07e]">{stats.mins}</div>
              <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wider mt-1">minutes</div>
            </div>
          </div>
        </div>
      )}
      <button className="btn-primary mx-auto px-8" onClick={onHome}>Back to home</button>
    </section>
  );
}
