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
  /** Used by mailto fallback when no form endpoint is configured. */
  email: string;
};

const fieldOrder = ["name", "email", "stage", "message"] as const;

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
      // Clear field's error as soon as the user edits it.
      if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateForm(values, msgs);
    setErrors(found);
    if (Object.keys(found).length > 0) {
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
      <div
        role="status"
        className="shadow-hard rounded-xs border border-accent bg-accent-tint/30 p-8 text-center"
      >
        <CircleCheck aria-hidden="true" className="mx-auto size-10 text-accent" />
        <h3 className="mt-3 font-display text-xl font-bold text-foreground">{copy.successTitle}</h3>
        <p className="mt-1 font-body text-muted-foreground">{copy.successBody}</p>
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
          className="rounded-xs border border-destructive bg-card p-4"
        >
          <h3
            id="form-error-title"
            className="font-mono text-xs font-bold tracking-wider text-destructive uppercase"
          >
            {msgs.summaryTitle}
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs text-foreground">
            {errorList.map((k) => (
              <li key={k}>
                <a
                  href={`#contact-${k}`}
                  className="font-medium underline hover:text-accent"
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

      {/* Honeypot */}
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

      <div className="grid gap-5 sm:grid-cols-2">
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

        <Field id="contact-stage" label={form.fields.stage} error={errors.stage} required>
          {(a) => (
            <Select {...a} name="stage" value={values.stage} onChange={set("stage")}>
              <option value="">{form.selectPrompt}</option>
              {form.stages.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-timeline" label={`${form.fields.timeline} (${form.optionalHint})`}>
          {(a) => (
            <Select {...a} name="timeline" value={values.timeline} onChange={set("timeline")}>
              <option value="">{form.selectPrompt}</option>
              {form.timelines.map((o) => (
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

      <Field id="contact-link" label={`${form.fields.link} (${form.optionalHint})`}>
        {(a) => (
          <Input
            {...a}
            name="link"
            type="url"
            placeholder={form.placeholders.link}
            value={values.link}
            onChange={set("link")}
          />
        )}
      </Field>

      <Field id="contact-message" label={form.fields.message} error={errors.message} required>
        {(a) => (
          <Textarea
            {...a}
            name="message"
            rows={5}
            placeholder={form.placeholders.message}
            value={values.message}
            onChange={set("message")}
          />
        )}
      </Field>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xs border border-destructive bg-card p-3 font-mono text-xs text-destructive"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          <span>
            {copy.errorTitle}. {copy.errorBody}
          </span>
        </div>
      )}

      {status === "mailto" && (
        <p className="font-mono text-xs text-muted-foreground">{copy.mailtoNote}</p>
      )}

      <Button type="submit" disabled={sending} variant="primary" size="lg" className="w-full">
        {sending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            <span>{form.sending}</span>
          </>
        ) : status === "error" ? (
          <span>{copy.retry}</span>
        ) : (
          <span>{form.submit} &rarr;</span>
        )}
      </Button>
    </form>
  );
}
