import { cn } from "@/lib/cn";

const tones = {
  neutral: "bg-muted text-foreground",
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
} as const;

type BadgeProps = React.ComponentProps<"span"> & { tone?: keyof typeof tones };

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
