import type { Metadata } from "next";
import { FileText, Download, Boxes, Award, BookOpen, FileCheck2, PenTool, Cpu } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Resources — Downloads, CAD, BIM & Technical Data",
  description:
    "Download brochures, catalogues, certificates, technical drawings, installation manuals, BIM and CAD files. Read case studies and white papers from CrossGlobe.",
  alternates: { canonical: "/resources" },
};

const downloadGroups = [
  { id: "brochures", icon: BookOpen, title: "Brochures & Catalogues", count: "24 files", desc: "Full system brochures and our annual product catalogue." },
  { id: "bim", icon: Cpu, title: "BIM Files", count: "180+ objects", desc: "Parametric Revit and IFC objects for every major system." },
  { id: "technical", icon: FileText, title: "Technical Data Sheets", count: "210+ files", desc: "Performance data, test reports and declarations of performance." },
  { id: "cad", icon: PenTool, title: "CAD Drawings", count: "320+ files", desc: "DWG and DXF profiles for detailing and fabrication." },
  { id: "certificates", icon: Award, title: "Certificates", count: "60+ docs", desc: "ISO, CE, Cradle-to-Cradle, EPDs and accreditations." },
  { id: "manuals", icon: FileCheck2, title: "Installation Manuals", count: "45+ guides", desc: "Step-by-step installation and maintenance guides." },
];

const caseStudies = [
  { title: "Meridian Tower: Unitised Façade at Scale", sector: "Commercial", img: media.cloudReflection },
  { title: "Harbourlight: Passive-House Residential", sector: "Residential", img: media.towerApartments },
  { title: "Delft Innovation Hub: Living Lab", sector: "Education", img: media.facadeDowntown },
];

const policies = [
  { id: "privacy", title: "Privacy Policy", body: "How we collect, use and protect your personal data in full compliance with the GDPR and Dutch privacy regulations (UAVG)." },
  { id: "cookies", title: "Cookie Policy", body: "The cookies we use, their purpose, retention and how to manage or withdraw your consent at any time." },
  { id: "terms", title: "Terms & Conditions", body: "The terms governing use of our website, quotations and the supply of goods and services." },
  { id: "delivery", title: "Delivery Information", body: "Benelux-wide delivery, lead times, collection options and our 48-hour regional promise." },
  { id: "returns", title: "Returns & Refunds", body: "Our returns process for standard and special-order items, including conditions and timeframes." },
  { id: "warranty", title: "Warranty", body: "System warranties, hardware guarantees and how to make a warranty claim." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources & Documentation"
        title={<>Everything you need to <span className="text-gradient-copper">specify with confidence</span></>}
        description="Technical data, BIM and CAD objects, certificates, installation guides, case studies and white papers — all in one place."
        image={media.architectsDocs}
        crumbs={[{ label: "Resources" }]}
      />

      {/* Downloads */}
      <section className="container-lux py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-ink-900">Downloads library</h2>
          <p className="mt-2 max-w-2xl text-mist-500">Browse and download specification, certification and installation documentation for every system.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {downloadGroups.map((g) => (
            <StaggerItem key={g.id}>
              <a
                id={g.id}
                href="#"
                className="card-lift group flex h-full items-start gap-4 rounded-2xl border border-mist-200 bg-white p-6 shadow-lux hover:border-copper-300 hover:shadow-lux-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <g.icon className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-ink-900">{g.title}</h3>
                    <Download className="h-4 w-4 text-copper-500 transition group-hover:translate-y-0.5" />
                  </div>
                  <p className="mt-1 text-sm text-mist-500">{g.desc}</p>
                  <span className="mt-2 inline-block rounded-full bg-mist-100 px-2.5 py-0.5 text-xs font-medium text-mist-500">{g.count}</span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Case studies */}
      <section className="bg-mist-50/60 py-20">
        <div className="container-lux">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ink-900">Case studies</h2>
            <p className="mt-2 max-w-2xl text-mist-500">In-depth analyses of how our systems performed on real landmark projects.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <a href="/projects" className="card-lift group block overflow-hidden rounded-2xl bg-white shadow-lux hover:shadow-lux-lg">
                  <div className="img-zoom relative h-48 overflow-hidden">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-800">{c.sector}</span>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <h3 className="font-display text-base font-bold leading-snug text-ink-900">{c.title}</h3>
                    <BookOpen className="h-5 w-5 text-copper-500" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* White papers */}
      <section className="container-lux py-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-9 text-white shadow-lux-lg sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-copper-300">
                  <Boxes className="h-4 w-4" /> White paper series
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight">Engineering the low-carbon envelope</h2>
                <p className="mt-3 text-mist-200">
                  Our research on achieving passive-house performance with recycled-content aluminium — covering thermal breaks, glazing and embodied carbon strategy.
                </p>
              </div>
              <a href="#" className="btn-shine flex shrink-0 items-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600">
                Download white paper <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Policies */}
      <section id="faq" className="bg-mist-50/60 py-20">
        <div className="container-lux">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink-900">Policies &amp; legal</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-mist-500">
              Transparent documentation of our obligations and your rights under GDPR and Dutch law.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <a
                  id={p.id}
                  href="#"
                  className="block h-full rounded-2xl border border-mist-200 bg-white p-6 shadow-lux transition hover:border-copper-300"
                >
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-copper-500" />
                    <h3 className="font-display text-base font-bold text-ink-900">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist-500">{p.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Read more →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
