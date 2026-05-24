interface Props {
  label: string;
  value: string | number;
  emoji: string;
  sub?: string;
}

export function StatCard({ label, value, emoji, sub }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-warm border border-cream-dark/40">
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="font-display text-3xl text-espresso leading-none">{value}</div>
      <div className="font-body text-sm text-muted mt-1">{label}</div>
      {sub && <div className="font-accent text-xs text-terracotta mt-0.5">{sub}</div>}
    </div>
  );
}
