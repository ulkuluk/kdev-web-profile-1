import { z } from "zod";
import { iconSchema } from "./_shared";

export const phaseSchema = z.object({
  id: z.string(),
  number: z.string(),
  name: z.string(),
  timeline: z.string(),
  isMoUAnchor: z.boolean().default(false),
  deliverables: z.array(z.string()),
  reviewStatus: z.string().optional(),
});

export const capabilitySchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: iconSchema,
  summary: z.string(),
  deliverables: z.array(z.string()),
  examples: z.array(z.string()),
});

export const servicesSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  mvpOffer: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    included: z.array(z.string()),
    notIncluded: z.array(z.string()),
  }),
  phases: z.array(phaseSchema).min(4),
  pricing: z.object({
    title: z.string(),
    description: z.string(),
    note: z.string(),
    packagesNote: z.string(),
  }),
  capabilities: z.array(capabilitySchema).length(3),
});
export type ServicesContent = z.infer<typeof servicesSchema>;

export const services = servicesSchema.parse({
  eyebrow: "Our Core Engagement",
  title: "MVP to Production",
  description:
    "We take your startup idea all the way to a tested, deployable production release under an agreed written scope.",
  mvpOffer: {
    title: "Full-Stack MVP Delivery",
    tagline: "One dedicated cross-functional unit of 8 specialists.",
    description:
      "We design, build, test, and deploy software that real users can sign into on day one. We never stop at prototypes or hand off unmaintained design files.",
    included: [
      "Written scope & binding MoU with fixed deliverable boundaries",
      "Interactive UI/UX design and design system foundation",
      "Full-stack engineering (2 Frontend + 2 Backend engineers)",
      "Dedicated QA verification on real browsers and devices",
      "DevOps CI/CD pipelines, production hosting setup, and domain config",
      "Complete source code repository handover with zero vendor lock-in",
    ],
    notIncluded: [
      "Open-ended, undocumented hourly billing with scope creep",
      "Unvetted junior developers or revolving-door contractor staffing",
      "Clickable mockups left without real backend or database infrastructure",
      "Hidden infrastructure markups or ongoing proprietary licensing fees",
    ],
  },
  phases: [
    {
      id: "phase-1",
      number: "01",
      name: "Scope Document & Binding MoU",
      timeline: "Days 1–5",
      isMoUAnchor: true,
      deliverables: [
        "Technical boundary specification",
        "Milestone roadmap with deliverable gates",
        "Fixed delivery pricing schedule",
        "Mutual non-disclosure & intellectual property covenant",
      ],
      reviewStatus: "LOCKED BEFORE COMMITTING CODE",
    },
    {
      id: "phase-2",
      number: "02",
      name: "Interactive UI/UX & Architecture Blueprint",
      timeline: "Sprint 1",
      isMoUAnchor: false,
      deliverables: [
        "Component design system & typography scale",
        "High-fidelity clickable user flows",
        "Database schema and API endpoint contract",
      ],
      // REVIEW: milestone acceptance criteria to be confirmed with founder per project
      reviewStatus: "// REVIEW: Milestone 01 Acceptance Gate",
    },
    {
      id: "phase-3",
      number: "03",
      name: "Production Build & Bi-Weekly Demos",
      timeline: "Sprints 2–4",
      isMoUAnchor: false,
      deliverables: [
        "Modular Next.js / TypeScript front-end architecture",
        "Secure backend REST/GraphQL services & PostgreSQL data store",
        "Authentication, authorization, and transactional email hooks",
      ],
      // REVIEW: demo sprint cadence depends on product scope
      reviewStatus: "// REVIEW: Working Software Demos every 2 weeks",
    },
    {
      id: "phase-4",
      number: "04",
      name: "Independent QA Testing & Hardening",
      timeline: "Pre-Release Sprint",
      isMoUAnchor: false,
      deliverables: [
        "Cross-browser and mobile device verification matrix",
        "Performance, accessibility (WCAG AA), and edge-case regression audit",
        "Security boundary checks and environment variable audit",
      ],
      // REVIEW: security audit scope varies by compliance needs
      reviewStatus: "// REVIEW: Acceptance Criteria Sign-Off",
    },
    {
      id: "phase-5",
      number: "05",
      name: "Production Launch & Operational Handover",
      timeline: "Release Week",
      isMoUAnchor: false,
      deliverables: [
        "Live infrastructure provisioning (Docker / VPS / Serverless)",
        "Automated GitHub Actions CI/CD deployment pipelines",
        "Repository ownership transfer and environment credential handover",
        "System runbook documentation and founder walkthrough session",
      ],
      // REVIEW: post-launch warranty period agreed in writing
      reviewStatus: "// REVIEW: Handover & Post-Launch Terms",
    },
  ],
  pricing: {
    title: "Startup-Friendly, Milestone-Based Pricing",
    description:
      "We design our pricing around founder runway. Scope, milestones, and payment disbursements are agreed in writing before any development begins. We never use vague time-and-materials billing that leaves founders with ballooning costs.",
    note: "Fair and transparent capital commitment. Never inflated; never unbacked promises.",
    packagesNote:
      "TODO: Specific pricing ranges and tier structures will be confirmed in your written MoU based on your feature specification.",
  },
  capabilities: [
    {
      id: "web",
      title: "Web Applications",
      icon: "globe",
      summary: "Fast, accessible web applications and SaaS platforms built with modern standards.",
      deliverables: [
        "Responsive App Router frontends",
        "Secure API integrations & relational databases",
        "Automated CI/CD build pipelines",
      ],
      examples: ["Customer portals", "Content creator platforms", "Subscription SaaS"],
    },
    {
      id: "custom-systems",
      title: "Custom Systems & Portals",
      icon: "layout-dashboard",
      summary:
        "Operational dashboards, internal tooling, and automated workflows shaped to your business.",
      deliverables: [
        "Administrative management consoles",
        "Role-based access control (RBAC)",
        "Database migrations & legacy integration",
      ],
      examples: ["Operations dashboards", "Spreadsheet replacements", "Internal toolkits"],
    },
    {
      id: "mobile",
      title: "Mobile Applications",
      icon: "smartphone",
      summary: "Cross-platform mobile apps providing seamless experiences on iOS and Android.",
      deliverables: [
        "React Native / mobile-first codebases",
        "Push notification integrations",
        "Offline-capable data sync",
      ],
      examples: ["Founder companion apps", "On-the-go dashboards", "Member portals"],
    },
  ],
} satisfies ServicesContent);
