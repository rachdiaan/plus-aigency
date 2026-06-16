import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import { deletePost } from "./actions";

export const dynamic = "force-dynamic";

interface Row {
    id: string;
    slug: string;
    title: string;
    locale: string;
    category: string | null;
    status: string;
    published_at: string | null;
    created_at: string;
}

function fmt(d: string | null) {
    return d ? new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export default async function PostsPage() {
    const supabase = getSupabaseAdmin();
    const { data } = supabase
        ? await supabase
            .from("posts")
            .select("id, slug, title, locale, category, status, published_at, created_at")
            .order("created_at", { ascending: false })
        : { data: [] };
    const rows = (data ?? []) as Row[];

    return (
        <div>
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
                    <p className="mt-1 text-sm text-slate-500">Create and manage articles shown on the live blog.</p>
                </div>
                <Link href="/admin/posts/new" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                    + New Post
                </Link>
            </div>

            {!supabase && (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    Supabase isn&apos;t configured. Run <code className="font-mono">supabase/posts.sql</code> and set the env vars.
                </div>
            )}

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Title</th>
                            <th className="px-5 py-3 font-semibold">Lang</th>
                            <th className="px-5 py-3 font-semibold">Category</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                            <th className="px-5 py-3 font-semibold">Date</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 && (
                            <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No posts yet. Create your first one.</td></tr>
                        )}
                        {rows.map((r) => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3 font-medium text-slate-800">{r.title}</td>
                                <td className="px-5 py-3"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-500">{r.locale}</span></td>
                                <td className="px-5 py-3 text-slate-500">{r.category || "—"}</td>
                                <td className="px-5 py-3">
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap text-slate-500">{fmt(r.published_at ?? r.created_at)}</td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-3">
                                        {r.status === "published" && (
                                            <a href={`/${r.locale}/blog/${r.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-400 hover:text-slate-600">View</a>
                                        )}
                                        <Link href={`/admin/posts/${r.id}/edit`} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Edit</Link>
                                        <form action={deletePost}>
                                            <input type="hidden" name="id" value={r.id} />
                                            <button className="text-xs font-semibold text-rose-500 hover:text-rose-700">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
