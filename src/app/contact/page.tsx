import type { Metadata } from "next";
import { contact, site } from "@/content";
import { Contact } from "@/components/sections/contact/contact";

export const metadata: Metadata = {
  title: "Start Your MVP — Contact & Scope Proposal",
  description:
    "Tell us about your startup product. We reply within one business day with scope boundaries, timeline milestones, and fixed pricing under a binding written MoU.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact content={contact} site={site} />;
}
