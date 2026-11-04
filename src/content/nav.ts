import { z } from "zod";

export const navSchema = z.object({
  items: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
  cta: z.object({ label: z.string(), href: z.string() }),
  /** Accessible names for icon buttons and landmarks. */
  labels: z.object({
    skipLink: z.string(),
    primaryNav: z.string(),
    footerNav: z.string(),
    openMenu: z.string(),
    closeMenu: z.string(),
    home: z.string(),
  }),
});
export type NavContent = z.infer<typeof navSchema>;

export const nav = navSchema.parse({
  items: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Start MVP", href: "/contact" },
  labels: {
    skipLink: "Skip to main content",
    primaryNav: "Primary",
    footerNav: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "KDEV home",
  },
} satisfies NavContent);
