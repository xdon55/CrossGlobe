import Link from "next/link";
import { ArrowUpRight, ArrowRight, Clock, MapPin, Calendar } from "lucide-react";
import type { ProductRow, ProjectRow, BlogRow, CategoryRow, IndustryRow } from "@/lib/queries";

const iconMap: Record<string, string> = {
  DoorOpen: "🚪", AppWindow: "🪟", Building2: "🏛️", MoveHorizontal: "↔️",
  Square: "🔲", Settings2: "⚙️", Droplets: "💧", Link2: "🔗", Home: "🏠",
  Layers: "🧱", Grid3x3: "▦", Wrench: "🔧",
};

export function CategoryCard({ cat }: { cat: CategoryRow }) {
  return (
    <Link
      href={`/products?category=${cat.slug}`}
      className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux"
    >
      <div className="img-zoom relative h-44 overflow-hidden">
        <img
          src={cat.image ?? ""}
          alt={cat.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-900/15 to-transparent" />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-xl backdrop-blur">
          {iconMap[cat.icon] ?? "▣"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink-900">{cat.name}</h3>
        <p className="mt-1 text-sm text-mist-500">{cat.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({ p }: { p: ProductRow }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux hover:shadow-lux-lg"
    >
      <div className="img-zoom relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent opacity-0 transition group-hover:opacity-100" />
        {p.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-copper-500 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
            Bestseller
          </span>
        )}
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-800 opacity-0 shadow transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-copper-600">
          {p.brand}
        </span>
        <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink-900">
          {p.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-mist-500">{p.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between border-t border-mist-100 pt-3 text-xs text-mist-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {p.leadTime}
          </span>
          <span className="font-semibold text-brand-700">{p.sku}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ p }: { p: ProjectRow }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="card-lift group relative block overflow-hidden rounded-2xl shadow-lux"
    >
      <div className="img-zoom relative h-72 overflow-hidden sm:h-80">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-block rounded-full bg-copper-500/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur">
          {p.sector}
        </span>
        <h3 className="mt-3 font-display text-xl font-bold text-white">{p.title}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mist-300">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-copper-400" /> {p.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-copper-400" /> {p.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ post, compact = false }: { post: BlogRow; compact?: boolean }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux hover:shadow-lux-lg"
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden">
        <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-800 backdrop-blur">
          {post.category}
        </span>
      </div>
      {!compact && (
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3 text-xs text-mist-500">
            <span>{date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime} min
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-ink-900 transition group-hover:text-copper-700">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-mist-500">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 border-t border-mist-100 pt-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-800 text-[0.6rem] font-bold text-white">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </span>
            <span className="text-xs font-medium text-ink-700">{post.author}</span>
          </div>
        </div>
      )}
    </Link>
  );
}

export function IndustryCard({ ind }: { ind: IndustryRow }) {
  const emoji: Record<string, string> = {
    Home: "🏡", Building2: "🏢", Factory: "🏭", HeartPulse: "🏥",
    GraduationCap: "🎓", ShoppingBag: "🛍️", UtensilsCrossed: "🍽️",
    TrainFront: "🚆", Landmark: "🏛️",
  };
  return (
    <Link
      href={`/industries#${ind.slug}`}
      className="card-lift group relative flex items-center gap-4 overflow-hidden rounded-xl border border-mist-200 bg-white p-5 shadow-lux hover:border-copper-300"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl transition group-hover:scale-110">
        {emoji[ind.icon] ?? "🔹"}
      </span>
      <span>
        <span className="block font-display font-bold text-ink-900">{ind.name}</span>
        <span className="block text-xs text-mist-500">{ind.tagline}</span>
      </span>
      <ArrowRight className="ml-auto h-4 w-4 text-copper-500 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
    </Link>
  );
}
