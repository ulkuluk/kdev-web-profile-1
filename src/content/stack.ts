import { z } from "zod";

export const stackSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  groups: z.array(z.object({ label: z.string(), items: z.array(z.string()).min(1) })).min(1),
});
export type StackContent = z.infer<typeof stackSchema>;

export const stack = stackSchema.parse({
  eyebrow: "Tech stack",
  title: "Tools we work with",
  description: "We choose tools to fit your project, not the other way around.",
  groups: [
    { label: "Frontend", items: ["TODO: technology", "TODO: technology", "TODO: technology"] },
    { label: "Backend", items: ["TODO: technology", "TODO: technology", "TODO: technology"] },
    { label: "Mobile", items: ["TODO: technology", "TODO: technology"] },
    { label: "DevOps", items: ["TODO: technology", "TODO: technology", "TODO: technology"] },
    { label: "Design / QA", items: ["TODO: technology", "TODO: technology", "TODO: technology"] },
  ],
} satisfies StackContent);
