import type { Metadata } from "next";
import { MapPin, Briefcase, Clock, ArrowUpRight, Heart, Zap, Users } from "lucide-react";

const LinkedInGlyph = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z" />
  </svg>
);
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Careers at CrossGlobe",
  description:
    "Build your career with CrossGlobe. We are hiring specification engineers, account managers, warehouse and logistics professionals across the Netherlands.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: Heart, title: "Health & wellbeing", body: "Premium health insurance, mental health support and a wellness budget." },
  { icon: Zap, title: "Learning & growth", body: "Sponsored certifications, technical masterclasses and clear progression paths." },
  { icon: Users, title: "Inclusive culture", body: "A collaborative, international team that values every perspective." },
  { icon: Briefcase, title: "Meaningful work", body: "Projects that shape the Dutch skyline and the future of sustainable building." },
];

const vacancies = [
  { title: "Façade Specification Engineer", dept: "Engineering", location: "Rotterdam", type: "Full-time", level: "Senior" },
  { title: "Trade Account Manager", dept: "Sales", location: "Amsterdam / Hybrid", type: "Full-time", level: "Mid-Senior" },
  { title: "Digital Product Manager — Trade Portal", dept: "Product", location: "Eindhoven / Remote", type: "Full-time", level: "Senior" },
  { title: "Warehouse & Logistics Lead", dept: "Operations", location: "Rotterdam", type: "Full-time", level: "Mid" },
  { title: "Sustainability & EPD Specialist", dept: "Engineering", location: "Rotterdam / Hybrid", type: "Full-time", level: "Mid-Senior" },
  { title: "Marketing Content Lead", dept: "Marketing", location: "Amsterdam / Hybrid", type: "Full-time", level: "Mid" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build a career that <span className="text-gradient-copper">shapes the skyline</span></>}
        description="Join a team of engineers, logisticians and builders shaping the future of the sustainable European building envelope."
        image={media.engineersHelmets}
        crumbs={[{ label: "Careers" }]}
      />

      {/* Perks */}
      <section className="container-lux py-20">
        <SectionHeading
          align="center"
          eyebrow="Why join us"
          title="A workplace engineered for people"
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {perks.map((p) => (
            <StaggerItem key={p.title}>
              <div className="h-full rounded-2xl border border-mist-200 bg-white p-6 shadow-lux">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper-500/15 text-copper-600">
                  <p.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink-900">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Vacancies */}
      <section className="bg-mist-50/60 py-20">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Open positions"
            title="Current vacancies"
            description="Don't see your role? We are always keen to meet talented people. Send us your resume and a note."
          />
          <div className="mt-10 space-y-3">
            {vacancies.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <a
                  href="/contact"
                  className="group flex flex-col gap-3 rounded-2xl border border-mist-200 bg-white p-5 shadow-lux transition hover:border-copper-300 hover:shadow-lux-lg sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Briefcase className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink-900">{v.title}</h4>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mist-500">
                        <span>{v.dept}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {v.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {v.type}</span>
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-800">{v.level}</span>
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 self-start rounded-lg bg-copper-500 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-copper-600 sm:self-auto">
                    Apply <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-mist-300 bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A66C2] text-white">
              <LinkedInGlyph className="h-5 w-5" />
            </span>
            <p className="text-sm text-ink-700">
              Prefer to apply with your LinkedIn profile? <span className="font-semibold text-copper-600">One-click apply available</span> on every listing.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ready to build with us?"
        description="Send your resume and a short note about what you would bring to CrossGlobe."
      />
    </>
  );
}
