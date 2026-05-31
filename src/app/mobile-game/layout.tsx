import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile Game Development — plus.",
    description:
        "Engaging mobile game development that captivates players. From concept to launch, we build immersive gaming experiences.",
    openGraph: {
        title: "Mobile Game Development — plus.",
        description:
            "Engaging mobile game development that captivates players.",
        type: "website",
        url: "https://www.plusthe.site/mobile-game",
    },
    alternates: {
        canonical: "https://www.plusthe.site/mobile-game",
    },
};

export default function MobileGameLayout({
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
                        "name": "Mobile Game",
                        "description": "Engaging mobile game development that captivates players. From concept to launch, we build immersive gaming experiences.",
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
