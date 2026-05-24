export function LogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-warm p-4 flex gap-3 border border-cream-dark/50 animate-pulse">
      <div className="w-20 h-20 rounded-xl bg-cream-dark flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-4 bg-cream-dark rounded w-3/4" />
        <div className="h-3 bg-cream-dark rounded w-1/2" />
        <div className="h-3 bg-cream-dark rounded w-1/3" />
      </div>
    </div>
  );
}
