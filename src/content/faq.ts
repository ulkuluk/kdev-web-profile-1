import { z } from "zod";

export const faqSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  items: z
    .array(z.object({ id: z.string(), question: z.string(), answer: z.string() }))
    .min(5)
    .max(6),
});
export type FaqContent = z.infer<typeof faqSchema>;

// REVIEW: every answer below is deliberately non-committal. Confirm with the team before publishing.
export const faq = faqSchema.parse({
  eyebrow: "FAQ",
  title: "Common questions",
  description: "Short answers. For anything specific to your project, just ask.",
  items: [
    {
      id: "how-we-start",
      question: "How do we get started?",
      // REVIEW
      answer:
        "Send us a short description of what you want to build. We reply to set up a conversation about your goals, users and constraints, and then propose a scope and next steps.",
    },
    {
      id: "timelines",
      question: "How long does a project take?",
      // REVIEW
      answer:
        "It depends on scope and complexity. After an initial conversation we give you a timeline estimate that we can review together as the details become clearer.",
    },
    {
      id: "pricing",
      question: "How do you price projects?",
      // REVIEW
      answer:
        "Pricing depends on the scope and the model that suits you best. We discuss options openly during the first conversations so there are no surprises later.",
    },
    {
      id: "nda",
      question: "Can we sign an NDA?",
      // REVIEW
      answer:
        "Yes, we are happy to discuss an NDA before you share details about your project. Mention it in your message and we will take it from there.",
    },
    {
      id: "support",
      question: "Do you support the product after launch?",
      // REVIEW
      answer:
        "We can stay involved after release for fixes and further development. The scope and terms of support are agreed per project.",
    },
    {
      id: "team-size",
      question: "How big is the team?",
      // REVIEW
      answer:
        "We are a team of 8: a project manager, a UI/UX designer, two front-end engineers, two back-end engineers, a QA engineer and a DevOps engineer.",
    },
  ],
} satisfies FaqContent);
