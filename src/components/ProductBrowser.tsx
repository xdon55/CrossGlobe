"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { ProductCard } from "@/components/cards";
import type { ProductRow, CategoryRow } from "@/lib/queries";

export function ProductBrowser({
  products,
  categories,
  initialCategory,
}: {
  products: ProductRow[];
  categories: CategoryRow[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState<string>(initialCategory ?? "all");
  const [brand, setBrand] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<string>("featured");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = active === "all" || p.categorySlug === active;
      const brandOk = brand === "all" || p.brand === brand;
      const qOk =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      return catOk && brandOk && qOk;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, active, brand, query, sort]);

  const activeCat = categories.find((c) => c.slug === active);

  return (
    <div className="container-lux grid gap-10 py-16 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-lux">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-900">
            <SlidersHorizontal className="h-4 w-4 text-copper-500" /> Filters
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-mist-500">Category</label>
            <div className="mt-2 space-y-1">
              <button
                onClick={() => setActive("all")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                  active === "all" ? "bg-brand-800 text-white" : "text-ink-700 hover:bg-mist-50"
                }`}
              >
                All products
                <span className="text-xs opacity-70">{products.length}</span>
              </button>
              {categories.map((c) => {
                const count = products.filter((p) => p.categorySlug === c.slug).length;
                return (
                  <button
                    key={c.slug}
                    onClick={() => setActive(c.slug)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      active === c.slug ? "bg-brand-800 text-white" : "text-ink-700 hover:bg-mist-50"
                    }`}
                  >
                    {c.name}
                    <span className="text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-mist-100 pt-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-mist-500">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-2 w-full rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm text-ink-800 outline-none focus:border-copper-400"
            >
              <option value="all">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">
              {activeCat ? activeCat.name : "All Products"}
            </h2>
            <p className="mt-0.5 text-sm text-mist-500">
              {filtered.length} system{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SKU…"
                className="w-44 rounded-lg border border-mist-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-copper-400"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm text-ink-800 outline-none focus:border-copper-400"
            >
              <option value="featured">Featured</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {(active !== "all" || query) && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {active !== "all" && (
              <button
                onClick={() => setActive("all")}
                className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
              >
                {activeCat?.name} <X className="h-3 w-3" />
              </button>
            )}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
              >
                “{query}” <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-mist-300 bg-mist-50/50 py-20 text-center">
            <p className="text-mist-500">No products match your filters.</p>
            <button
              onClick={() => { setActive("all"); setBrand("all"); setQuery(""); }}
              className="mt-3 text-sm font-semibold text-copper-600"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
