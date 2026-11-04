import { z } from "zod";

export const pillarSchema = z.object({
  id: z.string(),
  num: z.string(),
  title: z.string(),
  body: z.string(),
  tag: z.string(),
});

export const pillarsSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  items: z.array(pillarSchema).length(4),
});
export type PillarsContent = z.infer<typeof pillarsSchema>;

export const pillars = pillarsSchema.parse({
  eyebrow: "Operating Commitments",
  heading: "Four principles governing every engagement",
  items: [
    {
      id: "p-01",
      num: "01",
      title: "MVP to Production",
      body: "We ship real software with databases, authentication, and continuous deployment. We never stop at prototypes or hand off abandoned Figma files.",
      tag: "DISCIPLINE",
    },
    {
      id: "p-02",
      num: "02",
      title: "Clear Scope in Writing",
      body: "Milestones, deliverable checklists, and boundary specifications are agreed in writing under a binding MoU before writing a single line of code.",
      tag: "CERTAINTY",
    },
    {
      id: "p-03",
      num: "03",
      title: "Startup-Friendly Pricing",
      body: "Fair, milestone-based pricing designed for founder runway. Clear numbers agreed before committing resources; no surprise scope creep bills.",
      tag: "REALISM",
    },
    {
      id: "p-04",
      num: "04",
      title: "Full 8-Person Unit",
      body: "PM, UI/UX designer, 2 frontend engineers, 2 backend engineers, QA engineer, and DevOps engineer on every single project.",
      tag: "COVERAGE",
    },
  ],
} satisfies PillarsContent);
