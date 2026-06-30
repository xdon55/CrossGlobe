import type { MetadataRoute } from "next";
import { db } from "@/db";
import { products, projects, blogPosts } from "@/db/schema";

const BASE = "https://www.houselandgroup.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "products", "industries", "projects", "resources", "blog", "about", "careers", "contact", "quote", "portal",
  ].map((path) => ({
    url: `${BASE}/${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const [prods, prjs, posts] = await Promise.all([
      db.select({ slug: products.slug }).from(products),
      db.select({ slug: projects.slug }).from(projects),
      db.select({ slug: blogPosts.slug }).from(blogPosts),
    ]);

    const dynamic = [
      ...prods.map((p) => ({ url: `${BASE}/products/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
      ...prjs.map((p) => ({ url: `${BASE}/projects/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
      ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ];

    return [...staticRoutes, ...dynamic];
  } catch {
    return staticRoutes;
  }
}
