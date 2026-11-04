import type { ContactContent } from "@/content/contact";

export type FormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};
export type FormErrors = Partial<Record<"name" | "email" | "projectType" | "message", string>>;

export const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

// Deliberately simple: one @, a dot in the domain, no spaces. The server is the real authority.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_MESSAGE = 10;

/** Pure client-side validation. Returns an empty object when valid. */
export function validateForm(values: FormValues, errors: ContactContent["errors"]): FormErrors {
  const out: FormErrors = {};
  if (!values.name.trim()) out.name = errors.nameRequired;
  if (!values.email.trim()) out.email = errors.emailRequired;
  else if (!EMAIL.test(values.email.trim())) out.email = errors.emailInvalid;
  if (!values.projectType) out.projectType = errors.projectTypeRequired;
  const msg = values.message.trim();
  if (!msg) out.message = errors.messageRequired;
  else if (msg.length < MIN_MESSAGE) out.message = errors.messageShort;
  return out;
}
