import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function CTABand({
  title = "Ready to specify with confidence?",
  description = "Our specification engineers will review your drawings and return a consolidated quotation within one working day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-copper-600 via-copper-500 to-copper-700 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" />
      <div className="container-lux relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-pretty text-white/90">{description}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-wrap items-center justify-center gap-3">
          <Link
            href="/quote"
            className="btn-shine flex items-center gap-2 rounded-xl bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-ink-800"
          >
            Request a Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            <Phone className="h-4 w-4" /> Call our team
          </a>
        </Reveal>
      </div>
    </section>
  );
}
