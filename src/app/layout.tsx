import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { nav, site } from "@/content";
import { organizationJsonLd } from "@/lib/json-ld";
import { env } from "@/lib/env";
import "./globals.css";

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});
const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
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

export const viewport: Viewport = { themeColor: "#f8fafc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {/* Without JS, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[60] rounded-sm bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {nav.labels.skipLink}
        </a>
        <Header nav={nav} siteName={site.name} />
        <main id="main">{children}</main>
        <Footer site={site} nav={nav} />
        <script
          type="application/ld+json"
          // JSON-LD must be injected as raw JSON; "<" is escaped so content cannot close the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(site)).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
