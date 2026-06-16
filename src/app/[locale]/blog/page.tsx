import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogFilters from "./BlogFilters";
import { articles } from "@/data/articles";
import { getPublishedPosts } from "@/lib/posts";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

const ALL = "__all__";

export default async function BlogPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string }>;
}) {
    const { locale: rawLocale } = await params;
    const { category } = await searchParams;
    const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
    const t = getDictionary(locale);
    const dateLocale = locale === "id" ? "id-ID" : "en-US";
    const activeCategory = category ?? ALL;

    // Static articles + live CMS posts (from Supabase), merged
    const staticArticles = articles.filter((a) => (a.locale ?? "id") === locale);
    const dbPosts = await getPublishedPosts(locale);
    const localeArticles = [...staticArticles, ...dbPosts];

    const filtered =
        activeCategory === ALL
            ? localeArticles
            : localeArticles.filter((a) => a.category === activeCategory);

    const sorted = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const uniqueCategories = Array.from(new Set(localeArticles.map((a) => a.category)));
    const categories = [
        { value: ALL, label: t.blog.all },
        ...uniqueCategories.map((c) => ({ value: c, label: c })),
    ];

    return (
        <>
            <Navbar />
            <main className="bg-background pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header */}
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                            {t.blog.tag}
                        </span>
                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-5xl">
                            {t.blog.title}
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                            {t.blog.description}
                        </p>
                    </div>

                    {/* Category filter (client component) */}
                    <BlogFilters
                        categories={categories}
                        activeCategory={activeCategory}
                    />

                    {/* Article grid */}
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sorted.map((article) => (
                            <Link
                                key={article.id}
                                href={`/${locale}/blog/${article.slug}`}
                                className="feature-card group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] transition-colors"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <span className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-[#0B1120]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <h2 className="text-base font-bold leading-snug text-[#0F172A] dark:text-[#F8FAFC] line-clamp-2">
                                        {article.title}
                                    </h2>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                        <span>
                                            {new Date(article.date).toLocaleDateString(dateLocale, {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span>{article.readTime} {t.blog.readSuffix}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {sorted.length === 0 && (
                        <p className="mt-14 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
                            {t.blog.empty}
                        </p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
