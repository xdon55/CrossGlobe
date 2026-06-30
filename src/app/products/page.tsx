import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductBrowser } from "@/components/ProductBrowser";
import { getProducts, getCategories } from "@/lib/queries";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Products — Aluminium Systems & Building Materials",
  description:
    "Browse the full CrossGlobe catalogue: aluminium doors, windows, curtain walls, sliding systems, architectural glass, hardware, sealants, fasteners, roofing, insulation and professional tools.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title={<>Everything for the <span className="text-gradient-copper">building envelope</span></>}
        description="Specification-grade aluminium systems, glazing, hardware and construction materials — each backed by full technical documentation, BIM objects and certification."
        image={media.facadeCurved}
        crumbs={[{ label: "Products" }]}
      />
      <ProductBrowser
        products={products}
        categories={categories}
        initialCategory={sp.category}
      />
    </>
  );
}
