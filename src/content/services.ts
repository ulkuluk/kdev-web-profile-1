import { z } from "zod";
import { iconSchema } from "./_shared";

export const servicesSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  labels: z.object({ builds: z.string(), deliverables: z.string(), useCases: z.string() }),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        icon: iconSchema,
        summary: z.string(),
        deliverables: z.array(z.string()).min(1),
        useCases: z.array(z.string()).min(1),
      }),
    )
    .length(3),
});
export type ServicesContent = z.infer<typeof servicesSchema>;

export const services = servicesSchema.parse({
  eyebrow: "Services",
  title: "Three things we do well",
  description: "Pick one, or combine them. The same team works across all three.",
  labels: { builds: "What we build", deliverables: "Typical deliverables", useCases: "Example use cases" },
  items: [
    {
      id: "web",
      title: "Web applications",
      icon: "globe",
      summary: "Fast, accessible web apps and product front-ends that people enjoy using.",
      deliverables: [
        "UX flows and UI design",
        "Responsive front-end",
        "Back-end and database",
        "Automated tests and release setup",
      ],
      useCases: ["Customer portals", "Booking and ordering flows", "Platforms for creators or communities"],
    },
    {
      id: "custom-systems",
      title: "Custom systems",
      icon: "layout-dashboard",
      summary: "Internal tools, dashboards, business systems and APIs shaped around how you work.",
      deliverables: [
        "Process mapping and requirements",
        "Admin panels and dashboards",
        "REST APIs and integrations",
        "Access control and audit trails",
      ],
      useCases: ["Replacing spreadsheets", "Operations and reporting dashboards", "Connecting existing tools through APIs"],
    },
    {
      id: "mobile",
      title: "Mobile apps",
      icon: "smartphone",
      summary: "Mobile apps that pair cleanly with a web back-end and a consistent design.",
      deliverables: [
        "Mobile UX and UI design",
        "App development",
        "Back-end services",
        "Testing and store-release preparation",
      ],
      useCases: ["Companion apps for a web product", "Field-team tools", "Customer-facing apps"],
    },
  ],
} satisfies ServicesContent);
