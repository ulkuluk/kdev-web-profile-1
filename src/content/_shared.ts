import { z } from "zod";
import { iconNames } from "@/lib/icons";

/** Shared building blocks for content schemas. */

export const iconSchema = z.enum(iconNames);

/** URL, or "" meaning "not provided yet" (the UI hides the element). */
export const optionalUrl = z.union([z.string().url(), z.literal("")]);

/** Team roles across the 8-person delivery unit. */
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

/** Section anchor IDs and page routes. */
export const sectionIds = {
  hero: "hero",
  pillars: "pillars",
  featuredWork: "featured-work",
  howItWorks: "how-it-works",
  cta: "cta",
} as const;

export const routes = {
  home: "/",
  services: "/services",
  work: "/work",
  about: "/about",
  contact: "/contact",
} as const;
