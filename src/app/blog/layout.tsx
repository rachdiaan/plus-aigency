import type { Metadata } from "next";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
    title: "Blog — plus. | Insight AI, Digital Marketing & Bisnis",
    description:
        "Kumpulan artikel seputar AI, digital agency, mobile app, CRM, dan digital marketing untuk membantu bisnis Indonesia tumbuh lebih cepat.",
    alternates: {
        canonical: "https://plusthe.site/blog",
    },
    openGraph: {
        title: "Blog — plus.",
        description:
            "Insight seputar AI, digital agency, mobile app, CRM, dan digital marketing untuk bisnis Indonesia.",
        type: "website",
        url: "https://plusthe.site/blog",
    },
};

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog plus.",
    description:
        "Insight seputar AI, digital agency, mobile app, CRM, dan digital marketing untuk bisnis Indonesia.",
    url: "https://plusthe.site/blog",
    publisher: {
        "@type": "Organization",
        name: "plus.",
        logo: {
            "@type": "ImageObject",
            url: "https://plusthe.site/favicon.png",
        },
    },
    blogPost: articles.map((article) => ({
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        url: `https://plusthe.site/blog/${article.slug}`,
        datePublished: article.date,
        image: article.image,
    })),
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
