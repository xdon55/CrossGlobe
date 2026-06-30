"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Upload,
  FileText,
  Loader2,
  Building2,
  Calendar,
  Package,
  UserRound,
} from "lucide-react";

type LineItem = { id: number; description: string; qty: string };

const steps = [
  { label: "Project", icon: Building2 },
  { label: "Products", icon: Package },
  { label: "Company", icon: UserRound },
  { label: "Documents", icon: FileText },
];

export function QuoteForm({ initialSku }: { initialSku?: string }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [ref, setRef] = useState("");
  const [items, setItems] = useState<LineItem[]>(
    initialSku
      ? [{ id: 1, description: initialSku, qty: "1" }]
      : [{ id: 1, description: "", qty: "1" }]
  );
  const [files, setFiles] = useState<string[]>([]);

  function addItem() {
    setItems((p) => [...p, { id: Date.now(), description: "", qty: "1" }]);
  }
  function removeItem(id: number) {
    setItems((p) => (p.length > 1 ? p.filter((i) => i.id !== id) : p));
  }
  function updateItem(id: number, field: keyof LineItem, value: string) {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    fd.append("items", JSON.stringify(items.filter((i) => i.description.trim())));
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (j.reference) {
        setRef(j.reference);
        setStatus("done");
      } else {
        setStatus("idle");
        alert(j.error ?? "Could not submit. Please try again.");
      }
    } catch {
      setStatus("idle");
      alert("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-copper-200 bg-copper-50/60 p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-copper-600" />
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Quotation request received</h3>
        <p className="mt-2 max-w-md text-mist-500">
          Thank you. Our specification engineers will review your request and respond within one working day.
        </p>
        <div className="mt-6 rounded-xl bg-white px-6 py-4 shadow-lux">
          <p className="text-xs uppercase tracking-wider text-mist-400">Your reference</p>
          <p className="font-display text-xl font-bold text-brand-800">{ref}</p>
        </div>
        <p className="mt-4 text-xs text-mist-400">A confirmation has been sent to your email address.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-lux-lg">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Progress */}
      <div className="flex border-b border-mist-100 bg-mist-50/60">
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={`relative flex flex-1 flex-col items-center gap-2 px-2 py-4 text-center transition ${
              i === step ? "text-brand-800" : i < step ? "text-copper-600" : "text-mist-400"
            }`}
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              i === step ? "bg-brand-800 text-white" : i < step ? "bg-copper-500 text-white" : "bg-mist-200"
            }`}>
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-wide">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-9">
        {/* Step 0 — Project */}
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-ink-900">Project details</h3>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-800">Project name *</label>
              <input name="projectName" required className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="e.g. Meridian Tower, Amsterdam" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Expected delivery</label>
                <input name="expectedDelivery" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="e.g. Q2 2026" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Sector</label>
                <select name="sector" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400">
                  <option>Commercial</option><option>Residential</option><option>Industrial</option>
                  <option>Healthcare</option><option>Education</option><option>Retail</option>
                  <option>Hospitality</option><option>Infrastructure</option><option>Government</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 1 — Products */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-ink-900">Products &amp; quantities</h3>
              <button type="button" onClick={addItem} className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800 hover:bg-brand-100">
                <Plus className="h-4 w-4" /> Add line
              </button>
            </div>
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3">
                  <input
                    value={it.description}
                    onChange={(e) => updateItem(it.id, "description", e.target.value)}
                    className="flex-1 rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400"
                    placeholder="Product / system / SKU or description"
                  />
                  <input
                    value={it.qty}
                    onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                    className="w-20 rounded-lg border border-mist-200 bg-white px-3 py-3 text-sm outline-none focus:border-copper-400"
                    placeholder="Qty"
                  />
                  <button type="button" onClick={() => removeItem(it.id)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-mist-200 text-mist-400 hover:border-red-300 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="rounded-lg bg-brand-50 px-4 py-3 text-xs text-brand-800">
              You can also upload a BOQ or product list in the next step.
            </p>
          </div>
        )}

        {/* Step 2 — Company */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-ink-900">Company &amp; contact</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Full name *</label>
                <input name="name" required className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Email *</label>
                <input name="email" type="email" required className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Phone</label>
                <input name="phone" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">Company</label>
                <input name="company" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink-800">VAT number</label>
                <input name="vatNumber" className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="NL000000000B01" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Documents */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-display text-xl font-bold text-ink-900">Drawings &amp; message</h3>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-mist-300 bg-mist-50/40 px-6 py-10 text-center transition hover:border-copper-400">
              <Upload className="h-8 w-8 text-copper-500" />
              <p className="mt-3 text-sm font-semibold text-ink-800">Upload drawings, BOQ or PDFs</p>
              <p className="mt-1 text-xs text-mist-400">PDF, DWG, DXF, XLSX — up to 25MB each</p>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const names = Array.from(e.target.files ?? []).map((f) => f.name);
                  setFiles((p) => [...p, ...names]);
                }}
              />
            </label>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm text-ink-700">
                    <FileText className="h-4 w-4 text-copper-500" /> {f}
                  </div>
                ))}
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-800">Additional notes</label>
              <textarea name="message" rows={4} className="w-full resize-none rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm outline-none focus:border-copper-400" placeholder="Performance requirements, finishes, special conditions…" />
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              step === 0 ? "pointer-events-none opacity-0" : "text-ink-700 hover:bg-mist-50"
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="btn-shine flex items-center gap-2 rounded-xl bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-brand-700"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-shine flex items-center gap-2 rounded-xl bg-copper-500 px-7 py-3 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600 disabled:opacity-60"
            >
              {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit request <CheckCircle2 className="h-4 w-4" /></>}
            </button>
          )}
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-mist-400">
          <Calendar className="h-3.5 w-3.5" /> Receive a consolidated quotation by email within one working day
        </p>
      </div>
    </form>
  );
}
