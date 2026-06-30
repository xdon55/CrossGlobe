import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  PackageCheck,
  ShieldCheck,
  FileText,
  Download,
  Boxes,
  Layers,
  Flame,
  Thermometer,
  ChevronRight,
  Award,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards";
import { ProductGallery, ShareButton, RequestQuoteBar } from "@/components/product/Interactive";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { media } from "@/lib/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} — ${p.brand}`,
    description: p.shortDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: p.shortDescription, images: [{ url: p.image }] },
  };
}

const faqs = [
  {
    q: "Do you provide technical support during specification?",
    a: "Yes. Our specification engineers review your drawings and performance requirements, recommending the optimal system and configuration before you commit. Support continues through installation.",
  },
  {
    q: "Are CAD and BIM files available?",
    a: "Every system ships with downloadable CAD profiles, BIM objects and a full technical data sheet. These are available instantly from this page and within the trade portal.",
  },
  {
    q: "What warranty is included?",
    a: "All aluminium systems carry a 10-year profile warranty and hardware guarantees of 5 years, subject to correct installation and maintenance in line with our guidelines.",
  },
  {
    q: "Can finishes be customised?",
    a: "We offer the full RAL range, anodised finishes, sublimated wood effects and bespoke dual-colour options. Lead times for special colours are typically 3–5 weeks.",
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.slug, 4);
  const gallery = [product.image, ...(product.gallery ?? [])];

  const downloads = [
    { icon: FileText, label: "Technical Data Sheet", url: product.datasheetUrl ?? "#" },
    { icon: Download, label: "CAD / BIM Files", url: product.cadUrl ?? "#" },
    { icon: FileText, label: "Brochure", url: product.brochureUrl ?? "#" },
    { icon: Download, label: "Installation Guide", url: product.brochureUrl ?? "#" },
  ];

  const specIcons: Record<string, React.ElementType> = {
    fireRating: Flame,
    thermalRating: Thermometer,
    material: Layers,
  };

  return (
    <>
      <PageHero
        eyebrow={product.brand ?? undefined}
        title={product.name}
        description={product.shortDescription}
        image={product.image}
        crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]}
      />

      <section className="container-lux grid gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <ProductGallery images={gallery} name={product.name} />
        </Reveal>

        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                {product.sku}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-mist-500">
                <Clock className="h-4 w-4 text-copper-500" /> Lead time: {product.leadTime}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-green-600">
                <PackageCheck className="h-4 w-4" /> {product.availability}
              </span>
            </div>

            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-700">
              {product.description}
            </p>

            {/* key facts */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {(["material", "fireRating", "thermalRating"] as const).map((k) =>
                product[k] ? (
                  <div key={k} className="rounded-xl border border-mist-200 bg-mist-50/60 p-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mist-500">
                      {(() => {
                        const Ic = specIcons[k] ?? Layers;
                        return <Ic className="h-3.5 w-3.5 text-copper-500" />;
                      })()}
                      {k.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-ink-900">{product[k]}</p>
                  </div>
                ) : null
              )}
              <div className="rounded-xl border border-mist-200 bg-mist-50/60 p-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mist-500">
                  <Layers className="h-3.5 w-3.5 text-copper-500" /> Finish
                </span>
                <p className="mt-1 text-sm font-semibold text-ink-900">{product.finish}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex-1">
                <RequestQuoteBar sku={product.sku} name={product.name} />
              </div>
              <ShareButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features + Applications */}
      <section className="bg-mist-50/60 py-16">
        <div className="container-lux grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-ink-900">Key features</h3>
            <ul className="mt-5 space-y-3">
              {(product.features ?? []).map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper-500/15 text-copper-600">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                  <span className="text-ink-700">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-2xl font-bold text-ink-900">Typical applications</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {(product.applications ?? []).map((a) => (
                <span key={a} className="rounded-full border border-mist-200 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specifications + Downloads */}
      <section className="container-lux grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink-900">
            <Boxes className="h-6 w-6 text-copper-500" /> Technical specifications
          </h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-mist-200">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs ?? {}).map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? "bg-mist-50/60" : "bg-white"}>
                    <td className="w-1/2 px-5 py-3.5 font-medium text-ink-700">{k}</td>
                    <td className="px-5 py-3.5 font-semibold text-ink-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink-900">
            <Download className="h-6 w-6 text-copper-500" /> Downloads &amp; resources
          </h3>
          <div className="mt-5 space-y-3">
            {downloads.map((d) => (
              <a
                key={d.label}
                href={d.url}
                className="group flex items-center justify-between rounded-xl border border-mist-200 bg-white p-4 transition hover:border-copper-300 hover:shadow-lux"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink-900">{d.label}</span>
                </span>
                <Download className="h-4 w-4 text-copper-500 transition group-hover:translate-y-0.5" />
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50/60 p-4 text-sm text-brand-800">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            Certified to European standards · CE marked · 10-year warranty
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-mist-50/60 py-16">
        <div className="container-lux mx-auto max-w-3xl">
          <h3 className="text-center font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Frequently asked questions
          </h3>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-mist-200 bg-white p-5 [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="font-semibold text-ink-900">{f.q}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-copper-500 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-mist-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-lux py-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink-900">
              <Award className="h-6 w-6 text-copper-500" /> Related systems
            </h3>
            <Link href="/products" className="text-sm font-semibold text-copper-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.filter((r) => r.slug !== product.slug).slice(0, 4).map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}

      <CTABand
        title={`Specify ${product.name.split(" ").slice(0, 3).join(" ")} with confidence`}
        description="Upload your drawings or BOQ and receive a consolidated quotation with technical support within one working day."
      />
    </>
  );
}
