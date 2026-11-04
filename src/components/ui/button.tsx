import { cn } from "@/lib/cn";

const variants = {
  primary:
    "border border-border-dark bg-primary text-on-primary font-mono text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-accent hover:border-accent hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-hard transition-all",
  secondary:
    "border border-border bg-card text-foreground font-mono text-xs font-semibold uppercase tracking-wider hover:bg-background hover:border-border-dark transition-all",
  ghost:
    "text-foreground font-mono text-xs font-semibold uppercase tracking-wider hover:bg-muted transition-all",
  accent:
    "border border-accent bg-accent text-on-accent font-mono text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-accent-hover hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-hard transition-all",
} as const;

const sizes = {
  sm: "min-h-9 px-4 py-2 text-xs",
  md: "min-h-11 px-5 py-2.5 text-xs",
  lg: "min-h-12 px-7 py-3 text-sm",
} as const;

type Shared = { variant?: keyof typeof variants; size?: keyof typeof sizes };
type ButtonProps = Shared & React.ComponentProps<"button"> & { href?: undefined };
type LinkProps = Shared & React.ComponentProps<"a"> & { href: string };

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xs text-center",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  if ("href" in rest && rest.href !== undefined) {
    return <a className={classes} {...(rest as React.ComponentProps<"a">)} />;
  }
  return <button type="button" className={classes} {...(rest as React.ComponentProps<"button">)} />;
}
