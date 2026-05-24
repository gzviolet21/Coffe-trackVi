interface Props {
  streak: number;
}

export function StreakBadge({ streak }: Props) {
  if (streak === 0) {
    return (
      <div className="bg-cream-dark rounded-2xl px-5 py-4 text-center">
        <p className="font-accent text-muted text-base">Start your streak today ☕</p>
      </div>
    );
  }

  return (
    <div className="bg-honey/20 border border-honey rounded-2xl px-5 py-4 flex items-center gap-4">
      <div className="text-4xl">🔥</div>
      <div>
        <div className="font-display text-3xl text-espresso leading-none">{streak}</div>
        <div className="font-body text-sm text-muted">
          day{streak !== 1 ? "s" : ""} in a row
        </div>
        <div className="font-accent text-xs text-honey">café hopping streak</div>
      </div>
    </div>
  );
}
