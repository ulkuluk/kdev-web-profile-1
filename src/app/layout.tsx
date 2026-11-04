import type { Metadata, Viewport } from "next";
import { Epilogue, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { nav, site } from "@/content";
import { organizationJsonLd } from "@/lib/json-ld";
import { env } from "@/lib/env";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["600", "700", "800"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${site.name}: ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { themeColor: "#F4F3EF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-background font-serif text-foreground antialiased selection:bg-accent-tint selection:text-accent">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[60] rounded-xs border border-border-dark bg-primary px-4 py-2 font-mono text-xs font-semibold text-on-primary uppercase shadow-sm focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {nav.labels.skipLink}
        </a>
        <Header nav={nav} siteName={site.name} />
        <main id="main">{children}</main>
        <Footer site={site} nav={nav} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(site)).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
