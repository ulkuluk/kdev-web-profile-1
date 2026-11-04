import { cn } from "@/lib/cn";

type WordmarkProps = { name: string; className?: string };

/** Logo: Precision architectural engineering mark with unit telemetry. */
export function Wordmark({ name, className }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-border-dark bg-primary font-mono text-xs font-bold text-on-primary shadow-sm">
        K
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
          {name}
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-wider text-accent">
          [8-person unit]
        </span>
      </span>
    </span>
  );
}
