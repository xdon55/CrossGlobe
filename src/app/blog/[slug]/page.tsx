import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { getPostBySlug, getAllPosts } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== slug).slice(0, 2);

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      {/* Article hero */}
      <header className="relative overflow-hidden bg-brand-950 pt-32 pb-16 text-white sm:pt-40">
        <div className="absolute inset-0">
          <img src={post.image} alt="" className="h-full w-full object-cover opacity-25" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/85 to-brand-950/55" />
        </div>
        <div className="container-lux relative mx-auto max-w-3xl">
          <nav className="flex items-center gap-2 text-xs text-mist-300">
            <Link href="/blog" className="hover:text-white">Journal</Link>
            <span>/</span>
            <span className="text-copper-300">{post.category}</span>
          </nav>
          <span className="mt-5 inline-block rounded-full bg-copper-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {post.category}
          </span>
          <h1 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-mist-300">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold text-white">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </span>
              {post.author}
            </span>
            <span className="hidden sm:flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} min</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="container-lux py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-pretty text-xl font-medium leading-relaxed text-ink-800">
            {post.excerpt}
          </p>
          <div className="mt-8 space-y-6">
            {paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <p className="text-pretty leading-relaxed text-ink-700">{para}</p>
              </Reveal>
            ))}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-mist-200 pt-8">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-mist-100 px-3 py-1 text-xs font-medium text-mist-500">#{t}</span>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-mist-200 pt-8">
            <Link href="/blog" className="group flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-copper-600">
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> All articles
            </Link>
            <Link href="/quote" className="group flex items-center gap-2 text-sm font-semibold text-copper-600">
              Request a quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {others.length > 0 && (
        <section className="bg-mist-50/60 py-16">
          <div className="container-lux">
            <h2 className="mb-8 font-display text-2xl font-bold text-ink-900">Keep reading</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card-lift group flex overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux hover:shadow-lux-lg">
                  <div className="img-zoom h-full w-28 overflow-hidden sm:w-40">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-copper-600">{p.category}</span>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink-900 transition group-hover:text-copper-700">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
