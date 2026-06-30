"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Something went wrong");
      }
      setStatus("done");
      form.reset();
    } catch (e: unknown) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Failed to send");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-copper-200 bg-copper-50/60 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-copper-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Message received</h3>
        <p className="mt-2 max-w-sm text-sm text-mist-500">
          Thank you for reaching out. A member of our team will respond within one working day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-lg border border-mist-300 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-mist-200 bg-white p-6 shadow-lux sm:p-8">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-800">Department</label>
          <select
            name="department"
            className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm text-ink-800 outline-none focus:border-copper-400"
          >
            <option>Sales</option>
            <option>Technical / Specification</option>
            <option>Accounts</option>
            <option>Support</option>
            <option>Warehouse / Logistics</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm text-ink-800 outline-none focus:border-copper-400"
          placeholder="Tell us about your project or enquiry…"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{err}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-shine flex w-full items-center justify-center gap-2 rounded-xl bg-copper-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lux-lg transition hover:bg-copper-600 disabled:opacity-60"
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <>Send message <Send className="h-4 w-4" /></>
        )}
      </button>
      <p className="text-center text-xs text-mist-400">
        Protected by reCAPTCHA. By submitting you agree to our Privacy Policy.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-800">
        {label} {required && <span className="text-copper-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-sm text-ink-800 outline-none focus:border-copper-400"
      />
    </div>
  );
}
