import { createElement } from "react";
import { getIcon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

type IconProps = { name: IconName; className?: string };

/** Decorative icon (hidden from assistive tech). Pair with visible text or an aria-label on the control. */
export function Icon({ name, className }: IconProps) {
  // createElement on a static lookup: icons are module-level constants, not created during render.
  return createElement(getIcon(name), {
    "aria-hidden": true,
    strokeWidth: 1.75,
    className: cn("size-5 shrink-0", className),
  });
}
