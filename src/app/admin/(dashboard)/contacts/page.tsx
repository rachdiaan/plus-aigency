import { getSupabaseAdmin } from "@/lib/supabase";
import { deleteRow } from "../actions";

export const dynamic = "force-dynamic";

function fmt(d: string) {
    return new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export default async function ContactsPage() {
    const supabase = getSupabaseAdmin();
    const { data } = supabase
        ? await supabase.from("contacts").select("id, name, email, company, message, created_at").order("created_at", { ascending: false })
        : { data: [] };
    const rows = (data ?? []) as { id: string; name: string; email: string; company: string | null; message: string; created_at: string }[];

    return (
        <div>
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
                    <p className="mt-1 text-sm text-slate-500">Messages from the contact form.</p>
                </div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">{rows.length} total</span>
            </div>

            <div className="mt-6 space-y-4">
                {rows.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-400 shadow-sm">No contact messages yet.</div>
                )}
                {rows.map((r) => (
                    <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-semibold text-slate-800">
                                    {r.name}
                                    {r.company && <span className="ml-2 text-sm font-normal text-slate-400">· {r.company}</span>}
                                </p>
                                <a href={`mailto:${r.email}`} className="text-sm text-blue-600 hover:underline">{r.email}</a>
                            </div>
                            <div className="flex shrink-0 items-center gap-3">
                                <span className="whitespace-nowrap text-xs text-slate-400">{fmt(r.created_at)}</span>
                                <form action={deleteRow}>
                                    <input type="hidden" name="table" value="contacts" />
                                    <input type="hidden" name="id" value={r.id} />
                                    <button className="text-xs font-semibold text-rose-500 hover:text-rose-700">Delete</button>
                                </form>
                            </div>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{r.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
