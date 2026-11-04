import { z } from "zod";
import { iconSchema } from "./_shared";

export const audiencesSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  needsLabel: z.string(),
  helpLabel: z.string(),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        icon: iconSchema,
        needs: z.array(z.string()).min(1),
        howWeHelp: z.string(),
      }),
    )
    .length(3),
});
export type AudiencesContent = z.infer<typeof audiencesSchema>;

export const audiences = audiencesSchema.parse({
  eyebrow: "Who we work with",
  title: "Built around where your business is today",
  description: "Different stages need different kinds of help. Here is how we work with each.",
  needsLabel: "What you typically need",
  helpLabel: "How we help",
  items: [
    {
      id: "startups",
      title: "Startups",
      icon: "rocket",
      needs: [
        "A first version in front of users quickly",
        "A partner to challenge scope, not just take orders",
        "A codebase that can survive the first pivot",
      ],
      howWeHelp:
        "We agree on a focused MVP, design and build it with a full team, and keep the foundations clean so you can grow from it.",
    },
    {
      id: "smes",
      title: "SMEs (UMKM)",
      icon: "store",
      needs: [
        "Spreadsheets and chat threads replaced by a real system",
        "Software your staff finds easy to use",
        "Clear scope and cost without an in-house tech team",
      ],
      howWeHelp:
        "We start from how your business actually runs, build only what you need, and explain every decision in plain language.",
    },
    {
      id: "mid-sized",
      title: "Mid-sized companies",
      icon: "building-2",
      needs: [
        "Internal tools and dashboards on top of existing systems",
        "APIs and integrations between departments",
        "Delivery with proper QA and a repeatable release process",
      ],
      howWeHelp:
        "We add a dependable, cross-functional team to your roadmap, with a project manager as your single point of contact.",
    },
  ],
} satisfies AudiencesContent);
