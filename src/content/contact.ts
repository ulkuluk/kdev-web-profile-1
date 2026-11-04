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
      stage: z.string(),
      message: z.string(),
      timeline: z.string(),
      budget: z.string(),
      link: z.string(),
    }),
    placeholders: z.object({
      company: z.string(),
      message: z.string(),
      link: z.string(),
    }),
    selectPrompt: z.string(),
    optionalHint: z.string(),
    submit: z.string(),
    sending: z.string(),
    stages: z.array(option).min(3),
    timelines: z.array(option).min(3),
    budgets: z.array(option).min(3),
  }),
  errors: z.object({
    summaryTitle: z.string(),
    nameRequired: z.string(),
    emailRequired: z.string(),
    emailInvalid: z.string(),
    stageRequired: z.string(),
    messageRequired: z.string(),
    messageShort: z.string(),
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
  eyebrow: "Start Your MVP",
  title: "Tell us what you want to build",
  description:
    "We reply within one business day with initial feedback, architectural suggestions, and proposed scope boundaries.",
  form: {
    fields: {
      name: "Your Name",
      email: "Work Email",
      company: "Company or Startup Name",
      stage: "Current Product Stage",
      message: "What do you want to build?",
      timeline: "Target Timeline",
      budget: "Estimated Budget Range",
      link: "Deck, Prototype, or Reference URL",
    },
    placeholders: {
      company: "Acme Corp (optional)",
      message: "Describe your core MVP problem, key features, and your target audience.",
      link: "https://... (optional)",
    },
    selectPrompt: "Select an option",
    optionalHint: "optional",
    submit: "Submit MVP Brief",
    sending: "Sending...",
    stages: [
      { value: "idea", label: "Idea / Pre-seed" },
      { value: "prototype", label: "Prototype / Wireframes ready" },
      { value: "have-users", label: "Have active users / Scaling" },
    ],
    timelines: [
      { value: "under-1m", label: "Under 1 month" },
      { value: "1-3m", label: "1 to 3 months" },
      { value: "3-6m", label: "3 to 6 months" },
      { value: "flexible", label: "Flexible timeline" },
    ],
    budgets: [
      { value: "under-5k", label: "< $5,000" },
      { value: "5k-15k", label: "$5,000 – $15,000" },
      { value: "15k-30k", label: "$15,000 – $30,000" },
      { value: "30k-plus", label: "$30,000+" },
      { value: "undecided", label: "Not sure yet" },
    ],
  },
  errors: {
    summaryTitle: "Please fix the following errors:",
    nameRequired: "Enter your name.",
    emailRequired: "Enter your email address.",
    emailInvalid: "Enter a valid email address.",
    stageRequired: "Select your current product stage.",
    messageRequired: "Tell us a little about your project.",
    messageShort: "Please write at least 10 characters.",
  },
  status: {
    successTitle: "Brief received",
    successBody:
      "Thanks. Our Project Manager will review your notes and reach out within 24 hours.",
    errorTitle: "Could not send brief",
    errorBody: "Please try again, or reach out to our team directly via email or WhatsApp.",
    retry: "Try again",
    mailtoNote:
      "The contact endpoint is in mailto fallback mode, so this will open your mail client.",
    mailtoSubject: "New Startup MVP Enquiry",
  },
  direct: {
    title: "Direct Founder Inquiries",
    emailLabel: "Email our team",
    whatsappLabel: "Chat on WhatsApp",
    note: "All conversations are held under strict mutual confidentiality.",
  },
} satisfies ContactContent);
