import { z } from "zod";
import { optionalUrl, roleSchema } from "./_shared";

export const teamSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  linkLabels: z.object({ github: z.string(), linkedin: z.string() }),
  members: z
    .array(
      z.object({
        role: roleSchema,
        name: z.string(),
        /** Overrides the derived avatar initials. */
        initials: z.string().max(3).optional(),
        /** "" hides the link. */
        github: optionalUrl,
        linkedin: optionalUrl,
      }),
    )
    .length(8),
});
export type TeamContent = z.infer<typeof teamSchema>;
export type TeamMember = TeamContent["members"][number];

const todoMember = (role: TeamMember["role"], initials: string): TeamMember => ({
  role,
  name: "TODO: Name",
  initials,
  github: "", // TODO: add GitHub URL
  linkedin: "", // TODO: add LinkedIn URL
});

export const team = teamSchema.parse({
  eyebrow: "Team",
  title: "Eight specialists, one team",
  description: "Every role a project needs, working together from day one.",
  linkLabels: { github: "GitHub", linkedin: "LinkedIn" },
  members: [
    todoMember("Project Manager", "PM"),
    todoMember("UI/UX Designer", "UX"),
    todoMember("Frontend Engineer", "FE"),
    todoMember("Frontend Engineer", "FE"),
    todoMember("Backend Engineer", "BE"),
    todoMember("Backend Engineer", "BE"),
    todoMember("QA Engineer", "QA"),
    todoMember("DevOps Engineer", "DO"),
  ],
} satisfies TeamContent);
