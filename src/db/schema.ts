import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  boolean,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  icon: text("icon").notNull(),
  image: text("image"),
  parentId: integer("parentId"),
  sortOrder: integer("sort_order").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sku: text("sku").notNull(),
  categorySlug: text("category_slug").notNull(),
  brand: text("brand"),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  specs: jsonb("specs").$type<Record<string, string>>(),
  features: jsonb("features").$type<string[]>(),
  finish: text("finish"),
  material: text("material"),
  fireRating: text("fire_rating"),
  thermalRating: text("thermal_rating"),
  applications: jsonb("applications").$type<string[]>(),
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>(),
  price: integer("price"),
  currency: text("currency").default("EUR"),
  leadTime: text("lead_time"),
  availability: text("availability").default("In stock"),
  brochureUrl: text("brochure_url"),
  datasheetUrl: text("datasheet_url"),
  cadUrl: text("cad_url"),
  featured: boolean("featured").default(false),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  country: text("country"),
  description: text("description"),
  initials: text("initials").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sector: text("sector").notNull(),
  location: text("location").notNull(),
  year: integer("year"),
  client: text("client"),
  architect: text("architect"),
  builder: text("builder"),
  description: text("description").notNull(),
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>(),
  productsUsed: jsonb("products_used").$type<string[]>(),
  featured: boolean("featured").default(false),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  authorRole: text("author_role"),
  image: text("image").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  readTime: integer("read_time").default(6),
  tags: jsonb("tags").$type<string[]>(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5),
  initials: text("initials").notNull(),
});

export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  image: text("image").notNull(),
  icon: text("icon").notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  vatNumber: text("vat_number"),
  phone: text("phone"),
  projectName: text("project_name"),
  expectedDelivery: text("expected_delivery"),
  message: text("message"),
  items: jsonb("items").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("received"),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  consent: boolean("consent").default(true),
  source: text("source").default("footer"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("pending_opt_in"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  department: text("department"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
