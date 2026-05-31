import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Video Generator — plus.",
    description:
        "Text-to-Video generation for seamless integration and engaging multimedia content. Create professional videos in minutes, not days.",
    openGraph: {
        title: "AI Video Generator — plus.",
        description:
            "Text-to-Video generation for seamless integration and engaging multimedia content. Create professional videos in minutes, not days.",
        type: "website",
        url: "https://www.plusthe.site/ai-video-generator",
    },
    alternates: {
        canonical: "https://www.plusthe.site/ai-video-generator",
    },
};

export default function AiVideoGeneratorLayout({
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
                        "name": "AI Video Generator",
                        "description": "Text-to-Video generation for seamless integration and engaging multimedia content. Create professional videos in minutes, not days.",
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
