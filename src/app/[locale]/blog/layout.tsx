import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale } from "@/i18n/config";

const SITE = "https://plusthe.site";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const loc = isLocale(locale) ? locale : defaultLocale;
    const t = getDictionary(loc);

    return {
        title: `${t.blog.title} — plus.`,
        description: t.blog.description,
        alternates: {
            canonical: `${SITE}/${loc}/blog`,
            languages: {
                en: `${SITE}/en/blog`,
                id: `${SITE}/id/blog`,
                "x-default": `${SITE}/en/blog`,
            },
        },
        openGraph: {
            title: `${t.blog.title} — plus.`,
            description: t.blog.description,
            type: "website",
            url: `${SITE}/${loc}/blog`,
        },
    };
}

export default async function BlogLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const loc = isLocale(locale) ? locale : defaultLocale;
    const t = getDictionary(loc);

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${t.blog.title} — plus.`,
        description: t.blog.description,
        url: `${SITE}/${loc}/blog`,
        inLanguage: loc === "id" ? "id-ID" : "en-US",
        publisher: {
            "@type": "Organization",
            name: "plus.",
            logo: {
                "@type": "ImageObject",
                url: `${SITE}/favicon.png`,
            },
        },
        blogPost: articles.map((article) => ({
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            url: `${SITE}/${loc}/blog/${article.slug}`,
            datePublished: article.date,
            image: article.image,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            {children}
        </>
    );
}
