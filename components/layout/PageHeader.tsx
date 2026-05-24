import { cn } from "@/lib/utils/cn";

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, right, className }: Props) {
  return (
    <div className={cn("px-5 pt-6 pb-4 flex items-start justify-between", className)}>
      <div>
        <h1 className="font-display text-2xl text-espresso">{title}</h1>
        {subtitle && (
          <p className="font-accent text-muted text-base mt-0.5">{subtitle}</p>
        )}
      </div>
      {right && <div className="mt-1">{right}</div>}
    </div>
  );
}
