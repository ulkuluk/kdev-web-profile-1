import { z } from "zod";
import { nonEmpty, optionalUrl, roleSchema } from "./_shared";

export const projectsSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  labels: z.object({
    challenge: z.string(),
    solution: z.string(),
    features: z.string(),
    stack: z.string(),
    role: z.string(),
    outcome: z.string(),
    screenshots: z.string(),
    mockNote: z.string(),
  }),
  items: z
    .array(
      z.object({
        slug: z.string().regex(/^[a-z0-9-]+$/),
        title: z.string(),
        type: z.string(),
        /** One-line status shown as a badge. Never claim "live". */
        status: z.string(),
        summary: z.string(),
        challenge: nonEmpty,
        solution: nonEmpty,
        features: z.array(z.string()).min(1),
        stack: z.array(z.string()).min(1),
        role: z.array(z.string()).min(1),
        outcome: nonEmpty,
        /** `src: ""` renders the built-in mock UI instead of an image. */
        screenshots: z.array(
          z.object({ alt: z.string(), src: optionalUrl.or(z.string().startsWith("/")) }),
        ),
        /** Roles that took part (rendered as chips). */
        team: z.array(roleSchema),
      }),
    )
    .min(1),
});
export type ProjectsContent = z.infer<typeof projectsSchema>;
export type Project = ProjectsContent["items"][number];

export const projects = projectsSchema.parse({
  eyebrow: "Featured project",
  title: "A support platform for content creators",
  description:
    "Our first delivered project: a web app where fans can support the creators they follow.",
  labels: {
    challenge: "Challenge",
    solution: "Solution",
    features: "Key features",
    stack: "Tech stack",
    role: "Our role",
    outcome: "Outcome",
    screenshots: "Screens",
    mockNote: "Placeholder illustration. Real screenshots to follow.",
  },
  items: [
    {
      slug: "creator-support-platform",
      title: "Creator donation and support platform",
      type: "Web application",
      status: "MVP delivered",
      summary: "A web app for content creators to receive donations from their fans.",
      // REVIEW: challenge/solution are written from the brief only. Confirm and expand with real details.
      challenge:
        "Content creators needed a simple, trustworthy way for fans to support them directly, without a heavy setup on the creator's side.",
      solution:
        "We designed and built a web application where creators set up a profile and fans can send support. We delivered it as a production-ready MVP.",
      features: [
        "TODO: key feature 1",
        "TODO: key feature 2",
        "TODO: key feature 3",
        "TODO: key feature 4",
      ],
      stack: ["TODO: front-end stack", "TODO: back-end stack", "TODO: database and hosting"],
      role: ["TODO: describe KDEV's role, e.g. product, design, build, QA and release"],
      outcome:
        "MVP delivered and production-ready. The client has paused the launch, so the product is not publicly available.",
      screenshots: [
        { alt: "TODO: describe screenshot 1 (creator page)", src: "" },
        { alt: "TODO: describe screenshot 2 (support flow)", src: "" },
      ],
      team: [
        "Project Manager",
        "UI/UX Designer",
        "Frontend Engineer",
        "Backend Engineer",
        "QA Engineer",
        "DevOps Engineer",
      ],
    },
  ],
} satisfies ProjectsContent);
