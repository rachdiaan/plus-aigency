import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminNav, LogoutButton } from "@/components/admin/AdminNav";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Auth gate — only signed-in admins past this point.
    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 flex w-60 flex-col bg-slate-900 px-4 py-6">
                <div className="px-3 pb-6">
                    <div className="text-xl font-extrabold tracking-tight text-white">
                        plus<span className="text-blue-500">.</span>
                    </div>
                    <p className="text-xs text-slate-500">Admin</p>
                </div>
                <AdminNav />
                <div className="mt-auto border-t border-slate-800 pt-4">
                    <p className="mb-2 truncate px-3 text-xs text-slate-500" title={user.email ?? ""}>
                        {user.email}
                    </p>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main */}
            <main className="ml-60 flex-1 px-8 py-8">{children}</main>
        </div>
    );
}
