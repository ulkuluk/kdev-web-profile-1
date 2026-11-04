import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border-2 border-primary text-primary hover:bg-primary/10",
  ghost: "text-foreground hover:bg-muted",
} as const;

const sizes = {
  md: "min-h-11 px-6 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
} as const;

type Shared = { variant?: keyof typeof variants; size?: keyof typeof sizes };
type ButtonProps = Shared & React.ComponentProps<"button"> & { href?: undefined };
type LinkProps = Shared & React.ComponentProps<"a"> & { href: string };

/** Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm text-center font-semibold",
    "transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  if ("href" in rest && rest.href !== undefined) {
    return <a className={classes} {...(rest as React.ComponentProps<"a">)} />;
  }
  return <button type="button" className={classes} {...(rest as React.ComponentProps<"button">)} />;
}
