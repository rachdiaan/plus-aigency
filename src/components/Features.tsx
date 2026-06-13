"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useT, useLocale } from "@/i18n/I18nProvider";

function ArrowIcon() {
    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
            <svg
                className="h-4 w-4 text-primary transition-colors group-hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
            </svg>
        </div>
    );
}

export default function Products() {
    const ref = useScrollReveal();
    const t = useT();
    const locale = useLocale();
    const items = t.products.items;

    const products = [
        { title: items.chatbot.title, description: items.chatbot.description, icon: "🤖", href: `/${locale}/chat-bot`, badge: t.products.badgePopular, internal: true },
        { title: items.support.title, description: items.support.description, icon: "🎧", href: "https://plusthe.site/customer-support/", internal: false },
        { title: items.mobileApp.title, description: items.mobileApp.description, icon: "📱", href: "https://plusthe.site/mobile-app/", internal: false },
        { title: items.crm.title, description: items.crm.description, icon: "📊", href: "https://plusthe.site/crm/", internal: false },
        { title: items.agency.title, description: items.agency.description, icon: "🚀", href: `/${locale}/digital-agency`, badge: t.products.badgeNew, internal: true },
        { title: items.game.title, description: items.game.description, icon: "🎮", href: `/${locale}/mobile-game`, internal: true },
    ];

    return (
        <section id="products" className="py-24 lg:py-32 bg-section-alt bg-grid">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        {t.products.tag}
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        {t.products.title}
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                        {t.products.description}
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p, i) => {
                        const cardClass =
                            "feature-card group relative flex flex-col rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] p-7 cursor-pointer transition-colors";
                        const inner = (
                            <>
                                {p.badge && (
                                    <span className="absolute top-4 right-4 rounded-full bg-secondary/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                                        {p.badge}
                                    </span>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-[#0F172A] text-2xl">
                                        {p.icon}
                                    </span>
                                    <ArrowIcon />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                    {p.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                                    {p.description}
                                </p>
                            </>
                        );
                        return p.internal ? (
                            <Link key={i} href={p.href} className={cardClass}>
                                {inner}
                            </Link>
                        ) : (
                            <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                                {inner}
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
