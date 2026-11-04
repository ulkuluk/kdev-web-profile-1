import { z } from "zod";

const option = z.object({ value: z.string(), label: z.string() });

export const contactSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  form: z.object({
    fields: z.object({
      name: z.string(),
      email: z.string(),
      company: z.string(),
      projectType: z.string(),
      budget: z.string(),
      message: z.string(),
    }),
    placeholders: z.object({ message: z.string(), company: z.string() }),
    selectPrompt: z.string(),
    optionalHint: z.string(),
    submit: z.string(),
    sending: z.string(),
    projectTypes: z.array(option).min(1),
    budgets: z.array(option).min(1),
  }),
  errors: z.object({
    summaryTitle: z.string(),
    nameRequired: z.string(),
    emailRequired: z.string(),
    emailInvalid: z.string(),
    messageRequired: z.string(),
    messageShort: z.string(),
    projectTypeRequired: z.string(),
  }),
  status: z.object({
    successTitle: z.string(),
    successBody: z.string(),
    errorTitle: z.string(),
    errorBody: z.string(),
    retry: z.string(),
    mailtoNote: z.string(),
    mailtoSubject: z.string(),
  }),
  direct: z.object({
    title: z.string(),
    emailLabel: z.string(),
    whatsappLabel: z.string(),
    note: z.string(),
  }),
});
export type ContactContent = z.infer<typeof contactSchema>;

export const contact = contactSchema.parse({
  eyebrow: "Contact",
  title: "Tell us about your project",
  description: "A few lines are enough to start. We reply to every message.",
  form: {
    fields: {
      name: "Name",
      email: "Email",
      company: "Company",
      projectType: "Project type",
      budget: "Budget range",
      message: "Message",
    },
    placeholders: {
      message: "What are you building, and what would a good result look like?",
      company: "Optional",
    },
    selectPrompt: "Select an option",
    optionalHint: "optional",
    submit: "Send message",
    sending: "Sending…",
    projectTypes: [
      { value: "web", label: "Web application" },
      { value: "custom-system", label: "Custom system" },
      { value: "mobile", label: "Mobile app" },
      { value: "not-sure", label: "Not sure yet" },
    ],
    // REVIEW: descriptive ranges because no currency or amounts were provided. Replace with real figures.
    budgets: [
      { value: "lean-mvp", label: "Lean MVP" },
      { value: "mid-size", label: "Mid-size build" },
      { value: "larger", label: "Larger programme" },
      { value: "not-sure", label: "Not sure yet" },
    ],
  },
  errors: {
    summaryTitle: "Please fix the following",
    nameRequired: "Enter your name.",
    emailRequired: "Enter your email address.",
    emailInvalid: "Enter a valid email address, like name@company.com.",
    messageRequired: "Tell us a little about your project.",
    messageShort: "Please write at least 10 characters.",
    projectTypeRequired: "Select a project type.",
  },
  status: {
    successTitle: "Message sent",
    successBody: "Thanks. We will get back to you soon.",
    errorTitle: "We could not send your message",
    errorBody: "Please try again, or email us directly.",
    retry: "Try again",
    mailtoNote: "The contact form is not connected yet, so this opens your email app.",
    mailtoSubject: "New project enquiry",
  },
  direct: {
    title: "Prefer to talk directly?",
    emailLabel: "Email us",
    whatsappLabel: "Chat on WhatsApp",
    note: "Reply times are usually within one working day.", // REVIEW
  },
} satisfies ContactContent);
