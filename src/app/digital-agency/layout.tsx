import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Agency Indonesia — Branding & Strategi Digital | plus.",
    description:
        "Full-service digital agency Indonesia: branding, storytelling, konten, UI/UX, dan strategi marketing berbasis AI. Bangun kehadiran digital brand Anda bersama plus.",
    keywords: [
        "digital agency Indonesia",
        "jasa branding",
        "agensi digital",
        "strategi digital marketing",
        "jasa desain UI UX",
        "creative agency Indonesia",
    ],
    alternates: {
        canonical: "https://plusthe.site/digital-agency",
    },
    openGraph: {
        title: "Digital Agency Indonesia — Branding & Strategi Digital | plus.",
        description:
            "Full-service digital agency Indonesia: branding, storytelling, konten, dan strategi marketing berbasis AI.",
        type: "website",
        url: "https://plusthe.site/digital-agency",
    },
    twitter: {
        card: "summary_large_image",
        title: "Digital Agency Indonesia — Branding & Strategi Digital | plus.",
        description:
            "Full-service digital agency Indonesia: branding, konten, dan strategi marketing berbasis AI.",
    },
};

export default function DigitalAgencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
