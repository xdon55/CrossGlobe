import type { Metadata } from "next";
import { Target, Eye, Recycle, Lightbulb, Award, Globe2, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CTABand } from "@/components/CTABand";
import { coreValues, stats } from "@/lib/site";
import { ValueIcon } from "@/components/ui/Icons";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "About CrossGlobe",
  description:
    "Founded in 1997, CrossGlobe is a premium Dutch supplier of aluminium systems and building materials — engineering the building envelope for Europe's most demanding projects.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "1997", title: "Founded in Rotterdam", body: "Established as a family-run aluminium wholesaler serving the Rotterdam construction sector." },
  { year: "2006", title: "Façade systems division", body: "Launched our specification engineering team, partnering with leading European system houses." },
  { year: "2014", title: "Benelux expansion", body: "Opened distribution hubs in Eindhoven and Antwerp, enabling 48-hour regional delivery." },
  { year: "2019", title: "Sustainability commitment", body: "Introduced 80% recycled-content aluminium and Cradle-to-Cradle certified systems across the range." },
  { year: "2024", title: "Digital trade platform", body: "Launched the trade portal with BOQ quoting, approval workflows and live order tracking." },
];

const leaders = [
  { name: "Daan Houseman", role: "Founder & Chief Executive", initials: "DH" },
  { name: "Dr. Sophia Janssen", role: "Director of Engineering", initials: "SJ" },
  { name: "Marco de Wit", role: "Operations & Logistics Director", initials: "MW" },
  { name: "Emma Bakker", role: "Trade & Accounts Director", initials: "EB" },
];

const innovations = [
  { icon: Lightbulb, title: "Specification engineering", body: "A 22-strong team of façade engineers supporting projects from concept to handover." },
  { icon: Globe2, title: "Direct factory partnerships", body: "Direct relationships with 11 leading European manufacturers secure specification-grade stock and pricing." },
  { icon: Award, title: "Digital twin ready", body: "BIM objects, CAD and EPDs published for every system to accelerate coordinated design." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>Engineering the European <span className="text-gradient-copper">building envelope</span></>}
        description="For nearly three decades, CrossGlobe has supplied the aluminium systems, glazing and materials behind some of the Netherlands' most distinctive architecture."
        image={media.officeGlass}
        crumbs={[{ label: "About" }]}
      />

      {/* Intro + stats */}
      <section className="container-lux grid gap-14 py-20 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-copper-600">
            <span className="h-px w-7 bg-copper-500/70" /> Since 1997
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            A Dutch supplier built on engineering rigour and long-term partnerships
          </h2>
          <div className="mt-5 space-y-4 text-pretty text-ink-700">
            <p>
              CrossGlobe began as a single aluminium wholesaler on the Rotterdam harbour. Today we are a multi-discipline supplier of specification-grade building envelopes — but our founding principle has not changed: deliver technically excellent products with absolute reliability.
            </p>
            <p>
              We work hand-in-hand with architects, contractors and developers across the Benelux and beyond, combining premium European systems with our own engineering expertise. Every quotation is reviewed by a specification engineer, and every order is tracked from factory to site.
            </p>
          </div>
        </Reveal>
        <Reveal direction="left" className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-mist-200 bg-mist-50/60 p-6 text-center">
              <div className="font-display text-3xl font-extrabold text-brand-800 sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-mist-500">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Mission / Vision */}
      <section className="bg-mist-50/60 py-20">
        <div className="container-lux grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-9 shadow-lux">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Our Mission</h3>
              <p className="mt-3 text-pretty leading-relaxed text-ink-700">
                To equip Europe&apos;s builders with engineered systems of exceptional quality — supplied reliably, specified intelligently, and supported for the lifetime of every building we touch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-9 text-white shadow-lux">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-copper-300">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">Our Vision</h3>
              <p className="mt-3 text-pretty leading-relaxed text-mist-200">
                To be the Benelux&apos;s most trusted partner for the sustainable building envelope — recognised for engineering depth, circular material thinking and the reliability of our delivery.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="container-lux py-20">
        <SectionHeading
          align="center"
          eyebrow="Core Values"
          title="The principles behind every project"
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {coreValues.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-2xl border border-mist-200 bg-white p-6 shadow-lux transition hover:border-copper-300 hover:shadow-lux-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ValueIcon name={v.icon} className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink-900">{v.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">{v.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-brand-950 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container-lux relative">
          <SectionHeading light align="center" eyebrow="Our Journey" title="Nearly three decades of growth" />
          <div className="mx-auto mt-14 max-w-3xl">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-copper-500 font-display text-sm font-bold text-white">
                      {t.year}
                    </span>
                    {i < timeline.length - 1 && <span className="mt-2 w-px flex-1 bg-white/15" />}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-display text-xl font-bold">{t.title}</h4>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist-300">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership removed per request */}

      {/* Sustainability + Innovation */}
      <section id="sustainability" className="bg-mist-50/60 py-20">
        <div className="container-lux grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-copper-600">
              <span className="h-px w-7 bg-copper-500/70" /> Sustainability
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Building the circular envelope
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-ink-700">
              Aluminium is infinitely recyclable without loss of performance. Our systems use a minimum of 80% recycled content, cutting embodied carbon by more than 70% versus primary metal. With Cradle-to-Cradle certified products, EPDs and end-of-life take-back, we close the material loop.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { v: 80, s: "%", l: "Recycled aluminium" },
                { v: 70, s: "%", l: "Lower embodied carbon" },
                { v: 100, s: "%", l: "EPD coverage" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-mist-200 bg-white p-4 text-center">
                  <div className="font-display text-2xl font-extrabold text-brand-800">
                    <Counter value={x.v} suffix={x.s} />
                  </div>
                  <div className="mt-1 text-xs text-mist-500">{x.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left" className="space-y-4">
            {innovations.map((it) => (
              <div key={it.title} className="flex gap-4 rounded-2xl border border-mist-200 bg-white p-5 shadow-lux">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-500/15 text-copper-600">
                  <it.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-ink-900">{it.title}</h4>
                  <p className="mt-1 text-sm text-mist-500">{it.body}</p>
                </div>
              </div>
            ))}
            <a href="/industries" className="group flex items-center gap-2 px-1 text-sm font-semibold text-copper-600">
              Explore our industries <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
