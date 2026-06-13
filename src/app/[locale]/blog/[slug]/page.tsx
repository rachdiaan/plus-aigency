import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

const SITE = "https://plusthe.site";

export const dynamicParams = false;

export function generateStaticParams() {
    return articles.map((article) => ({ locale: article.locale ?? "id", slug: article.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return { title: "404 — plus." };
    }

    return {
        title: `${article.title} — plus. Blog`,
        description: article.description,
        keywords: article.tags,
        alternates: {
            canonical: `${SITE}/${locale}/blog/${article.slug}`,
            languages: {
                en: `${SITE}/en/blog/${article.slug}`,
                id: `${SITE}/id/blog/${article.slug}`,
                "x-default": `${SITE}/en/blog/${article.slug}`,
            },
        },
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            url: `${SITE}/${locale}/blog/${article.slug}`,
            publishedTime: article.date,
            tags: article.tags,
            images: [{ url: article.image }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
            images: [article.image],
        },
    };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
    const t = getDictionary(locale);
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const related = articles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    const articleUrl = `${SITE}/${locale}/blog/${article.slug}`;
    const dateLocale = locale === "id" ? "id-ID" : "en-US";

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: locale === "id" ? "id-ID" : "en-US",
        author: { "@type": "Organization", name: "plus.", url: SITE },
        publisher: {
            "@type": "Organization",
            name: "plus.",
            logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        keywords: article.tags.join(", "),
        articleSection: article.category,
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: t.nav.home, item: `${SITE}/${locale}` },
            { "@type": "ListItem", position: 2, name: t.nav.blog, item: `${SITE}/${locale}/blog` },
            { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main className="bg-background pt-32 pb-24">
                <article className="mx-auto max-w-3xl px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                        <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">
                            {t.nav.blog}
                        </Link>
                        <span>/</span>
                        <span className="text-primary">{article.category}</span>
                    </nav>

                    {/* Header */}
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        {article.category}
                    </span>
                    <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#0F172A] dark:text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                        {article.title}
                    </h1>
                    <div className="mt-5 flex items-center gap-4 text-sm text-[#64748B] dark:text-[#94A3B8]">
                        <span>
                            {new Date(article.date).toLocaleDateString(dateLocale, {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <span>•</span>
                        <span>{article.readTime} {t.blog.readSuffix}</span>
                    </div>

                    {/* Cover image */}
                    <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-96">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            unoptimized
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="article-content mt-10 text-[#334155] dark:text-[#CBD5E1]"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 dark:border-[#1E293B] pt-8">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-slate-100 dark:bg-[#1E293B] px-3 py-1 text-xs font-medium text-[#475569] dark:text-[#94A3B8]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            {t.blog.ctaTitle}
                        </h3>
                        <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                            {t.blog.ctaDescription}
                        </p>
                        <Link
                            href={`/${locale}#pricing`}
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary-dark"
                        >
                            {t.blog.ctaButton}
                        </Link>
                    </div>

                    {/* Related articles */}
                    {related.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                {t.blog.relatedTitle}
                            </h3>
                            <div className="mt-6 grid gap-6 sm:grid-cols-3">
                                {related.map((a) => (
                                    <Link
                                        key={a.id}
                                        href={`/${locale}/blog/${a.slug}`}
                                        className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#0B1120] transition-colors hover:border-primary/30"
                                    >
                                        <div className="relative h-32 w-full overflow-hidden">
                                            <Image
                                                src={a.image}
                                                alt={a.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-sm font-semibold leading-snug text-[#0F172A] dark:text-[#F8FAFC] line-clamp-2">
                                                {a.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back link */}
                    <div className="mt-12">
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            {t.blog.backToBlog}
                        </Link>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}
