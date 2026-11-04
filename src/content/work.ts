import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import yaml from "yaml";

export const stackItemSchema = z.object({
  name: z.string(),
  why: z.string().optional(),
});

export const stackGroupSchema = z.object({
  label: z.string(),
  items: z.array(stackItemSchema).min(1),
});

export const heroMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  poster: z.string().optional(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const caseStudyFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  statusLabel: z.string(),
  clientDisclosure: z.enum(["named", "anonymized"]),
  clientName: z.string().optional(),
  timeframe: z.string(),
  teamSize: z.number(),
  ourRole: z.array(z.string()).min(1),
  summary: z.string(),
  heroMedia: heroMediaSchema,
  featured: z.boolean().default(false),
  order: z.number().default(1),
  stack: z.array(stackGroupSchema),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export function parseMdxFile(filePath: string): CaseStudy {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match || !match[1] || match[2] === undefined) {
    throw new Error(`File ${filePath} is missing valid YAML frontmatter`);
  }

  const rawYaml: string = match[1];
  const content: string = match[2];
  const parsedYaml = yaml.parse(rawYaml);
  const frontmatter = caseStudyFrontmatterSchema.parse(parsedYaml);

  return { frontmatter, content };
}

export function getCaseStudies(): CaseStudyFrontmatter[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  const files = fs.readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));
  const studies = files.map((file) => {
    const { frontmatter } = parseMdxFile(path.join(WORK_DIR, file));
    return frontmatter;
  });
  return studies.sort((a, b) => a.order - b.order);
}

export function getFeaturedCaseStudy(): CaseStudyFrontmatter | undefined {
  const all = getCaseStudies();
  return all.find((cs) => cs.featured) || all[0];
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseMdxFile(filePath);
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getClientDisplayName(cs: CaseStudyFrontmatter): string {
  if (cs.clientDisclosure === "anonymized") {
    return "Confidential client";
  }
  return cs.clientName || cs.title;
}
