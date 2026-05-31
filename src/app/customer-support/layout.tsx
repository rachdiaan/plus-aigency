import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customer Support — plus.",
    description:
        "Smarter decisions, faster resolutions, happier customers. AI-powered support platform that scales with your business.",
    openGraph: {
        title: "Customer Support — plus.",
        description:
            "Smarter decisions, faster resolutions, happier customers. AI-powered support platform that scales with your business.",
        type: "website",
        url: "https://www.plusthe.site/customer-support",
    },
    alternates: {
        canonical: "https://www.plusthe.site/customer-support",
    },
};

export default function CustomerSupportLayout({
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
                        "name": "Customer Support",
                        "description": "Smarter decisions, faster resolutions, happier customers. AI-powered support platform that scales with your business.",
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
