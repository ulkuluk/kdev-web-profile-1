import { z } from "zod";

/*
 * Headline options considered:
 *   1. "A whole delivery team, not just coders."                       <- chosen
 *   2. "From first sketch to shipped product, under one roof."
 *   3. "Software that ships, built by a team that covers every role."
 */
export const heroSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  primaryCta: z.object({ label: z.string(), href: z.string() }),
  secondaryCta: z.object({ label: z.string(), href: z.string() }),
  /** Only facts from the brief: 8 specialists, 3 service lines, 1 delivered MVP. */
  facts: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
  visual: z.object({
    pipelineTitle: z.string(),
    pipelineCaption: z.string(),
    codeFile: z.string(),
    codeLines: z.array(z.string()),
    uiCardTitle: z.string(),
    uiCardNote: z.string(),
  }),
});
export type HeroContent = z.infer<typeof heroSchema>;

export const hero = heroSchema.parse({
  eyebrow: "Software house � 8 specialists",
  headline: "A whole delivery team, not just coders.",
  subheadline:
    "Product management, design, engineering, QA and DevOps in one team. You get one partner who takes your idea from first conversation to a working release.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See our work", href: "#work" },
  facts: [
    { value: "8", label: "specialists" },
    { value: "3", label: "service lines" },
    { value: "1", label: "delivered MVP" },
  ],
  visual: {
    pipelineTitle: "How a project moves through KDEV",
    pipelineCaption: "Each step has an owner on the team.",
    codeFile: "delivery.ts",
    codeLines: [
      "const team = {",
      "  pm: 1, design: 1,",
      "  frontend: 2, backend: 2,",
      "  qa: 1, devops: 1,",
      "};",
      "ship(project, team);",
    ],
    uiCardTitle: "Your product",
    uiCardNote: "Designed, built and tested by one team.",
  },
} satisfies HeroContent);
