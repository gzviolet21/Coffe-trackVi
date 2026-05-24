interface Props {
  flavors: { note: string; count: number }[];
}

export function FlavorCloud({ flavors }: Props) {
  if (!flavors.length) return null;
  const max = flavors[0].count;

  return (
    <div className="space-y-2">
      {flavors.map(({ note, count }) => (
        <div key={note} className="flex items-center gap-3">
          <span className="font-body text-sm text-espresso capitalize w-24 shrink-0">{note}</span>
          <div className="flex-1 bg-cream-dark rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-terracotta rounded-full transition-all"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="font-body text-xs text-muted w-4 text-right">{count}</span>
        </div>
      ))}
    </div>
  );
}
