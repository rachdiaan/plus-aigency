"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase";

async function requireAdmin() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
}

function parse(formData: FormData) {
    const tags = String(formData.get("tags") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const status = formData.get("status") === "published" ? "published" : "draft";
    const locale = formData.get("locale") === "id" ? "id" : "en";
    return {
        slug: String(formData.get("slug") ?? "").trim(),
        title: String(formData.get("title") ?? "").trim(),
        description: String(formData.get("description") ?? "").trim(),
        category: String(formData.get("category") ?? "").trim(),
        tags,
        content: String(formData.get("content") ?? ""),
        image: String(formData.get("image") ?? "").trim(),
        locale,
        read_time: String(formData.get("read_time") ?? "").trim() || "5 min",
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
    };
}

export async function createPost(formData: FormData) {
    await requireAdmin();
    const admin = getSupabaseAdmin();
    if (!admin) throw new Error("Database not configured");
    const post = parse(formData);
    if (!post.slug || !post.title) throw new Error("Slug and title are required");
    const { error } = await admin.from("posts").insert(post);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/posts");
    revalidatePath(`/${post.locale}/blog`);
    redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
    await requireAdmin();
    const admin = getSupabaseAdmin();
    if (!admin) throw new Error("Database not configured");
    const id = String(formData.get("id") ?? "");
    const post = parse(formData);
    const { error } = await admin.from("posts").update(post).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/posts");
    revalidatePath(`/${post.locale}/blog`);
    revalidatePath(`/${post.locale}/blog/${post.slug}`);
    redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
    await requireAdmin();
    const admin = getSupabaseAdmin();
    if (!admin) return;
    const id = String(formData.get("id") ?? "");
    if (id) await admin.from("posts").delete().eq("id", id);
    revalidatePath("/admin/posts");
}
