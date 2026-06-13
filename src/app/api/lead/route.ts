import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let body: { name?: string; email?: string; message?: string; locale?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const email = (body.email ?? "").trim().toLowerCase();
    const name = (body.name ?? "").trim().slice(0, 120) || null;
    const message = (body.message ?? "").trim().slice(0, 2000) || null;
    const locale = body.locale === "id" ? "id" : "en";

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const { error } = await supabase.from("leads").insert({ name, email, message, locale });
    if (error) {
        return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}
