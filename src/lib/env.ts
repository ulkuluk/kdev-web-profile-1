import { z } from "zod";

/**
 * The ONLY place environment variables are read. Everything else imports `env`.
 * NEXT_PUBLIC_* values must be accessed with literal `process.env.NAME` so Next can inline them.
 */
const schema = z.object({
  /** Formspree-style endpoint. Empty or missing means "fall back to mailto:". */
  formEndpoint: z.url().optional(),
  /** Web3Forms access key (optional). Sent as `access_key` in the payload. */
  formAccessKey: z.string().min(1).optional(),
  siteUrl: z.url(),
});

const blankToUndefined = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : undefined);

const parsed = schema.parse({
  formEndpoint: blankToUndefined(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
  formAccessKey: blankToUndefined(process.env.NEXT_PUBLIC_FORM_ACCESS_KEY),
  siteUrl: (blankToUndefined(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),
});

export const env = Object.freeze(parsed);
export type Env = typeof env;
