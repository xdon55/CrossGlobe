import { db } from "@/db";
import {
  categories,
  products,
  brands,
  projects,
  blogPosts,
  testimonials,
  industries,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type ProductRow = typeof products.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type BlogRow = typeof blogPosts.$inferSelect;
export type TestimonialRow = typeof testimonials.$inferSelect;
export type BrandRow = typeof brands.$inferSelect;
export type IndustryRow = typeof industries.$inferSelect;

export async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.sortOrder);
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 8) {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.featured, true))
      .limit(limit);
  } catch {
    return [];
  }
}

export async function getProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.id));
  } catch {
    return [];
  }
}

export async function getProductsByCategory(slug: string) {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.categorySlug, slug))
      .orderBy(desc(products.id));
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string, limit = 4) {
  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.categorySlug, categorySlug))
      .limit(limit);
  } catch {
    return [];
  }
}

export async function getBrands() {
  try {
    return await db.select().from(brands).orderBy(brands.name);
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(limit = 6) {
  try {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .limit(limit);
  } catch {
    return [];
  }
}

export async function getAllProjects() {
  try {
    return await db.select().from(projects).orderBy(desc(projects.year));
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(limit = 3) {
  try {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt)).limit(limit);
  } catch {
    return [];
  }
}

export async function getAllPosts() {
  try {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getTestimonials() {
  try {
    return await db.select().from(testimonials);
  } catch {
    return [];
  }
}

export async function getIndustries() {
  try {
    return await db.select().from(industries).orderBy(industries.id);
  } catch {
    return [];
  }
}
