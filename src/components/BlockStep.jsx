export default function BlockStep({ step }) {
  return (
    <div className="py-4 text-center space-y-3">
      <p className="kicker">Block</p>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {step.name}
      </h2>
      <p className="text-sm text-(--color-muted) max-w-md mx-auto">
        Get your equipment ready. Tap Next to begin the first exercise in this block.
      </p>
      <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-(--color-accent) to-(--color-accent-2)" />
    </div>
  );
}
