import {
  AppWindow,
  Building2,
  Check,
  Compass,
  Code,
  Factory,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon-mapping helper: content refers to icons by name, components resolve them here.
 * To use a new icon, import it above and add it to the map. Content schemas pick up the name.
 */
const icons = {
  "app-window": AppWindow,
  "building-2": Building2,
  check: Check,
  code: Code,
  compass: Compass,
  factory: Factory,
  globe: Globe,
  "layout-dashboard": LayoutDashboard,
  "life-buoy": LifeBuoy,
  lightbulb: Lightbulb,
  "pen-tool": PenTool,
  rocket: Rocket,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  store: Store,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as [IconName, ...IconName[]];

export function getIcon(name: IconName): LucideIcon {
  return icons[name];
}
