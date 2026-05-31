import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM Platform — plus.",
    description:
        "AI-powered CRM that turns leads into loyal customers. Automate workflows, track every deal, and grow revenue predictably.",
    openGraph: {
        title: "CRM Platform — plus.",
        description:
            "AI-powered CRM that turns leads into loyal customers. Automate workflows, track every deal, and grow revenue predictably.",
        type: "website",
        url: "https://www.plusthe.site/crm",
    },
    alternates: {
        canonical: "https://www.plusthe.site/crm",
    },
};

export default function CrmLayout({
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
                        "name": "CRM Platform",
                        "description": "AI-powered CRM that turns leads into loyal customers. Automate workflows, track every deal, and grow revenue predictably.",
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
