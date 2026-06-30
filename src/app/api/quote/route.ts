import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";

// Basic server-side rate limiting (in-memory, per sandbox)
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 6;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden field
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 422 });
  }

  const reference = "Q-" + Date.now().toString(36).toUpperCase().slice(-8);

  try {
    await db.insert(quoteRequests).values({
      reference,
      name,
      email,
      company: String(body.company ?? "").trim() || null,
      vatNumber: String(body.vatNumber ?? "").trim() || null,
      phone: String(body.phone ?? "").trim() || null,
      projectName: String(body.projectName ?? "").trim() || null,
      expectedDelivery: String(body.expectedDelivery ?? "").trim() || null,
      message: message || null,
      items: Array.isArray(body.items) ? (body.items as string[]) : null,
      status: "received",
    });
    return NextResponse.json({ ok: true, reference });
  } catch (e) {
    console.error("quote insert error", e);
    return NextResponse.json({ error: "Could not submit request." }, { status: 500 });
  }
}
