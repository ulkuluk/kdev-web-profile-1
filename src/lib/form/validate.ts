import type { ContactContent } from "@/content/contact";

export type FormValues = {
  name: string;
  email: string;
  company: string;
  stage: string;
  message: string;
  timeline: string;
  budget: string;
  link: string;
};

export type FormErrors = Partial<Record<"name" | "email" | "stage" | "message", string>>;

export const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  stage: "",
  message: "",
  timeline: "",
  budget: "",
  link: "",
};

// Deliberately simple: one @, a dot in domain, no spaces. Server is real authority.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_MESSAGE = 10;

/** Pure client-side validation. Returns empty object if valid. */
export function validateForm(values: FormValues, errors: ContactContent["errors"]): FormErrors {
  const out: FormErrors = {};
  if (!values.name.trim()) out.name = errors.nameRequired;
  if (!values.email.trim()) out.email = errors.emailRequired;
  else if (!EMAIL.test(values.email.trim())) out.email = errors.emailInvalid;
  if (!values.stage) out.stage = errors.stageRequired;
  const msg = values.message.trim();
  if (!msg) out.message = errors.messageRequired;
  else if (msg.length < MIN_MESSAGE) out.message = errors.messageShort;
  return out;
}
