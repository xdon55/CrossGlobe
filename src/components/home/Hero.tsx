"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, PlayCircle, ChevronDown, ShieldCheck, Leaf, Truck } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* Background image with parallax + ken burns */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/19107852/pexels-photo-19107852.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1280"
          alt="Modern aluminium and glass architectural façade"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/70 to-brand-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/30" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative container-lux flex min-h-[100svh] flex-col justify-center pt-28 pb-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-200 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-glow rounded-full bg-copper-400" />
          Engineered in the Netherlands · Trusted across Europe
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-[4.4rem]"
        >
          Premium Aluminium &amp; Building Materials for{" "}
          <span className="text-gradient-copper">Europe&apos;s Modern Construction</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-200"
        >
          From unitised curtain walls to specification-grade glazing and fasteners — CrossGlobe equips architects, contractors and developers with engineered systems, technical expertise and reliable Benelux logistics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/quote"
            className="btn-shine group flex items-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600"
          >
            Request a Quote
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Shop Products
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-mist-100 transition hover:text-white"
          >
            <PlayCircle className="h-5 w-5 text-copper-400" />
            Trade Account
          </Link>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-6 text-sm text-mist-300"
        >
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-copper-400" /> CE &amp; ISO 9001 certified</span>
          <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-copper-400" /> 80% recycled aluminium</span>
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-copper-400" /> 48-hour Benelux delivery</span>
        </motion.div>
      </motion.div>

      {/* Animated statistics bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="container-lux grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
              className="px-4 py-6 text-center lg:py-7"
            >
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-mist-400">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-mist-400 lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
