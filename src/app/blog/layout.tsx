import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights & News — plus.",
    description:
        "Read the latest news, updates, and deep dives on AI, branding, CRM solutions, and digital growth from the plus. team.",
    openGraph: {
        title: "Insights & News — plus.",
        description:
            "Read the latest news, updates, and deep dives on AI, branding, CRM solutions, and digital growth from the plus. team.",
        type: "website",
        url: "https://www.plusthe.site/blog",
    },
    alternates: {
        canonical: "https://www.plusthe.site/blog",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
