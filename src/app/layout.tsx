import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE_URL = "https://www.houselandgroup.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CrossGlobe — Premium Aluminium & Building Materials | Netherlands",
    template: "%s | CrossGlobe",
  },
  description:
    "CrossGlobe is a leading Dutch supplier of premium aluminium systems, façades, glazing, hardware and construction materials — engineered for Europe's most demanding architectural and infrastructure projects.",
  keywords: [
    "aluminium systems Netherlands",
    "curtain wall supplier",
    "aluminium windows and doors",
    "building materials wholesale",
    "construction materials Benelux",
    "architectural aluminium",
    "CrossGlobe",
  ],
  authors: [{ name: "CrossGlobe B.V." }],
  creator: "CrossGlobe B.V.",
  publisher: "CrossGlobe B.V.",
  alternates: {
    canonical: "/",
    languages: {
      "nl-NL": "/nl",
      "en-US": "/",
      "de-DE": "/de",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CrossGlobe",
    title: "CrossGlobe — Premium Aluminium & Building Materials",
    description:
      "Engineered aluminium systems and building materials for Europe's modern construction. Trusted by architects, contractors and developers across the Benelux.",
    images: [
      {
        url: "https://images.pexels.com/photos/19107852/pexels-photo-19107852.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "CrossGlobe — modern glass and aluminium architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrossGlobe — Premium Aluminium & Building Materials",
    description:
      "Engineered aluminium systems and building materials for Europe's modern construction.",
    images: [
      "https://images.pexels.com/photos/19107852/pexels-photo-19107852.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Construction & Building Materials",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CrossGlobe B.V.",
              legalName: "CrossGlobe B.V.",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description:
                "Premium supplier of aluminium systems and building materials in the Netherlands.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Havenstraat 142",
                addressLocality: "Rotterdam",
                postalCode: "3011 WT",
                addressCountry: "NL",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+31 10 200 4400",
                contactType: "sales",
                areaServed: ["NL", "BE", "DE", "LU", "FR"],
                availableLanguage: ["Dutch", "English", "German"],
              },
              sameAs: [
                "https://www.linkedin.com/company/crossglobe",
                "https://www.instagram.com/crossglobe",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-ink-800 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
