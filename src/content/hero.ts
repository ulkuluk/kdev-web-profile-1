import { z } from "zod";

/*
 * Headline options considered:
 * 1. "From first sketch to shipped product, under one roof."
 * 2. "We take your startup idea to a production-ready MVP under signed scope." <- chosen
 * 3. "No prototypes left behind: full-team delivery for early-stage founders."
 */

export const clauseSchema = z.object({
  id: z.string(),
  num: z.string(),
  title: z.string(),
  desc: z.string(),
  status: z.string(),
});

export const heroSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  primaryCta: z.object({ label: z.string(), href: z.string() }),
  secondaryCta: z.object({ label: z.string(), href: z.string() }),
  signatureDocket: z.object({
    protocol: z.string(),
    tag: z.string(),
    clauses: z.array(clauseSchema).min(3),
  }),
  mediaBand: z.object({
    label: z.string(),
    statusTag: z.string(),
    appName: z.string(),
    assetPath: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});
export type HeroContent = z.infer<typeof heroSchema>;

export const hero = heroSchema.parse({
  eyebrow: "SPECIFICATION // PROTOCOL-01 · 8-PERSON UNIT",
  headline: "We take your startup idea to a production-ready MVP under signed scope.",
  subheadline:
    "Scope, milestones, and price agreed in writing before any code is written. One dedicated cross-functional team of 8: from first commit to live release.",
  primaryCta: { label: "Start MVP", href: "/contact" },
  secondaryCta: { label: "See Petepete", href: "/work/petepete" },
  signatureDocket: {
    protocol: "ENGAGEMENT SPECIFICATION: PROTOCOL-01",
    tag: "VERIFIED COVENANT",
    clauses: [
      {
        id: "c-01",
        num: "§ 01.1",
        title: "Written Scope & MoU",
        desc: "Feature boundaries, timeline milestones, and fixed delivery pricing documented before kickoff.",
        status: "MANDATORY",
      },
      {
        id: "c-02",
        num: "§ 01.2",
        title: "Production Readiness Standard",
        desc: "Tested by dedicated QA and packaged with CI/CD by DevOps. Not an abandoned demo.",
        status: "GUARANTEED",
      },
      {
        id: "c-03",
        num: "§ 01.3",
        title: "8-Specialist Delivery Unit",
        desc: "PM, UI/UX, 2 Frontend, 2 Backend, QA, and DevOps assigned to every project.",
        status: "COMMITTED",
      },
    ],
  },
  mediaBand: {
    label: "petepete.app / preview / creator-portal",
    statusTag: "MVP DELIVERED",
    appName: "Petepete Creator Portal",
    assetPath: "media-source/work/petepete/hero-loop.mp4",
    facts: [
      { label: "Client", value: "Petepete" },
      { label: "Scope", value: "Production MVP" },
      { label: "Launch Status", value: "Paused by Client" },
      { label: "Assigned Team", value: "8 Specialists" },
    ],
  },
} satisfies HeroContent);
