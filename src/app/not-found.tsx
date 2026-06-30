import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-brand-950 px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-copper-500/25 blur-3xl" />
      <div className="relative">
        <Logo variant="light" className="justify-center" />
        <p className="mt-10 font-display text-[7rem] font-extrabold leading-none text-gradient-copper sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-mist-300">
          The page you are looking for may have moved or no longer exists. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-shine flex items-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600">
            <Home className="h-4 w-4" /> Back to home
          </Link>
          <Link href="/products" className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" /> Browse products
          </Link>
        </div>
      </div>
    </section>
  );
}
