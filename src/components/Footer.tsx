"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Award,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const LinkedInIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
  </svg>
);
const InstagramIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08zm6.95-9.22a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0z" />
  </svg>
);
const YoutubeIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

const columns = [
  {
    title: "Products",
    links: [
      { label: "Aluminium Doors", href: "/products?category=aluminium-doors" },
      { label: "Aluminium Windows", href: "/products?category=aluminium-windows" },
      { label: "Curtain Walls", href: "/products?category=curtain-walls" },
      { label: "Sliding Systems", href: "/products?category=sliding-systems" },
      { label: "Architectural Glass", href: "/products?category=glass" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Industries", href: "/industries" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Downloads & CAD", href: "/resources" },
      { label: "Brochures", href: "/resources#brochures" },
      { label: "BIM Files", href: "/resources#bim" },
      { label: "Technical Sheets", href: "/resources#technical" },
      { label: "Case Studies", href: "/resources#studies" },
      { label: "FAQ", href: "/resources#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Trade Portal", href: "/portal" },
      { label: "Request Quote", href: "/quote" },
      { label: "Delivery", href: "/resources#delivery" },
      { label: "Returns", href: "/resources#returns" },
      { label: "Warranty", href: "/resources#warranty" },
    ],
  },
];

const certifications = [
  { icon: Award, label: "ISO 9001" },
  { icon: ShieldCheck, label: "CE Marked" },
  { icon: Leaf, label: "Cradle to Cradle" },
  { icon: ShieldCheck, label: "EN 13830" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
    } catch {
      /* noop */
    }
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 5000);
  }

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-mist-300">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60%] -translate-x-1/2 bg-radial-copper blur-3xl" />

      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="container-lux grid items-center gap-8 py-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-copper-300">
              <span className="h-px w-7 bg-copper-400/70" /> Insights for specifiers
            </span>
            <h3 className="mt-4 max-w-lg text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
              Engineering bulletins, new systems &amp; market intelligence.
            </h3>
            <p className="mt-3 max-w-md text-mist-400">
              Join 12,000 architects, contractors and procurement teams. Double opt-in, GDPR-compliant, unsubscribe anytime.
            </p>
          </div>
          <div className="lg:justify-self-end lg:w-[460px]">
            {done ? (
              <div className="flex items-center gap-3 rounded-xl border border-copper-400/40 bg-copper-500/10 px-5 py-4 text-white">
                <CheckCircle2 className="h-5 w-5 text-copper-300" />
                <span className="text-sm">
                  Check your inbox — we&apos;ve sent a confirmation link to complete your subscription.
                </span>
              </div>
            ) : (
              <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-mist-500 focus:border-copper-400"
                />
                <button
                  type="submit"
                  className="btn-shine flex shrink-0 items-center justify-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-copper-600"
                >
                  Subscribe <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-mist-500">
              By subscribing you agree to our{" "}
              <Link href="/resources#privacy" className="text-copper-300 underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative container-lux grid gap-12 py-16 lg:grid-cols-[1.4fr_3fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist-400">
            A premium Dutch supplier of aluminium systems and building materials — engineered for Europe&apos;s most demanding construction.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper-400" />
              <span>
                {site.address.street}, {site.address.postal} {site.address.city}, {site.address.country}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-copper-400" />
              <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-copper-400" />
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: LinkedInIcon, href: site.social.linkedin, label: "LinkedIn" },
              { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
              { Icon: YoutubeIcon, href: site.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-mist-300 transition hover:border-copper-400 hover:bg-copper-500 hover:text-white"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-mist-400 transition hover:text-copper-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="relative border-t border-white/10">
        <div className="container-lux flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6">
          {certifications.map((c) => (
            <span key={c.label} className="flex items-center gap-2 text-xs font-medium text-mist-400">
              <c.icon className="h-4 w-4 text-copper-400" />
              {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="relative border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-xs text-mist-500 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {site.legalName}. KVK {site.kvk} · VAT {site.vat}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/resources#privacy" className="hover:text-copper-300">Privacy Policy</Link>
            <Link href="/resources#cookies" className="hover:text-copper-300">Cookie Policy</Link>
            <Link href="/resources#terms" className="hover:text-copper-300">Terms</Link>
            <Link href="/resources#delivery" className="hover:text-copper-300">Delivery</Link>
            <Link href="/resources#returns" className="hover:text-copper-300">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
