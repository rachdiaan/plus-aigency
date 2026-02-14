import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";

const StudioLoginLogo = () => {
    const { theme } = useTheme();
    return <Logo variant={theme === 'dark' ? 'light' : 'dark'} size="large" className="mx-auto" />;
};

export const StudioLogin: React.FC<{ onLoginSuccess: () => void, onBack: () => void }> = ({ onLoginSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLoginSuccess();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-500">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/8 dark:bg-blue-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-500/8 dark:bg-purple-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Back Button */}
            <button onClick={onBack} className="absolute top-8 left-8 p-2 rounded-full bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-white z-20 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ArrowRight className="rotate-180" size={24} />
            </button>

            {/* Login Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-24">
                            <StudioLoginLogo />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Masuk untuk melanjutkan kampanye Anda.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-500 dark:text-slate-400">
                            <input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-500 focus:ring-blue-500" /> Remember me
                        </label>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-bold">Lupa Password?</a>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">ATAU</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>

                <div className="space-y-3">
                    <button className="w-full py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-3">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Masuk dengan Google
                    </button>
                </div>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8">
                    Belum punya akun? <a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Daftar Sekarang</a>
                </p>
            </div>
        </div>
    );
};
