import type { Metadata } from "next";
import {
  Lock,
  ShoppingBag,
  FileText,
  Heart,
  Download,
  Ticket,
  Truck,
  RotateCcw,
  Bell,
  ShieldCheck,
  ArrowUpRight,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/CTABand";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Trade & Customer Portal",
  description:
    "The CrossGlobe trade portal: secure login, order history, invoices, quotations, bulk ordering, approval workflows and live delivery tracking.",
  alternates: { canonical: "/portal" },
};

const features = [
  { icon: ShoppingBag, title: "Order history", body: "Re-order from past purchases in seconds." },
  { icon: FileText, title: "Invoices & quotes", body: "Download, filter and reconcile all documents." },
  { icon: Heart, title: "Wishlist & saved products", body: "Keep project specifications at your fingertips." },
  { icon: Download, title: "Downloads", body: "All your CAD, BIM and datasheets in one place." },
  { icon: Ticket, title: "Support tickets", body: "Raise and track technical queries." },
  { icon: Truck, title: "Delivery tracking", body: "Live status from depot to site." },
  { icon: RotateCcw, title: "Returns", body: "Manage returns and credits with ease." },
  { icon: Bell, title: "Notifications", body: "Stock, price and order alerts." },
];

const orders = [
  { ref: "SO-48201", date: "12 Sep 2025", items: 6, total: "€ 12,840.00", status: "Delivered" },
  { ref: "SO-48119", date: "28 Aug 2025", items: 14, total: "€ 41,200.00", status: "In transit" },
  { ref: "SO-47990", date: "09 Aug 2025", items: 3, total: "€ 4,610.00", status: "Processing" },
];

export default function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Trade & Customer Portal"
        title={<>Your projects, <span className="text-gradient-copper">under control</span></>}
        description="A secure platform for trade accounts and customers — order history, invoices, quotations, bulk ordering, approval workflows and live tracking."
        image={media.warehouseSteel}
        crumbs={[{ label: "Portal" }]}
      />

      {/* Login preview + dashboard */}
      <section className="container-lux grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-copper-600">
            <Lock className="h-4 w-4" /> Secure access
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Sign in to the trade portal
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-ink-700">
            Manage procurement across every live site with dedicated project pricing, multi-user access and approval workflows — secured with two-factor authentication.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-mist-200 bg-mist-50/60 p-4">
              <ShieldCheck className="h-5 w-5 text-brand-700" />
              <p className="mt-2 text-sm font-semibold text-ink-900">2FA &amp; JWT secured</p>
              <p className="text-xs text-mist-500">Bank-grade session security.</p>
            </div>
            <div className="rounded-xl border border-mist-200 bg-mist-50/60 p-4">
              <CheckCircle2 className="h-5 w-5 text-brand-700" />
              <p className="mt-2 text-sm font-semibold text-ink-900">SSO ready</p>
              <p className="text-xs text-mist-500">Google &amp; Microsoft login.</p>
            </div>
          </div>
        </Reveal>

        {/* Login card (non-functional preview) */}
        <Reveal direction="left">
          <div className="rounded-3xl border border-mist-200 bg-white p-8 shadow-lux-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-900">Member sign in</h3>
              <Lock className="h-5 w-5 text-copper-500" />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Email</label>
                <input type="email" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="you@company.nl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Password</label>
                <input type="password" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="••••••••" />
              </div>
              <button className="btn-shine w-full rounded-xl bg-brand-800 py-3 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-brand-700">
                Sign in securely
              </button>
              <div className="flex items-center gap-3 py-1 text-xs text-mist-400">
                <span className="h-px flex-1 bg-mist-200" /> or continue with <span className="h-px flex-1 bg-mist-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 rounded-lg border border-mist-200 py-2.5 text-sm font-medium text-ink-700 hover:bg-mist-50">Google</button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-mist-200 py-2.5 text-sm font-medium text-ink-700 hover:bg-mist-50">Microsoft</button>
              </div>
              <p className="text-center text-xs text-mist-500">
                No account?{" "}
                <a href="/contact" className="font-semibold text-copper-600 hover:underline">Open a trade account</a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Dashboard preview */}
      <section className="bg-mist-50/60 py-20">
        <div className="container-lux">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-copper-600">
                <PackageCheck className="h-4 w-4" /> Dashboard preview
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink-900">A workspace built for procurement teams</h2>
            </div>
          </Reveal>

          {/* Mock stats */}
          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Open orders", value: "7", sub: "2 awaiting approval" },
                { label: "Outstanding invoices", value: "€ 18,4k", sub: "Net 30" },
                { label: "Saved quotations", value: "12", sub: "3 expiring soon" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-mist-200 bg-white p-6 shadow-lux">
                  <p className="text-xs uppercase tracking-wider text-mist-500">{s.label}</p>
                  <p className="mt-1 font-display text-3xl font-extrabold text-brand-800">{s.value}</p>
                  <p className="mt-1 text-xs text-copper-600">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mock order table */}
          <Reveal delay={0.1}>
            <div className="mt-6 overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-lux">
              <div className="flex items-center justify-between border-b border-mist-100 px-6 py-4">
                <h3 className="font-display text-base font-bold text-ink-900">Recent orders</h3>
                <a href="#" className="flex items-center gap-1 text-sm font-semibold text-copper-600">View all <ArrowUpRight className="h-4 w-4" /></a>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-mist-50/60 text-left text-xs uppercase tracking-wider text-mist-500">
                    <th className="px-6 py-3 font-semibold">Reference</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Items</th>
                    <th className="px-6 py-3 font-semibold">Total</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.ref} className="border-t border-mist-100">
                      <td className="px-6 py-4 font-semibold text-ink-900">{o.ref}</td>
                      <td className="px-6 py-4 text-mist-500">{o.date}</td>
                      <td className="px-6 py-4 text-mist-500">{o.items}</td>
                      <td className="px-6 py-4 font-medium text-ink-900">{o.total}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          o.status === "Delivered" ? "bg-green-100 text-green-700" :
                          o.status === "In transit" ? "bg-copper-100 text-copper-700" :
                          "bg-brand-50 text-brand-700"
                        }`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features grid */}
      <section className="container-lux py-20">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-ink-900">Everything in one place</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-mist-200 bg-white p-6 shadow-lux transition hover:border-copper-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <f.icon className="h-5 w-5" />
                </span>
                <h4 className="mt-3 font-display text-base font-bold text-ink-900">{f.title}</h4>
                <p className="mt-1 text-sm text-mist-500">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Open a trade account"
        description="Unlock project pricing, multi-user access, approval workflows and consolidated invoicing across all your sites."
      />
    </>
  );
}
