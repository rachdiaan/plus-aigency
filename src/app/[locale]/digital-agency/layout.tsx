import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";

const SITE = "https://plusthe.site";

const meta = {
    en: {
        title: "Digital Agency — Branding & Digital Strategy | plus.",
        description:
            "Full-service digital agency: branding, storytelling, content, UI/UX, and AI-powered marketing strategy. Build your brand's digital presence with plus.",
        keywords: ["digital agency", "branding agency", "digital marketing strategy", "UI UX design", "creative agency", "content marketing"],
    },
    id: {
        title: "Digital Agency Indonesia — Branding & Strategi Digital | plus.",
        description:
            "Full-service digital agency: branding, storytelling, konten, UI/UX, dan strategi marketing berbasis AI. Bangun kehadiran digital brand Anda bersama plus.",
        keywords: ["digital agency Indonesia", "jasa branding", "agensi digital", "strategi digital marketing", "jasa desain UI UX", "creative agency Indonesia"],
    },
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const loc = isLocale(locale) ? locale : defaultLocale;
    const m = meta[loc];
    return {
        title: m.title,
        description: m.description,
        keywords: m.keywords,
        alternates: {
            canonical: `${SITE}/${loc}/digital-agency`,
            languages: {
                en: `${SITE}/en/digital-agency`,
                id: `${SITE}/id/digital-agency`,
                "x-default": `${SITE}/en/digital-agency`,
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            type: "website",
            url: `${SITE}/${loc}/digital-agency`,
            locale: loc === "id" ? "id_ID" : "en_US",
        },
        twitter: { card: "summary_large_image", title: m.title, description: m.description },
    };
}

export default function DigitalAgencyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
