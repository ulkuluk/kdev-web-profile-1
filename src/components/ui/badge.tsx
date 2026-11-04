import { cn } from "@/lib/cn";

const tones = {
  neutral: "border border-border bg-muted text-foreground",
  primary: "border border-border-dark bg-primary text-on-primary",
  accent: "border border-accent bg-accent-tint text-accent",
  locked: "border border-accent bg-accent text-on-accent",
} as const;

type BadgeProps = React.ComponentProps<"span"> & { tone?: keyof typeof tones };

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
