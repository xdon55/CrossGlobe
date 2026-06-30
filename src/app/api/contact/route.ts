import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 422 });
  }

  try {
    await db.insert(contactMessages).values({
      name,
      email,
      phone: String(body.phone ?? "").trim() || null,
      department: String(body.department ?? "").trim() || null,
      message,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}
