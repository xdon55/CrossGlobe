"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Check, X, Shield } from "lucide-react";

type Preferences = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaults: Preferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const labels: { key: keyof Preferences; title: string; desc: string }[] = [
  { key: "necessary", title: "Necessary", desc: "Core functionality & security. Always active." },
  { key: "preferences", title: "Preferences", desc: "Remember language, region & settings." },
  { key: "analytics", title: "Analytics", desc: "Anonymous usage data to improve the site." },
  { key: "marketing", title: "Marketing", desc: "Personalised content & ad measurement." },
];

const STORAGE_KEY = "hlg-consent-v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>(defaults);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  function persist(choice: Preferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, ts: Date.now() }));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[95] mx-auto max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-mist-200 bg-white/95 shadow-lux-lg backdrop-blur-xl">
            {!detailed ? (
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">
                    We value your privacy
                  </p>
                  <p className="mt-1 text-sm text-mist-500">
                    We use cookies to enhance your experience and analyse traffic, fully in line with GDPR &amp; Dutch privacy law.{" "}
                    <Link href="/resources#cookies" className="text-copper-600 underline-offset-2 hover:underline">
                      Cookie Policy
                    </Link>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  <button
                    onClick={() => setDetailed(true)}
                    className="rounded-lg border border-mist-200 px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-mist-50"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => persist({ ...defaults })}
                    className="rounded-lg border border-ink-700 px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:bg-ink-900 hover:text-white"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={() => persist({ necessary: true, preferences: true, analytics: true, marketing: true })}
                    className="btn-shine flex items-center gap-1.5 rounded-lg bg-copper-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-copper-600"
                  >
                    Accept all <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-700" />
                  <h4 className="font-display text-base font-bold text-ink-900">Consent preferences</h4>
                  <button
                    onClick={() => setDetailed(false)}
                    className="ml-auto rounded-md p-1 text-mist-400 hover:bg-mist-100"
                    aria-label="Back"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {labels.map((l) => (
                    <label
                      key={l.key}
                      className="flex cursor-pointer items-center gap-4 rounded-xl border border-mist-100 px-4 py-3 transition hover:bg-mist-50"
                    >
                      <button
                        type="button"
                        role="switch"
                        aria-checked={prefs[l.key]}
                        disabled={l.key === "necessary"}
                        onClick={() =>
                          setPrefs((p) => ({ ...p, [l.key]: !p[l.key] }))
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          prefs[l.key] ? "bg-copper-500" : "bg-mist-300"
                        } ${l.key === "necessary" ? "opacity-70" : ""}`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                            prefs[l.key] ? "left-[1.4rem]" : "left-0.5"
                          }`}
                        />
                      </button>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-ink-900">{l.title}</span>
                        <span className="block text-xs text-mist-500">{l.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => persist({ ...defaults })}
                    className="rounded-lg border border-mist-200 px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-mist-50"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={() => persist(prefs)}
                    className="btn-shine flex items-center gap-1.5 rounded-lg bg-copper-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-copper-600"
                  >
                    Save preferences <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
