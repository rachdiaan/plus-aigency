import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Text Generator — plus.",
    description:
        "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
    openGraph: {
        title: "AI Text Generator — plus.",
        description:
            "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
        type: "website",
        url: "https://www.plusthe.site/ai-text-generator",
    },
    alternates: {
        canonical: "https://www.plusthe.site/ai-text-generator",
    },
};

export default function AiTextGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "AI Text Generator",
                        "description": "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
                        "brand": {
                            "@type": "Brand",
                            "name": "plus."
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": "20",
                            "highPrice": "500",
                            "offerCount": "3"
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
