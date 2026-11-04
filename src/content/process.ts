import { z } from "zod";
import { roleSchema } from "./_shared";

export const processSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  cta: z.object({ label: z.string(), href: z.string() }),
  ownerLabel: z.string(),
  steps: z
    .array(
      z.object({
        id: z.string(),
        stepNum: z.string(),
        title: z.string(),
        summary: z.string(),
        isAnchor: z.boolean().default(false),
        owners: z.array(roleSchema).min(1),
      }),
    )
    .min(4)
    .max(6),
});
export type WorkflowContent = z.infer<typeof processSchema>;

export const workflow = processSchema.parse({
  eyebrow: "Engagement Protocol",
  title: "From written scope to production handover",
  description:
    "We do not sell open-ended developer hours. Every engagement follows a disciplined sequence with signed verification criteria.",
  cta: { label: "Explore full engagement flow", href: "/services" },
  ownerLabel: "Responsible",
  steps: [
    {
      id: "scope-mou",
      stepNum: "01",
      title: "Written Scope & MoU",
      summary:
        "We draft feature boundaries, milestones, and fixed delivery pricing into a binding MoU. Both sides sign before any code begins.",
      isAnchor: true,
      owners: ["Project Manager"],
    },
    {
      id: "design",
      stepNum: "02",
      title: "Interactive UI/UX",
      summary:
        "High-fidelity component layouts and user journey flows. You review and approve exact screens before frontend implementation.",
      isAnchor: false,
      owners: ["UI/UX Designer"],
    },
    {
      id: "engineering",
      stepNum: "03",
      title: "Full-Stack Build",
      summary:
        "2 Frontend and 2 Backend engineers deliver tested slices in short sprints with regular working demos.",
      isAnchor: false,
      owners: ["Frontend Engineer", "Backend Engineer"],
    },
    {
      id: "qa",
      stepNum: "04",
      title: "Independent QA Testing",
      summary:
        "Dedicated QA engineer verifies acceptance criteria on real devices and automated test suites before release candidate sign-off.",
      isAnchor: false,
      owners: ["QA Engineer"],
    },
    {
      id: "devops-handover",
      stepNum: "05",
      title: "Production Launch & Handover",
      summary:
        "DevOps provisions cloud infrastructure, automated CI/CD pipelines, repository handover, and operational documentation.",
      isAnchor: false,
      owners: ["DevOps Engineer", "Project Manager"],
    },
  ],
} satisfies WorkflowContent);
