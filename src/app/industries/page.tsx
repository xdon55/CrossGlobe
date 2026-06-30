import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { getIndustries } from "@/lib/queries";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "From residential villas to billion-euro infrastructure — CrossGlobe supplies aluminium systems and building materials across residential, commercial, industrial, healthcare, education, retail, hospitality, infrastructure and government.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title={<>Built for every sector of the <span className="text-gradient-copper">built environment</span></>}
        description="Our systems are specified across the full spectrum of European construction — each backed by sector-specific expertise, certification and logistics."
        image={media.constructionSky}
        crumbs={[{ label: "Industries" }]}
      />

      <section className="container-lux py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 2) * 0.08}>
              <a
                id={ind.slug}
                href="/contact"
                className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-lux hover:shadow-lux-lg sm:flex-row"
              >
                <div className="img-zoom relative h-56 overflow-hidden sm:h-auto sm:w-2/5">
                  <img src={ind.image} alt={ind.name} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-600">
                    {ind.tagline}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink-900">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-500">{ind.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Discuss your project
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Have a sector-specific project in mind?"
        description="Our specification engineers understand the unique demands of your sector — from hygiene and acoustics to fire performance and heritage sensitivity."
      />
    </>
  );
}
