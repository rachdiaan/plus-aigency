import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Image Generator — plus.",
    description:
        "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion, and Stability AI — 100+ models combined.",
    openGraph: {
        title: "AI Image Generator — plus.",
        description:
            "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion, and Stability AI — 100+ models combined.",
        type: "website",
        url: "https://www.plusthe.site/ai-image-generator",
    },
    alternates: {
        canonical: "https://www.plusthe.site/ai-image-generator",
    },
};

export default function AiImageGeneratorLayout({
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
                        "name": "AI Image Generator",
                        "description": "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion, and Stability AI — 100+ models combined.",
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
