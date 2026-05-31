import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us — plus.",
    description:
        "Get in touch with our team for premium AI branding, CRM, and digital agency solutions. We are always ready to assist.",
    openGraph: {
        title: "Contact Us — plus.",
        description:
            "Get in touch with our team for premium AI branding, CRM, and digital agency solutions. We are always ready to assist.",
        type: "website",
        url: "https://www.plusthe.site/contact-us",
    },
    alternates: {
        canonical: "https://www.plusthe.site/contact-us",
    },
};

export default function ContactUsLayout({
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
                        "@type": "ContactPage",
                        "name": "Contact Us",
                        "description": "Get in touch with our team for premium AI branding, CRM, and digital agency solutions.",
                        "url": "https://www.plusthe.site/contact-us"
                    })
                }}
            />
            {children}
        </>
    );
}
