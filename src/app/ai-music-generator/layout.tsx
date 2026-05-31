import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Music Generator — plus.",
    description:
        "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
    openGraph: {
        title: "AI Music Generator — plus.",
        description:
            "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
        type: "website",
        url: "https://www.plusthe.site/ai-music-generator",
    },
    alternates: {
        canonical: "https://www.plusthe.site/ai-music-generator",
    },
};

export default function AiMusicGeneratorLayout({
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
                        "name": "AI Music Generator",
                        "description": "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
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
