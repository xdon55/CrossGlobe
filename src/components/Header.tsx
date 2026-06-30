"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Phone,
  Globe,
  UserRound,
  ArrowUpRight,
  CornerDownLeft,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { mainNav, megaMenu, languages, site } from "@/lib/site";

type SearchResult = {
  type: "Product" | "Project" | "Article";
  title: string;
  href: string;
  meta?: string;
};

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (q.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => clearTimeout(t);
  }, [q]);

  const suggestions = [
    "Curtain wall CW-75",
    "Aluminium sliding door",
    "Low-E double glazing",
    "Structural silicone",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-ink-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-24 w-[92%] max-w-2xl overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-mist-100 px-5 py-4">
          <Search className="h-5 w-5 text-copper-500" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, systems, projects & resources…"
            className="w-full bg-transparent text-base text-ink-900 outline-none placeholder:text-mist-400"
          />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-mist-500 transition hover:bg-mist-100 hover:text-ink-900"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {q.trim().length < 2 ? (
            <div className="p-3">
              <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wider text-mist-400">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="rounded-full border border-mist-200 bg-mist-50 px-3 py-1.5 text-sm text-ink-700 transition hover:border-copper-300 hover:text-copper-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="p-6 text-sm text-mist-400">Searching the catalogue…</div>
          ) : results.length === 0 ? (
            <div className="p-6 text-sm text-mist-400">
              No matches for “{q}”. Try a product code or system name.
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-brand-50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/5 text-xs font-bold text-brand-700">
                        {r.type[0]}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink-900">{r.title}</span>
                        {r.meta && <span className="block text-xs text-mist-500">{r.meta}</span>}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-xs font-medium text-copper-600">
                      <span className="rounded bg-copper-50 px-2 py-0.5">{r.type}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-mist-100 bg-mist-50 px-5 py-3 text-xs text-mist-500">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="h-3.5 w-3.5" /> to select
          </span>
          <span>AI-powered predictive search · CrossGlobe</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink-900 text-mist-300 lg:block">
        <div className="container-lux flex h-10 items-center justify-between text-[0.8rem]">
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-2 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-copper-400" /> {site.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-copper-400" /> {site.address.city}, {site.address.country}
            </span>
            <span className="text-mist-400">{site.hours}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-copper-400" />
              {languages.map((l) => (
                <a
                  key={l.code}
                  href={l.href}
                  className={`rounded px-1.5 py-0.5 transition hover:text-white ${
                    l.code === "EN" ? "text-white" : "text-mist-400"
                  }`}
                >
                  {l.code}
                </a>
              ))}
            </div>
            <Link href="/portal" className="flex items-center gap-1.5 transition hover:text-white">
              <UserRound className="h-3.5 w-3.5 text-copper-400" /> Trade Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-mist-200/70 bg-white/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-lux flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <Logo variant={scrolled ? "dark" : "dark"} />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) =>
              item.mega ? (
                <button
                  key={item.label}
                  onMouseEnter={() => setMegaOpen(true)}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[0.92rem] font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${megaOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-[0.92rem] font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition hover:bg-brand-50"
              aria-label="Open search"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <Link
              href="/quote"
              className="btn-shine hidden items-center gap-2 rounded-lg bg-copper-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lux transition hover:bg-copper-600 sm:inline-flex"
            >
              Request Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-mist-200/70 bg-white shadow-lux-lg xl:block"
            >
              <div className="container-lux grid grid-cols-4 gap-6 py-8">
                {megaMenu.map((group) => (
                  <div key={group.title}>
                    <div className={`mb-3 h-1 w-10 rounded-full bg-gradient-to-r ${group.accent}`} />
                    <h4 className="font-display text-sm font-bold text-ink-900">{group.title}</h4>
                    <p className="mt-1 text-xs text-mist-500">{group.blurb}</p>
                    <ul className="mt-4 space-y-1">
                      {group.items.map((it) => (
                        <li key={it.label}>
                          <Link
                            href={it.href}
                            className="group flex items-center gap-2 text-sm text-ink-700 transition hover:text-copper-700"
                          >
                            <span className="h-1 w-1 rounded-full bg-mist-300 transition group-hover:bg-copper-500" />
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 border-t border-mist-100 bg-brand-50/50 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
              >
                Explore the full catalogue
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-ink-900/50 backdrop-blur-sm xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 z-[71] flex h-full w-[86%] max-w-sm flex-col bg-white shadow-lux-lg xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-mist-100 px-5 py-4">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-ink-700 hover:bg-mist-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-ink-800 transition hover:bg-brand-50"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-mist-400" />
                  </Link>
                ))}
              </nav>
              <div className="border-t border-mist-100 p-5">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-copper-500 px-4 py-3 text-sm font-semibold text-white"
                >
                  Request Quote <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-ink-700"
                >
                  <Phone className="h-4 w-4 text-copper-500" /> {site.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
