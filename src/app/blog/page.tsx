import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/cards";
import { CTABand } from "@/components/CTABand";
import { getAllPosts } from "@/lib/queries";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Blog — Construction Insights & Aluminium Guides",
  description:
    "Specification guidance, construction tips, industry news, aluminium guides, buying guides, architect advice and sustainability thinking from CrossGlobe engineers.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title={<>Insights from our <span className="text-gradient-copper">engineering team</span></>}
        description="Specification guidance, market intelligence and sustainability thinking for architects, contractors and developers."
        image={media.facadeBudapest}
        crumbs={[{ label: "Blog" }]}
      />

      <section className="container-lux py-20">
        {featured && (
          <Reveal>
            <a href={`/blog/${featured.slug}`} className="card-lift group mb-12 grid overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-lux-lg lg:grid-cols-2">
              <div className="img-zoom relative h-64 overflow-hidden lg:h-auto">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-copper-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Featured</span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-copper-600">{featured.category}</span>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-900 transition group-hover:text-copper-700 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-pretty leading-relaxed text-mist-500">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-mist-500">
                  <span>{new Date(featured.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  <span>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
              </div>
            </a>
          </Reveal>
        )}

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {rest.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand />
    </>
  );
}
