import { z } from "zod";
import { optionalUrl } from "./_shared";

export const siteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  description: z.string(),
  contact: z.object({
    email: z.email(),
    /** Digits only, with country code (e.g. "6281234567890"). "" hides the WhatsApp button. */
    whatsapp: z.union([z.string().regex(/^\d{8,15}$/), z.literal("")]),
    whatsappMessage: z.string(),
  }),
  /** Entries with an empty href are hidden. */
  socials: z.array(z.object({ label: z.string(), href: optionalUrl })),
  copyright: z.string(),
});
export type SiteContent = z.infer<typeof siteSchema>;

export const site = siteSchema.parse({
  name: "KDEV",
  legalName: "KDEV",
  tagline: "A whole delivery team, not just coders.",
  description:
    "KDEV is a software house of 8 specialists. We build web applications, custom systems and mobile apps for startups, SMEs and mid-sized companies.",
  contact: {
    email: "hello@kdev.example", // TODO: replace with the real address (also used by the mailto fallback)
    whatsapp: "", // TODO: add number, digits only with country code
    whatsappMessage: "Hi KDEV, I would like to talk about a project.",
  },
  socials: [
    { label: "GitHub", href: "" }, // TODO: add URL
    { label: "LinkedIn", href: "" }, // TODO: add URL
  ],
  copyright: "KDEV. All rights reserved.",
} satisfies SiteContent);
