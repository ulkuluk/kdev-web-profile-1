import type { Metadata } from "next";
import { services, faq } from "@/content";
import { ServicesOverview } from "@/components/sections/services/services";

export const metadata: Metadata = {
  title: "Services & Engagement Protocol",
  description:
    "KDEV's full MVP-to-production delivery offer: what's included, what's not, engagement milestones, and startup-friendly pricing under a binding written MoU.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesOverview services={services} faq={faq} />;
}
