import { getIcon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

type IconProps = { name: IconName; className?: string };

/** Decorative icon (hidden from assistive tech). Pair with visible text or an aria-label on the control. */
export function Icon({ name, className }: IconProps) {
  const Component = getIcon(name);
  return <Component aria-hidden="true" strokeWidth={1.75} className={cn("size-5 shrink-0", className)} />;
}
