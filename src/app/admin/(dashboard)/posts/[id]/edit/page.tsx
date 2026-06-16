import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import PostForm, { type PostFormData } from "../../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const { data } = supabase
        ? await supabase.from("posts").select("*").eq("id", id).maybeSingle()
        : { data: null };

    if (!data) notFound();

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Post</h1>
            <p className="mt-1 text-sm text-slate-500">Update and save. Changes go live immediately.</p>
            <div className="mt-6">
                <PostForm post={data as PostFormData} />
            </div>
        </div>
    );
}
