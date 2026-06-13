import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
    let body: { slug?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const slug = (body.slug ?? "").trim().slice(0, 200);
    if (!slug) {
        return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        // Not configured yet — succeed silently so the UI doesn't error.
        return NextResponse.json({ views: null });
    }

    const { data, error } = await supabase.rpc("increment_article_view", { p_slug: slug });
    if (error) {
        return NextResponse.json({ views: null });
    }

    return NextResponse.json({ views: data });
}
