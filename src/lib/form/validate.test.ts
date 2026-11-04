import { describe, expect, it } from "vitest";
import { contact } from "@/content/contact";
import { emptyValues, validateForm, type FormValues } from "./validate";

const ok: FormValues = {
  ...emptyValues,
  name: "Ada",
  email: "ada@company.com",
  projectType: "Web application",
  message: "We need a customer portal.",
};
const check = (v: Partial<FormValues>) => validateForm({ ...ok, ...v }, contact.errors);

describe("validateForm", () => {
  it("accepts a complete, valid form (company and budget are optional)", () => {
    expect(check({})).toEqual({});
  });

  it("requires name, email, project type and message", () => {
    const errors = validateForm(emptyValues, contact.errors);
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "projectType"]);
  });

  it("treats whitespace-only input as empty", () => {
    expect(check({ name: "   " }).name).toBe(contact.errors.nameRequired);
  });

  it.each(["no-at.com", "a@b", "a b@c.com", "@c.com"])("rejects invalid email %s", (email) => {
    expect(check({ email }).email).toBe(contact.errors.emailInvalid);
  });

  it("rejects a too-short message", () => {
    expect(check({ message: "hi" }).message).toBe(contact.errors.messageShort);
  });
});
