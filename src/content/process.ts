import { z } from "zod";
import { roleSchema } from "./_shared";

export const processSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  ownerLabel: z.string(),
  steps: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        owners: z.array(roleSchema).min(1),
      }),
    )
    .length(6),
});
export type WorkflowContent = z.infer<typeof processSchema>;

export const workflow = processSchema.parse({
  eyebrow: "How we work",
  title: "Six steps, each with an owner",
  description: "You always know what is happening and who is responsible for it.",
  ownerLabel: "Led by",
  steps: [
    {
      id: "discovery",
      title: "Discovery",
      summary: "We learn your goals, users and constraints, then agree on scope and priorities.",
      owners: ["Project Manager", "UI/UX Designer"],
    },
    {
      id: "design",
      title: "Design",
      summary:
        "User flows and interface designs you can review and react to before code is written.",
      owners: ["UI/UX Designer"],
    },
    {
      id: "build",
      title: "Build",
      summary: "Front-end and back-end are built in short iterations, with regular demos.",
      owners: ["Frontend Engineer", "Backend Engineer"],
    },
    {
      id: "qa",
      title: "QA",
      summary:
        "Testing against the agreed scope on real devices, with issues fixed before release.",
      owners: ["QA Engineer"],
    },
    {
      id: "launch",
      title: "Launch",
      summary: "Environments, deployment and release handled so go-live is routine, not stressful.",
      owners: ["DevOps Engineer", "Project Manager"],
    },
    {
      id: "support",
      title: "Support",
      summary:
        "We stay available after release for fixes and next steps. Terms are agreed per project.",
      owners: ["Project Manager", "DevOps Engineer"],
    },
  ],
} satisfies WorkflowContent);
