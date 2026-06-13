"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";

export default function BlogSection() {
    const ref = useScrollReveal();

    const latest = [...articles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section id="blog" className="py-24 lg:py-32 bg-section-alt bg-grid">
            <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="fade-up inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        From Our Blog
                    </span>
                    <h2 className="fade-up fade-up-delay-1 mt-5 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        Insight AI &amp; Digital Growth
                    </h2>
                    <p className="fade-up fade-up-delay-2 mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                        Tips, strategi, dan tren terbaru seputar AI, digital marketing, dan pertumbuhan bisnis — ditulis untuk membantu Anda mengambil keputusan yang lebih baik.
                    </p>
                </div>

                <div className="fade-up fade-up-delay-3 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="feature-card group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] transition-colors"
                        >
                            <div className="relative h-44 w-full overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    unoptimized
                                />
                                <span className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-[#0B1120]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                                    {article.category}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-base font-bold leading-snug text-[#0F172A] dark:text-[#F8FAFC] line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] line-clamp-3">
                                    {article.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                    <span>
                                        {new Date(article.date).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span>{article.readTime} baca</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="fade-up fade-up-delay-3 mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-105 hover:bg-primary hover:text-white"
                    >
                        Lihat Semua Artikel
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
