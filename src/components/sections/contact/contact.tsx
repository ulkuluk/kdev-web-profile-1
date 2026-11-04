import { Mail, MessageCircle } from "lucide-react";
import type { ContactContent } from "@/content/contact";
import type { SiteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

type ContactProps = { content: ContactContent; site: SiteContent };

export function Contact({ content, site }: ContactProps) {
  const { email, whatsapp, whatsappMessage } = site.contact;
  return (
    <Section
      id="contact"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid items-start gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Card className="p-6 sm:p-8">
            <ContactForm content={content} email={email} />
          </Card>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <Card className="space-y-4">
            <h3 className="text-lg font-bold">{content.direct.title}</h3>
            <p className="text-sm text-muted-foreground">{content.direct.note}</p>
            <div className="flex flex-col gap-3">
              {/* Hidden when no WhatsApp number has been provided. */}
              {whatsapp && (
                <Button
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <MessageCircle aria-hidden="true" className="size-5" />
                  {content.direct.whatsappLabel}
                </Button>
              )}
              <Button href={`mailto:${email}`} variant="secondary">
                <Mail aria-hidden="true" className="size-5" />
                {content.direct.emailLabel}
              </Button>
              <p className="text-center font-mono text-sm break-all text-muted-foreground">
                {email}
              </p>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
