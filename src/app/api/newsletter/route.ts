import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true }); // honeypot
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 422 });
  }

  try {
    // Upsert — re-subscribing re-confirms
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length) {
      await db
        .update(newsletterSubscribers)
        .set({ status: "pending_opt_in", consent: true })
        .where(eq(newsletterSubscribers.email, email));
    } else {
      await db.insert(newsletterSubscribers).values({
        email,
        consent: true,
        source: String(body.source ?? "footer"),
        status: "pending_opt_in",
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("newsletter error", e);
    return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
  }
}
