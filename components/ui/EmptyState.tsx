interface Props {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-6xl mb-4">☕</div>
      <h3 className="font-display text-xl text-espresso mb-2">{title}</h3>
      {subtitle && <p className="font-body text-muted text-sm mb-6">{subtitle}</p>}
      {action}
    </div>
  );
}
