import { getSupabaseAdmin } from "@/lib/supabase";
import { deleteRow } from "../actions";

export const dynamic = "force-dynamic";

function fmt(d: string) {
    return new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export default async function LeadsPage() {
    const supabase = getSupabaseAdmin();
    const { data } = supabase
        ? await supabase.from("leads").select("id, name, email, message, source, created_at").order("created_at", { ascending: false })
        : { data: [] };
    const rows = (data ?? []) as { id: string; name: string | null; email: string; message: string | null; source: string | null; created_at: string }[];

    return (
        <div>
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                    <p className="mt-1 text-sm text-slate-500">Lead submissions captured across the site.</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{rows.length} total</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Name</th>
                            <th className="px-5 py-3 font-semibold">Email</th>
                            <th className="px-5 py-3 font-semibold">Message</th>
                            <th className="px-5 py-3 font-semibold">Date</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 && (
                            <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">No leads yet.</td></tr>
                        )}
                        {rows.map((r) => (
                            <tr key={r.id} className="align-top hover:bg-slate-50">
                                <td className="px-5 py-3 font-medium text-slate-800">{r.name ?? "—"}</td>
                                <td className="px-5 py-3 text-slate-600">{r.email}</td>
                                <td className="max-w-xs px-5 py-3 text-slate-500"><span className="line-clamp-2">{r.message ?? "—"}</span></td>
                                <td className="px-5 py-3 whitespace-nowrap text-slate-500">{fmt(r.created_at)}</td>
                                <td className="px-5 py-3 text-right">
                                    <form action={deleteRow}>
                                        <input type="hidden" name="table" value="leads" />
                                        <input type="hidden" name="id" value={r.id} />
                                        <button className="text-xs font-semibold text-rose-500 hover:text-rose-700">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
