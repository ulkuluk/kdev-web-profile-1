import { z } from "zod";

export const navSchema = z.object({
  items: z.array(z.object({ label: z.string(), href: z.string().startsWith("#") })).min(1),
  cta: z.object({ label: z.string(), href: z.string().startsWith("#") }),
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
    { label: "Who we work with", href: "#clients" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Start a project", href: "#contact" },
  labels: {
    skipLink: "Skip to main content",
    primaryNav: "Primary",
    footerNav: "Footer",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "KDEV home",
  },
} satisfies NavContent);
