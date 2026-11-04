import { z } from "zod";
import { iconNames } from "@/lib/icons";

/** Shared building blocks for content schemas. */

export const iconSchema = z.enum(iconNames);

/** A URL, or "" meaning "not provided yet" (the UI hides the element). */
export const optionalUrl = z.union([z.url(), z.literal("")]);

/** Team roles. Used by team members and by the process-step ownership mapping. */
export const roles = [
  "Project Manager",
  "UI/UX Designer",
  "Frontend Engineer",
  "Backend Engineer",
  "QA Engineer",
  "DevOps Engineer",
] as const;
export const roleSchema = z.enum(roles);
export type Role = z.infer<typeof roleSchema>;

export const nonEmpty = z.string().trim().min(1);

/** Anchor ids of every page section. Sections render with these; nav links are validated against them. */
export const sectionIds = {
  hero: "top",
  clients: "clients",
  services: "services",
  work: "work",
  process: "process",
  team: "team",
  stack: "stack",
  next: "next",
  faq: "faq",
  contact: "contact",
} as const;
