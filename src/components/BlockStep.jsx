export default function BlockStep({ step }) {
  return (
    <div className="py-6 text-center space-y-4">
      <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-(--color-accent) to-(--color-yellow) flex items-center justify-center text-2xl shadow-[0_10px_30px_-10px_rgba(255,138,138,0.6)]">
        🏸
      </div>
      <p className="kicker">Block</p>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {step.name}
      </h2>
      <p className="text-sm text-(--color-muted) max-w-md mx-auto">
        Get your equipment ready. Tap Next to begin the first exercise in this block.
      </p>
      <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-(--color-accent) via-(--color-yellow) to-(--color-accent-2)" />
    </div>
  );
}
