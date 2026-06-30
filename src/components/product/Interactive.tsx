"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Share2, Link2 } from "lucide-react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [""];
  return (
    <div className="overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-lux-lg">
      <div className="img-zoom relative aspect-square overflow-hidden bg-mist-100">
        <img src={list[active]} alt={name} className="h-full w-full object-cover" />
      </div>
      {list.length > 1 && (
        <div className="flex gap-3 p-4">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-20 overflow-hidden rounded-lg border-2 transition ${
                active === i ? "border-copper-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`${name} view ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: document.title, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }
  return (
    <button
      onClick={share}
      className="flex items-center gap-2 rounded-xl border border-mist-200 px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-mist-50"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}

export function RequestQuoteBar({ sku, name }: { sku: string; name: string }) {
  return (
    <Link
      href={`/quote?sku=${encodeURIComponent(sku)}`}
      className="btn-shine flex w-full items-center justify-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600"
    >
      <Link2 className="h-4 w-4" /> Request Quote for {name.split(" ").slice(0, 3).join(" ")}
    </Link>
  );
}
