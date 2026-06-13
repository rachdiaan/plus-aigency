import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";

const SITE = "https://plusthe.site";

const meta = {
    en: {
        title: "Mobile Game Development — Android & iOS | plus.",
        description:
            "Professional mobile game development for Android & iOS: from concept to launch. Cross-platform, multiplayer, and live ops powered by Unity & Unreal Engine.",
        keywords: ["mobile game development", "Android game developer", "iOS game development", "Unity game studio", "cross-platform games", "game studio"],
    },
    id: {
        title: "Jasa Pembuatan Game Mobile — Android & iOS | plus.",
        description:
            "Jasa pengembangan game mobile profesional untuk Android & iOS: dari konsep hingga rilis. Cross-platform, multiplayer, dan live ops dengan Unity & Unreal Engine.",
        keywords: ["jasa pembuatan game mobile", "pengembangan game Android", "game development Indonesia", "jasa bikin game iOS", "Unity game developer", "mobile game studio"],
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
            canonical: `${SITE}/${loc}/mobile-game`,
            languages: {
                en: `${SITE}/en/mobile-game`,
                id: `${SITE}/id/mobile-game`,
                "x-default": `${SITE}/en/mobile-game`,
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            type: "website",
            url: `${SITE}/${loc}/mobile-game`,
            locale: loc === "id" ? "id_ID" : "en_US",
        },
        twitter: { card: "summary_large_image", title: m.title, description: m.description },
    };
}

export default function MobileGameLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
