import { getSupabaseAdmin } from "@/lib/supabase";
import type { Article } from "@/data/articles";

type Loc = "en" | "id";

interface DbPost {
    slug: string;
    title: string;
    description: string | null;
    category: string | null;
    tags: string[] | null;
    content: string | null;
    image: string | null;
    locale: string;
    read_time: string | null;
    published_at: string | null;
    created_at: string;
}

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80&auto=format";

const SELECT =
    "slug,title,description,category,tags,content,image,locale,read_time,published_at,created_at";

function toArticle(p: DbPost, i: number): Article {
    return {
        id: 1_000_000 + i, // high offset so it never collides with static article ids
        slug: p.slug,
        title: p.title,
        description: p.description ?? "",
        category: p.category || "Blog",
        tags: p.tags ?? [],
        date: (p.published_at ?? p.created_at)?.slice(0, 10) ?? "",
        readTime: p.read_time || "5 min",
        image: p.image || FALLBACK_IMG,
        content: p.content ?? "",
        locale: p.locale === "id" ? "id" : "en",
    };
}

/** Published DB posts for a locale, newest first (Article-shaped). */
export async function getPublishedPosts(locale: Loc): Promise<Article[]> {
    const supabase = getSupabaseAdmin();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from("posts")
        .select(SELECT)
        .eq("status", "published")
        .eq("locale", locale)
        .order("published_at", { ascending: false });
    if (error || !data) return [];
    return (data as DbPost[]).map(toArticle);
}

/** A single published DB post by slug, or null. */
export async function getPublishedPostBySlug(slug: string): Promise<Article | null> {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;
    const { data } = await supabase
        .from("posts")
        .select(SELECT)
        .eq("status", "published")
        .eq("slug", slug)
        .maybeSingle();
    if (!data) return null;
    return toArticle(data as DbPost, 0);
}
