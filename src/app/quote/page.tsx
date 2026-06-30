import type { Metadata } from "next";
import { FileText, Clock, ShieldCheck, Users, BarChart3, Wallet } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description:
    "Request a consolidated quotation for aluminium systems and building materials. Upload drawings or BOQ, assign a project, and receive a response within one working day.",
  alternates: { canonical: "/quote" },
};

const benefits = [
  { icon: Clock, title: "One working day", body: "Consolidated quotations returned within one business day." },
  { icon: Users, title: "Engineering review", body: "Every request is reviewed by a specification engineer." },
  { icon: FileText, title: "BOQ & drawings", body: "Upload bills of quantities, drawings and PDFs." },
  { icon: Wallet, title: "Project pricing", body: "Dedicated trade and project pricing for volume." },
  { icon: ShieldCheck, title: "Secure & compliant", body: "GDPR-compliant handling of your project data." },
  { icon: BarChart3, title: "Full traceability", body: "A reference number for every quotation." },
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Quotation System"
        title={<>Request a <span className="text-gradient-copper">consolidated quotation</span></>}
        description="Tell us about your project, add the systems you need and upload drawings or a BOQ. Our engineers will respond within one working day."
        image={media.architectsDocs}
        crumbs={[{ label: "Request Quote" }]}
      />

      <section className="container-lux grid gap-10 py-16 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <QuoteForm initialSku={sp.sku} />
        </Reveal>

        <div className="lg:order-first">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ink-900">Why request with us</h2>
            <p className="mt-2 text-sm text-mist-500">
              We turn specifications into reliable, well-priced supply — fast.
            </p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="flex gap-3 rounded-2xl border border-mist-200 bg-white p-4 shadow-lux">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-ink-900">{b.title}</h4>
                    <p className="mt-0.5 text-xs text-mist-500">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
