export default function Home({ onPick }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-(--color-accent-deep) bg-(--color-accent)/15 rounded-full px-2.5 py-1">
          🏸 Train
        </span>
        <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
          Pick today's session
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <SessionCard
          day="Saturday"
          name="Legs & Hardware"
          meta="10 exercises · ~60 min"
          tint="mint"
          onClick={() => onPick("sat")}
        />
        <SessionCard
          day="Wednesday"
          name="Upper & Core"
          meta="13 exercises · ~60 min"
          tint="coral"
          onClick={() => onPick("wed")}
        />
      </div>

      <div>
        <h3 className="kicker mb-2">This week</h3>
        <ul className="grid gap-2">
          {[
            { d: "Mon", emoji: "🏸", title: "Coach training", sub: "Court endurance and skill, 20:00 to 22:00" },
            { d: "Tue", emoji: "🏸", title: "Club play", sub: "Rally endurance, 20:00 to 22:00" },
            { d: "Wed", emoji: "💪", title: "Upper & Core", sub: "Smash power, core, and wrist control" },
            { d: "Thu", emoji: "🛌", title: "Rest day", sub: "Recovery and adaptation happen here" },
            { d: "Fri", emoji: "🏸", title: "Club play", sub: "Rally endurance, 20:00 to 22:00" },
            { d: "Sat", emoji: "🦵", title: "Legs & Hardware", sub: "Explosive power, lunges, and stability" },
            { d: "Sun", emoji: "🏸", title: "Coach training", sub: "Court endurance and skill, 20:00 to 22:00" }
          ].map(({ d, emoji, title, sub }) => (
            <li
              key={d}
              className="card flex items-center gap-3 px-3.5 py-3 text-sm rounded-2xl"
            >
              <div className="flex flex-col items-center justify-center w-11 shrink-0">
                <span className="text-[10px] font-bold tracking-wider text-(--color-muted) uppercase">{d}</span>
                <span className="text-xl leading-none mt-0.5">{emoji}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-(--color-text) font-semibold truncate">{title}</div>
                <div className="text-xs text-(--color-muted) truncate">{sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TINTS = {
  coral: {
    pill: "bg-[#fff0ec] text-[#f06262]",
    glow: "from-[#ffd4cc] to-[#ffe6a8]",
    accent: "text-[#f06262]"
  },
  mint: {
    pill: "bg-[#e7f7f0] text-[#3aa07e]",
    glow: "from-[#d0f0e3] to-[#cfe7ff]",
    accent: "text-[#3aa07e]"
  }
};

function SessionCard({ day, name, meta, tint, onClick }) {
  const t = TINTS[tint];
  return (
    <button
      onClick={onClick}
      className="card group relative overflow-hidden p-4 text-left transition active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-18px_rgba(192,110,110,0.35)]"
    >
      <div
        className={`absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl opacity-70 bg-gradient-to-br ${t.glow}`}
      />
      <div className="relative flex items-center justify-between gap-2">
        <div className="space-y-0.5 min-w-0">
          <span className={`inline-block text-[10px] font-bold tracking-[0.16em] uppercase rounded-full px-2 py-0.5 ${t.pill}`}>
            {day}
          </span>
          <div className="text-lg font-extrabold tracking-tight truncate">{name}</div>
          <div className="text-xs text-(--color-muted)">{meta}</div>
        </div>
        <div className={`shrink-0 text-base font-bold ${t.accent}`}>→</div>
      </div>
    </button>
  );
}
