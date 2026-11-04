import { z } from "zod";
import { teamSchema } from "./team";

export const toolboxGroupSchema = z.object({
  area: z.string(),
  tools: z.array(z.string()),
});

export const aboutSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  principles: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  team: teamSchema,
  toolbox: z.array(toolboxGroupSchema),
  productVision: z.string().optional(),
});
export type AboutContent = z.infer<typeof aboutSchema>;

import { team } from "./team";

export const about = aboutSchema.parse({
  eyebrow: "About KDEV",
  title: "An 8-specialist software engineering unit",
  description:
    "We are a tightly integrated delivery team built specifically to help early-stage startup founders take their vision to a verified, production-ready MVP.",
  principles: [
    {
      title: "Written Clarity Over Assumptions",
      description:
        "Every engagement begins with written milestones, feature boundaries, and clear acceptance criteria. We do not write code on ambiguous promises.",
    },
    {
      title: "Complete Team Ownership",
      description:
        "We do not outsource or pass work between siloed contractors. One unified team of 8 specialists handles project management, design, engineering, QA, and deployment.",
    },
    {
      title: "Production Software, Not Abandoned Mocks",
      description:
        "We build real applications backed by real databases, clean API architecture, automated testing, and secure infrastructure.",
    },
  ],
  team,
  toolbox: [
    {
      area: "Frontend",
      tools: ["Next.js App Router", "TypeScript", "Tailwind CSS", "React 19"], // TODO: review tools
    },
    {
      area: "Backend & Data",
      tools: ["Node.js", "PostgreSQL", "Prisma / Drizzle", "REST & GraphQL"], // TODO: review tools
    },
    {
      area: "Infrastructure & DevOps",
      tools: ["Docker", "GitHub Actions CI/CD", "Linux / VPS", "Cloudflare"], // TODO: review tools
    },
    {
      area: "Quality Assurance",
      tools: ["Vitest", "Playwright", "WCAG Accessibility Audits"], // TODO: review tools
    },
    {
      area: "Design & Product",
      tools: ["Figma", "Design Tokens", "Interactive Prototyping"], // TODO: review tools
    },
  ],
  productVision:
    "We also selectively incubate internal software products when we identify critical gaps in modern creator and operational tooling.",
} satisfies AboutContent);
