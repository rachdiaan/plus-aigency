"use client";

import { useRouter, usePathname } from "next/navigation";

interface Props {
    categories: { value: string; label: string }[];
    activeCategory: string;
}

export default function BlogFilters({ categories, activeCategory }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const setCategory = (value: string) => {
        const url = value === "__all__" ? pathname : `${pathname}?category=${encodeURIComponent(value)}`;
        router.push(url, { scroll: false });
    };

    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeCategory === cat.value
                            ? "bg-primary text-white shadow-md shadow-primary/25"
                            : "border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] text-[#475569] dark:text-[#94A3B8] hover:border-primary/30 hover:text-primary"
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
