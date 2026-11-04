import { z } from "zod";
import { optionalUrl } from "./_shared";

export const siteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  description: z.string(),
  contact: z.object({
    email: z.string().email(),
    /** Digits only with country code (e.g. "6281234567890"). "" hides WhatsApp button. */
    whatsapp: z.union([z.string().regex(/^\d{8,15}$/), z.literal("")]),
    whatsappMessage: z.string(),
  }),
  /** Entries with empty href are hidden. */
  socials: z.array(z.object({ label: z.string(), href: optionalUrl })),
  copyright: z.string(),
});
export type SiteContent = z.infer<typeof siteSchema>;

export const site = siteSchema.parse({
  name: "KDEV",
  legalName: "KDEV",
  tagline: "MVP to production under written scope.",
  description:
    "KDEV takes early-stage startups from idea to a production-ready MVP with scope, milestones, and price agreed in writing before any code is produced.",
  contact: {
    email: "hello@kdev.example", // TODO: replace with real address (also used by mailto fallback)
    whatsapp: "", // TODO: add number, digits only with country code
    whatsappMessage: "Hi KDEV, I would like to talk about building an MVP.",
  },
  socials: [
    { label: "GitHub", href: "" }, // TODO: add URL
    { label: "LinkedIn", href: "" }, // TODO: add URL
  ],
  copyright: "KDEV. All rights reserved.",
} satisfies SiteContent);
