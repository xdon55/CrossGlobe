import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote, Star, Sparkles } from "lucide-react";
import Hero from "@/components/home/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CategoryCard, ProductCard, ProjectCard, BlogCard, IndustryCard } from "@/components/cards";
import {
  getCategories,
  getFeaturedProducts,
  getBrands,
  getFeaturedProjects,
  getIndustries,
  getFeaturedPosts,
  getTestimonials,
} from "@/lib/queries";
import { coreValues } from "@/lib/site";
import { media } from "@/lib/media";
import { ValueIcon } from "@/components/ui/Icons";

export const revalidate = 3600;

export default async function HomePage() {
  const [categories, products, brands, projects, industries, posts, testimonials] =
    await Promise.all([
      getCategories(),
      getFeaturedProducts(8),
      getBrands(),
      getFeaturedProjects(4),
      getIndustries(),
      getFeaturedPosts(3),
      getTestimonials(),
    ]);

  const topCategories = categories.slice(0, 8);
  const featuredTestimonial = testimonials[0];
  const restTestimonials = testimonials.slice(1, 4);

  return (
    <>
      <Hero />

      {/* Brand marquee */}
      <section className="border-y border-mist-200 bg-white py-7">
        <div className="container-lux">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-mist-400">
            Distributing &amp; specifying with Europe&apos;s leading system houses
          </p>
          <div className="relative overflow-hidden mask-fade-r">
            <div className="flex w-max animate-marquee gap-4">
              {[...brands, ...brands].map((b, i) => (
                <div
                  key={i}
                  className="flex h-16 w-52 shrink-0 items-center justify-center gap-3 rounded-xl border border-mist-200 bg-mist-50/60 px-6"
                >
                  <span className="font-display text-lg font-extrabold text-brand-800">
                    {b.initials}
                  </span>
                  <span className="text-sm font-semibold text-ink-700">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-mist-50/60 py-20 sm:py-28">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Product Range"
              title={<>Engineered systems for the <span className="text-gradient-copper">entire envelope</span></>}
              description="Twelve specialist categories spanning aluminium fenestration, structural glazing, weatherproofing and trade tooling — each backed by technical data, BIM and certification."
            />
            <Reveal delay={0.15}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-xl border border-ink-700 px-5 py-3 text-sm font-semibold text-ink-800 transition hover:bg-ink-900 hover:text-white"
              >
                View all products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
            {topCategories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <CategoryCard cat={cat} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why House Land — dark feature */}
      <section className="relative overflow-hidden bg-brand-950 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-copper-500/20 blur-3xl" />
        <div className="container-lux relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Why CrossGlobe"
              title="Engineering excellence, delivered with Dutch reliability"
              description="We are more than a distributor. Our specification engineers partner with you from concept to completion — de-risking procurement, accelerating programmes and protecting performance for the lifetime of the building."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {coreValues.map((v) => (
                <Reveal key={v.title}>
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-copper-400/50 hover:bg-white/[0.07]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-500/15 text-copper-300">
                      <ValueIcon name={v.icon} />
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold text-white">{v.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-300">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left" className="relative">
            <div className="img-zoom relative overflow-hidden rounded-3xl shadow-lux-lg">
              <img src={media.engineersBlueprint} alt="Engineers reviewing façade blueprints on site" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
            </div>
            <div className="glass-dark absolute -bottom-6 -left-6 w-60 rounded-2xl p-5 shadow-lux-lg">
              <div className="flex items-center gap-1 text-copper-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white">
                &ldquo;Specification-led, reliable and genuinely technical.&rdquo;
              </p>
              <p className="mt-2 text-xs text-mist-300">Verified client · Rotterdam</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Systems"
              title={<>Specification-grade products, <span className="text-gradient-copper">ready to quote</span></>}
              description="A selection of our most-specified systems — each with full technical data sheets, CAD downloads and warranty documentation."
            />
            <Reveal delay={0.15}>
              <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-copper-600">
                Browse the catalogue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {products.slice(0, 4).map((p) => (
              <StaggerItem key={p.slug}>
                <ProductCard p={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-mist-50/60 py-20 sm:py-28">
        <div className="container-lux">
          <SectionHeading
            align="center"
            eyebrow="Industries Served"
            title="Solutions for every sector of the built environment"
            description="From bespoke residential villas to billion-euro infrastructure — our systems are specified across the full spectrum of European construction."
          />
          <Stagger className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {industries.slice(0, 6).map((ind) => (
              <StaggerItem key={ind.slug}>
                <IndustryCard ind={ind} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 text-center">
            <Link href="/industries" className="group inline-flex items-center gap-2 text-sm font-semibold text-copper-600">
              See all industries
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects — dark */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container-lux relative">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              light
              eyebrow="Featured Projects"
              title={<>Delivering landmarks across <span className="text-gradient-copper">the Benelux</span></>}
              description="A selection of landmark projects where CrossGlobe systems define the envelope."
            />
            <Reveal delay={0.15}>
              <Link href="/projects" className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-1" : ""}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {featuredTestimonial && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-lux">
            <SectionHeading
              align="center"
              eyebrow="Client Trust"
              title="Trusted by architects, contractors & developers"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 p-9 text-white shadow-lux-lg">
                  <Quote className="h-12 w-12 text-copper-400/40" />
                  <blockquote className="mt-4 text-pretty font-display text-2xl font-medium leading-snug sm:text-[1.7rem]">
                    &ldquo;{featuredTestimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-copper-500 font-display font-bold text-white">
                      {featuredTestimonial.initials}
                    </span>
                    <span>
                      <span className="block font-semibold">{featuredTestimonial.name}</span>
                      <span className="block text-sm text-mist-300">
                        {featuredTestimonial.role}, {featuredTestimonial.company}
                      </span>
                    </span>
                  </figcaption>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-copper-500/20 blur-3xl" />
                </figure>
              </Reveal>

              <div className="grid gap-5">
                {restTestimonials.map((t, i) => (
                  <Reveal key={t.name} delay={0.1 + i * 0.08}>
                    <figure className="rounded-2xl border border-mist-200 bg-mist-50/60 p-6">
                      <div className="flex items-center gap-1 text-copper-500">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <blockquote className="mt-3 text-sm leading-relaxed text-ink-700 line-clamp-3">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-white">
                          {t.initials}
                        </span>
                        <span className="text-xs">
                          <span className="block font-semibold text-ink-900">{t.name}</span>
                          <span className="block text-mist-500">{t.role}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {posts.length > 0 && (
        <section className="bg-mist-50/60 py-20 sm:py-28">
          <div className="container-lux">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Insights & News"
                title="The House Land journal"
                description="Specification guidance, market intelligence and sustainability thinking from our engineering team."
              />
              <Reveal delay={0.15}>
                <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-copper-600">
                  Read the blog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.08}>
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-copper-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="container-lux relative flex flex-col items-center gap-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-copper-300">
              <Sparkles className="h-3.5 w-3.5" /> Let&apos;s build something exceptional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              Partner with a team that engineers for the long term
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-pretty text-mist-200">
              Tell us about your project. Receive a consolidated quotation with technical support within one working day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/quote"
                className="btn-shine flex items-center gap-2 rounded-xl bg-copper-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600"
              >
                Request a Quote <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Talk to an engineer
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
