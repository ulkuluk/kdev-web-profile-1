import { env } from "@/lib/env";
import type { FormValues } from "./validate";

export type SubmitResult = "sent" | "error";

/** Build a mailto: URL used when no form endpoint is configured. */
export function buildMailto(email: string, subject: string, v: FormValues): string {
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.company && `Company: ${v.company}`,
    `Stage: ${v.stage}`,
    v.timeline && `Desired Timeline: ${v.timeline}`,
    v.budget && `Budget Range: ${v.budget}`,
    v.link && `Reference Link: ${v.link}`,
    "",
    "Project Description:",
    v.message,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * POST the form as JSON to the configured endpoint (Formspree-style; Web3Forms works too with
 * optional access key). `honeypot` is a hidden spam field: bots fill it, humans never see it.
 */
export async function submitForm(
  values: FormValues,
  honeypot: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!env.formEndpoint) return "error";
  // Bots get a fake success so they learn nothing; nothing is sent.
  if (honeypot) return "sent";
  try {
    const res = await fetchImpl(env.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...values,
        ...(env.formAccessKey && { access_key: env.formAccessKey }),
      }),
    });
    return res.ok ? "sent" : "error";
  } catch {
    return "error";
  }
}
