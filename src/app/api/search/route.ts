import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, projects, blogPosts } from "@/db/schema";
import { ilike, or, sql, desc } from "drizzle-orm";

const synonyms: Record<string, string> = {
  glass: "glass",
  glazing: "glass",
  window: "aluminium-windows",
  door: "aluminium-doors",
  facade: "curtain-walls",
  "façade": "curtain-walls",
  wall: "curtain-walls",
  slide: "sliding-systems",
  sliding: "sliding-systems",
  sealant: "sealants",
  silicone: "sealants",
  screw: "fasteners",
  fixing: "fasteners",
  insulation: "insulation",
  roof: "roofing",
  panel: "construction-materials",
  cladding: "construction-materials",
  tool: "tools",
  drill: "tools",
};

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (raw.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const q = `%${raw.toLowerCase()}%`;

  // Expand with synonyms for predictive matching
  const tokens = raw.toLowerCase().split(/\s+/);
  const expanded = tokens
    .map((t) => synonyms[t] ?? t)
    .filter(Boolean);

  try {
    const [pRows, prRows, bRows] = await Promise.all([
      db
        .select({
          title: products.name,
          slug: products.slug,
          meta: products.shortDescription,
        })
        .from(products)
        .where(
          or(
            ilike(products.name, q),
            ilike(products.shortDescription, q),
            ilike(products.sku, q),
            ilike(products.brand, q)
          )
        )
        .limit(6),
      db
        .select({ title: projects.title, slug: projects.slug, meta: projects.location })
        .from(projects)
        .where(or(ilike(projects.title, q), ilike(projects.location, q), ilike(projects.sector, q)))
        .limit(3),
      db
        .select({ title: blogPosts.title, slug: blogPosts.slug, meta: blogPosts.category })
        .from(blogPosts)
        .where(or(ilike(blogPosts.title, q), ilike(blogPosts.excerpt, q)))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(3),
    ]);

    // Append synonym-driven category hint
    const hints = expanded
      .filter((t) => synonyms[raw.toLowerCase().split(/\s+/)[0]] === t)
      .slice(0, 1);

    const results = [
      ...pRows.map((r) => ({ type: "Product" as const, title: r.title, href: `/products/${r.slug}`, meta: r.meta })),
      ...prRows.map((r) => ({ type: "Project" as const, title: r.title, href: `/projects/${r.slug}`, meta: r.meta })),
      ...bRows.map((r) => ({ type: "Article" as const, title: r.title, href: `/blog/${r.slug}`, meta: r.meta })),
      ...(raw && hints.length
        ? [{ type: "Product" as const, title: `Browse ${hints[0]} systems`, href: `/products?category=${hints[0]}`, meta: "Category" }]
        : []),
    ].slice(0, 8);

    return NextResponse.json({ results, query: raw });
  } catch (e) {
    console.error("search error", e);
    return NextResponse.json({ results: [] });
  }
}

// keep sql referenced for future use
void sql;
