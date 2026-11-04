import { Mail, MessageCircle } from "lucide-react";
import type { ContactContent } from "@/content/contact";
import type { SiteContent } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ContactForm } from "./contact-form";

type ContactProps = { content: ContactContent; site: SiteContent };

export function Contact({ content, site }: ContactProps) {
  const { email, whatsapp, whatsappMessage } = site.contact;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="mb-12 max-w-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
            {"//"} {content.eyebrow}
          </div>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {content.title}
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8">
            <Card className="shadow-hard rounded-xs border-border-dark p-6 sm:p-10">
              <ContactForm content={content} email={email} />
            </Card>
          </div>

          {/* Direct Founder Channels & Covenants (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            <Card className="space-y-5 rounded-xs border-border bg-card p-6">
              <div className="border-b border-border pb-2 font-mono text-xs font-semibold tracking-wider text-accent uppercase">
                {content.direct.title}
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {content.direct.note}
              </p>
              <div className="flex flex-col gap-3">
                {whatsapp && (
                  <Button
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    className="w-full justify-center"
                  >
                    <MessageCircle aria-hidden="true" className="size-4" />
                    <span>{content.direct.whatsappLabel}</span>
                  </Button>
                )}
                <Button
                  href={`mailto:${email}`}
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  <span>{content.direct.emailLabel}</span>
                </Button>
                <p className="mt-1 text-center font-mono text-xs break-all text-muted-foreground">
                  {email}
                </p>
              </div>
            </Card>

            <div className="space-y-2 rounded-xs border border-border bg-background p-5 font-mono text-xs text-muted-foreground">
              <span className="block font-bold text-foreground">WHAT HAPPENS NEXT?</span>
              <p>1. Review: Our Project Manager reviews technical requirements.</p>
              <p>2. Call: A 30-min discovery call to pin down MVP boundary.</p>
              <p>3. MoU: We provide written milestone scope and fixed price.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
