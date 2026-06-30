import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Building2, Wrench, Calculator, Headset, Warehouse } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contact CrossGlobe",
  description:
    "Contact CrossGlobe in Rotterdam. Reach our sales, technical, accounts, support and warehouse teams, or request a callback.",
  alternates: { canonical: "/contact" },
};

const departments = [
  { icon: Building2, name: "Sales", detail: "Pricing, quotations & trade accounts", email: "sales@houselandgroup.nl" },
  { icon: Wrench, name: "Technical", detail: "Specification & engineering support", email: "technical@houselandgroup.nl" },
  { icon: Calculator, name: "Accounts", detail: "Invoices & credit control", email: "accounts@houselandgroup.nl" },
  { icon: Headset, name: "Support", detail: "After-sales & warranty", email: "support@houselandgroup.nl" },
  { icon: Warehouse, name: "Warehouse", detail: "Stock, collection & delivery", email: "logistics@houselandgroup.nl" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={<>Talk to the <span className="text-gradient-copper">engineering team</span></>}
        description="Whether you are specifying a façade or sourcing fasteners, our specialists are ready to help — typically responding within one working day."
        image={media.officeFacade}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-lux grid gap-12 py-20 lg:grid-cols-2">
        {/* Info */}
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ink-900">Rotterdam head office</h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              Our headquarters and primary distribution hub sit at the heart of the Rotterdam port area, with additional trade counters in Eindhoven and Antwerp.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={MapPin} title="Visit us">
                {site.address.street}<br />
                {site.address.postal} {site.address.city}<br />
                {site.address.country}
              </InfoCard>
              <InfoCard icon={Phone} title="Call us">
                <a href={site.phoneHref} className="hover:text-copper-600">{site.phone}</a><br />
                <span className="text-xs text-mist-400">24/7 emergency: {site.emergencyPhone}</span>
              </InfoCard>
              <InfoCard icon={Mail} title="Email us">
                <a href={`mailto:${site.email}`} className="hover:text-copper-600">{site.email}</a><br />
                <a href={`mailto:${site.quoteEmail}`} className="text-xs hover:text-copper-600">{site.quoteEmail}</a>
              </InfoCard>
              <InfoCard icon={Clock} title="Opening hours">
                Mon–Fri 07:30–17:30<br />
                <span className="text-xs text-mist-400">Sat 09:00–13:00</span>
              </InfoCard>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="mt-6 overflow-hidden rounded-2xl border border-mist-200 shadow-lux">
              <iframe
                title="CrossGlobe location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.45%2C51.90%2C4.55%2C51.95&layer=mapnik&marker=51.9244%2C4.4717"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-mist-200 bg-white p-5 shadow-lux transition hover:border-copper-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="font-semibold text-ink-900">Chat on WhatsApp</p>
                <p className="text-sm text-mist-500">Fast answers from our trade desk · {site.hours}</p>
              </div>
            </a>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal direction="left">
          <ContactForm />
        </Reveal>
      </section>

      {/* Departments */}
      <section className="bg-mist-50/60 py-20">
        <div className="container-lux">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-ink-900">Direct department access</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-mist-500">
              Reach the right specialist first time — every department is staffed by experienced professionals.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-mist-200 bg-white p-6 text-center shadow-lux">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-ink-900">{d.name}</h3>
                  <p className="mt-1 flex-1 text-xs text-mist-500">{d.detail}</p>
                  <a href={`mailto:${d.email}`} className="mt-3 break-all text-xs font-semibold text-copper-600 hover:underline">
                    {d.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-5 shadow-lux">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-mist-500">{children}</div>
    </div>
  );
}
