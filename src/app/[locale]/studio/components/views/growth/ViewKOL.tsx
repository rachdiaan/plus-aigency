import React, { useState } from "react";
import { Megaphone, Filter, Search, Star, ShieldCheck } from "lucide-react";
import { MOCK_KOLS } from "@/lib/mockData";

export const ViewKOL: React.FC<{ addNotification: (t: 'success' | 'error', m: string) => void }> = ({ addNotification }) => {
    const [filters, setFilters] = useState({ cat: 'All', price: 'All', search: '' });
    const filtered = MOCK_KOLS.filter(k =>
        (filters.cat === 'All' || k.category === filters.cat) &&
        (filters.price === 'All' || (filters.price === 'Micro' ? k.price < 500000 : k.price >= 500000)) &&
        k.name.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-24 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><h2 className="text-2xl font-bold text-slate-800 dark:text-white">KOL Collaboration</h2><button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold text-sm flex gap-2 shadow-lg hover:shadow-yellow-600/20 transition-all transform hover:-translate-y-0.5"><Megaphone size={16} /> Kampanye Baru</button></div>

            {/* Filter Section */}
            <div id="kol-filter" className="bg-card-bg backdrop-blur-sm p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center shadow-lg transition-colors">
                <div className="flex items-center gap-2 text-muted font-bold"><Filter size={16} /> Filter:</div>
                <select onChange={e => setFilters({ ...filters, cat: e.target.value })} className="bg-surface border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors cursor-pointer w-full md:w-auto">
                    <option value="All">Semua Kategori</option>
                    <option value="F&B">F&B</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Technology">Technology</option>
                </select>
                <select onChange={e => setFilters({ ...filters, price: e.target.value })} className="bg-surface border border-border text-foreground text-sm rounded-lg px-3 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors cursor-pointer w-full md:w-auto">
                    <option value="All">Semua Harga</option>
                    <option value="Micro">Micro (&lt;500rb)</option>
                    <option value="Macro">Macro (&gt;500rb)</option>
                </select>
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3 top-2.5 text-muted-light" size={16} />
                    <input onChange={e => setFilters({ ...filters, search: e.target.value })} type="text" placeholder="Cari influencer..." className="w-full bg-surface border border-border text-foreground text-sm rounded-lg pl-9 pr-4 py-2 focus:border-primary outline-none hover:bg-surface-hover transition-colors" />
                </div>
            </div>

            {/* KOL Cards */}
            <div id="kol-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(k => (
                    <div key={k.id} className="bg-card-bg border border-border p-5 rounded-2xl relative group hover:border-primary/50 transition-all hover:bg-surface-hover hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute top-4 right-4 text-yellow-500"><Star size={16} /></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-full p-0.5 shadow-lg">
                                <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-lg font-bold text-foreground uppercase">{k.name.substring(0, 2)}</div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1"><h4 className="text-foreground font-bold">{k.name}</h4>{k.verified && <ShieldCheck size={14} className="text-primary fill-primary/20" />}</div>
                                <p className="text-xs text-primary">{k.handle}</p>
                                <div className="flex gap-1 mt-1">{k.tags.map((t, i) => <span key={i} className="text-[10px] bg-surface-hover px-2 py-0.5 rounded-full text-muted">{t}</span>)}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-surface rounded-xl border border-border">
                            <div className="text-center">
                                <p className="text-[10px] text-muted uppercase font-bold">Followers</p>
                                <p className="text-foreground font-bold text-sm">{k.followers}</p>
                            </div>
                            <div className="text-center border-l border-border">
                                <p className="text-[10px] text-muted uppercase font-bold">ER</p>
                                <p className="text-tertiary font-bold text-sm">{k.er}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div><p className="text-[10px] text-muted">Mulai dari</p><p className="text-foreground font-bold">Rp {k.price.toLocaleString()}</p></div>
                            <button onClick={() => addNotification('success', 'Proposal terkirim!')} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors shadow-lg">Kontak</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
