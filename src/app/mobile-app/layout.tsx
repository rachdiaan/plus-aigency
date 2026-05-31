import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile App Development — plus.",
    description:
        "Beautiful, performant mobile apps that users love. From concept to App Store — we handle the entire journey.",
    openGraph: {
        title: "Mobile App Development — plus.",
        description:
            "Beautiful, performant mobile apps that users love. From concept to App Store — we handle the entire journey.",
        type: "website",
        url: "https://www.plusthe.site/mobile-app",
    },
    alternates: {
        canonical: "https://www.plusthe.site/mobile-app",
    },
};

export default function MobileAppLayout({
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
                        "name": "Mobile App Development",
                        "description": "Beautiful, performant mobile apps that users love. From concept to App Store — we handle the entire journey.",
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
