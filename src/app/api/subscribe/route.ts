import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let body: { email?: string; locale?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const email = (body.email ?? "").trim().toLowerCase();
    const locale = body.locale === "id" ? "id" : "en";

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    const { error } = await supabase.from("subscribers").insert({ email, locale });

    // Duplicate email = treat as success (idempotent subscribe)
    if (error && error.code !== "23505") {
        return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}
