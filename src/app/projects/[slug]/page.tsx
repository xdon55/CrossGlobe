import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Calendar, User, HardHat, Building2, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { getProjectBySlug } from "@/lib/queries";
import { media } from "@/lib/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — ${p.sector} Project`,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.description.slice(0, 160), images: [{ url: p.image }] },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = [project.image, ...(project.gallery ?? [])];
  const facts = [
    { icon: Building2, label: "Sector", value: project.sector },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year", value: String(project.year) },
    { icon: User, label: "Architect", value: project.architect },
    { icon: HardHat, label: "Builder", value: project.builder },
  ].filter((f) => f.value && f.value !== "null");

  return (
    <>
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        description={project.location}
        image={project.image}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
      />

      {/* Overview */}
      <section className="container-lux grid gap-10 py-16 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-600">
            Project Overview
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-ink-900">
            Engineering the envelope
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-700">{project.description}</p>

          {project.productsUsed && project.productsUsed.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-ink-900">Products used</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.productsUsed.map((prod) => (
                  <span key={prod} className="flex items-center gap-1.5 rounded-full border border-mist-200 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                    <CheckCircle2 className="h-4 w-4 text-copper-500" /> {prod}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-mist-200 bg-mist-50/60 p-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900">
              Project details
            </h3>
            <dl className="mt-4 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-mist-500">{f.label}</dt>
                    <dd className="text-sm font-semibold text-ink-900">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-xl bg-brand-900 p-4 text-center text-sm text-mist-200">
              <p className="font-semibold text-white">Client</p>
              <p className="mt-1">{project.client}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      {gallery.length > 1 && (
        <section className="bg-mist-50/60 py-16">
          <div className="container-lux">
            <h2 className="mb-8 font-display text-2xl font-bold text-ink-900">Gallery</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {gallery.map((img, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="img-zoom overflow-hidden rounded-2xl shadow-lux">
                    <img src={img} alt={`${project.title} ${i + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        title={`Inspired by ${project.title}?`}
        description="Specify the same engineering quality for your next landmark. Our team will guide you from concept to completion."
      />
    </>
  );
}
