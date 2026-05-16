export default function Home({ onPick }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Ready to train.
        </h2>
        <p className="text-(--color-muted) mt-2">
          Pick a session. Warm-up, blocks of exercises with set and rest timers, then cool down.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <SessionCard
          day="Wednesday"
          name="Upper & Core"
          meta="3 blocks · 13 exercises · ~60 min"
          gradient="from-[#5b8cff] to-[#22d3a0]"
          onClick={() => onPick("wed")}
        />
        <SessionCard
          day="Saturday"
          name="Legs & Hardware"
          meta="3 blocks · 10 exercises · ~60 min"
          gradient="from-[#22d3a0] to-[#ffb84d]"
          onClick={() => onPick("sat")}
        />
      </div>

      <div>
        <h3 className="kicker mb-2">Weekly schedule</h3>
        <ul className="grid gap-1.5">
          {[
            ["Mon", "Coach training (court)"],
            ["Tue", "Club play"],
            ["Wed", "Upper & Core gym"],
            ["Thu", "Rest"],
            ["Fri", "Club play"],
            ["Sat", "Leg circuit gym"],
            ["Sun", "Coach training (court)"]
          ].map(([d, label]) => (
            <li
              key={d}
              className="card flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl"
            >
              <span className="font-bold text-(--color-accent) w-10">{d}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SessionCard({ day, name, meta, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card group relative overflow-hidden p-5 text-left transition active:scale-[0.99] hover:border-(--color-accent)"
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-br ${gradient}`}
      />
      <div className="relative space-y-1">
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-(--color-accent)">
          {day}
        </div>
        <div className="text-2xl font-extrabold tracking-tight">{name}</div>
        <div className="text-sm text-(--color-muted)">{meta}</div>
      </div>
      <div className="relative mt-4 flex items-center text-(--color-accent) text-sm font-semibold">
        Start session
        <span className="ml-1 transition group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}
