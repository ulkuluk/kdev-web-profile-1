"use client";

import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import type { ContactContent } from "@/content/contact";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { env } from "@/lib/env";
import { buildMailto, submitForm } from "@/lib/form/submit";
import { emptyValues, validateForm, type FormErrors, type FormValues } from "@/lib/form/validate";

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

type ContactFormProps = {
  content: ContactContent;
  /** Used by the mailto fallback when no form endpoint is configured. */
  email: string;
};

const fieldOrder = ["name", "email", "projectType", "message"] as const;

export function ContactForm({ content, email }: ContactFormProps) {
  const { form, errors: msgs, status: copy } = content;
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypot = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      // Clear a field's error as soon as the user edits it.
      if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateForm(values, msgs);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the error summary so keyboard / screen-reader users land on it.
      queueMicrotask(() => summaryRef.current?.focus());
      return;
    }
    if (!env.formEndpoint) {
      window.location.href = buildMailto(email, copy.mailtoSubject, values);
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    const result = await submitForm(values, honeypot.current?.value ?? "");
    if (result === "sent") {
      setValues(emptyValues);
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-md border border-success/40 bg-card p-8 text-center">
        <CircleCheck aria-hidden="true" className="mx-auto size-10 text-success" />
        <h3 className="mt-3 text-xl font-bold">{copy.successTitle}</h3>
        <p className="mt-1 text-muted-foreground">{copy.successBody}</p>
      </div>
    );
  }

  const errorList = fieldOrder.filter((k) => errors[k]);
  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={sending}>
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="form-error-title"
          className="rounded-md border border-destructive bg-card p-4"
        >
          <h3 id="form-error-title" className="font-bold text-destructive">
            {msgs.summaryTitle}
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map((k) => (
              <li key={k}>
                <a
                  href={`#contact-${k}`}
                  className="font-medium underline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`contact-${k}`)?.focus();
                  }}
                >
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label={form.fields.name} error={errors.name} required>
          {(a) => (
            <Input
              {...a}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
            />
          )}
        </Field>
        <Field id="contact-email" label={form.fields.email} error={errors.email} required>
          {(a) => (
            <Input
              {...a}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
            />
          )}
        </Field>
      </div>

      <Field id="contact-company" label={`${form.fields.company} (${form.optionalHint})`}>
        {(a) => (
          <Input
            {...a}
            name="company"
            autoComplete="organization"
            placeholder={form.placeholders.company}
            value={values.company}
            onChange={set("company")}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-projectType"
          label={form.fields.projectType}
          error={errors.projectType}
          required
        >
          {(a) => (
            <Select
              {...a}
              name="projectType"
              value={values.projectType}
              onChange={set("projectType")}
            >
              <option value="">{form.selectPrompt}</option>
              {form.projectTypes.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id="contact-budget" label={`${form.fields.budget} (${form.optionalHint})`}>
          {(a) => (
            <Select {...a} name="budget" value={values.budget} onChange={set("budget")}>
              <option value="">{form.selectPrompt}</option>
              {form.budgets.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      <Field id="contact-message" label={form.fields.message} error={errors.message} required>
        {(a) => (
          <Textarea
            {...a}
            name="message"
            placeholder={form.placeholders.message}
            value={values.message}
            onChange={set("message")}
          />
        )}
      </Field>

      {status === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-md border border-destructive bg-card p-4 text-sm"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div>
            <p className="font-bold text-destructive">{copy.errorTitle}</p>
            <p className="text-muted-foreground">{copy.errorBody}</p>
          </div>
        </div>
      )}
      {status === "mailto" && (
        <p role="status" className="text-sm text-muted-foreground">
          {copy.mailtoNote}
        </p>
      )}

      <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
        {sending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            {form.sending}
          </>
        ) : status === "error" ? (
          copy.retry
        ) : (
          form.submit
        )}
      </Button>
    </form>
  );
}
