import { z } from "zod";

export const nextSchema = z.object({
  eyebrow: z.string(),
  badge: z.string(),
  title: z.string(),
  body: z.string(),
});
export type NextContent = z.infer<typeof nextSchema>;

export const upNext = nextSchema.parse({
  eyebrow: "What's next",
  badge: "Coming soon",
  title: "Building our own products",
  body: "Alongside client work, we are starting to build products of our own. There is nothing to show yet, and we would rather release something solid than announce something early.",
} satisfies NextContent);
