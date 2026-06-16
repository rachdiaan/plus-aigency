import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getStats() {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;

    const [subs, leads, contacts, views] = await Promise.all([
        supabase.from("subscribers").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("article_views").select("views"),
    ]);

    const totalViews =
        (views.data ?? []).reduce((sum, r: { views: number }) => sum + (r.views ?? 0), 0);

    const recentSubs = await supabase
        .from("subscribers")
        .select("email, locale, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

    const recentContacts = await supabase
        .from("contacts")
        .select("name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

    return {
        subscribers: subs.count ?? 0,
        leads: leads.count ?? 0,
        contacts: contacts.count ?? 0,
        views: totalViews,
        recentSubs: recentSubs.data ?? [],
        recentContacts: recentContacts.data ?? [],
    };
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
            <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value.toLocaleString()}</p>
        </div>
    );
}

function fmt(d: string) {
    return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default async function DashboardPage() {
    const stats = await getStats();

    if (!stats) {
        return (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
                Supabase is not configured. Add the env vars to enable the dashboard.
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Live overview of your site activity.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Subscribers" value={stats.subscribers} accent="text-blue-600" />
                <StatCard label="Leads" value={stats.leads} accent="text-emerald-600" />
                <StatCard label="Contacts" value={stats.contacts} accent="text-violet-600" />
                <StatCard label="Article Views" value={stats.views} accent="text-amber-600" />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">Recent Subscribers</h2>
                    <div className="mt-3 divide-y divide-slate-100">
                        {stats.recentSubs.length === 0 && <p className="py-3 text-sm text-slate-400">No subscribers yet.</p>}
                        {stats.recentSubs.map((s: { email: string; locale: string; created_at: string }, i: number) => (
                            <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                                <span className="truncate text-slate-700">{s.email}</span>
                                <span className="ml-3 shrink-0 text-xs text-slate-400">{fmt(s.created_at)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900">Recent Contacts</h2>
                    <div className="mt-3 divide-y divide-slate-100">
                        {stats.recentContacts.length === 0 && <p className="py-3 text-sm text-slate-400">No contacts yet.</p>}
                        {stats.recentContacts.map((c: { name: string; email: string; created_at: string }, i: number) => (
                            <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                                <span className="truncate text-slate-700">{c.name} <span className="text-slate-400">· {c.email}</span></span>
                                <span className="ml-3 shrink-0 text-xs text-slate-400">{fmt(c.created_at)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
