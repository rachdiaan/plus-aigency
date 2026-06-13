import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jasa Pembuatan Game Mobile — Android & iOS | plus.",
    description:
        "Jasa pengembangan game mobile profesional untuk Android & iOS: dari konsep hingga rilis. Cross-platform, multiplayer, dan live ops dengan Unity & Unreal Engine.",
    keywords: [
        "jasa pembuatan game mobile",
        "pengembangan game Android",
        "game development Indonesia",
        "jasa bikin game iOS",
        "Unity game developer",
        "mobile game studio",
    ],
    alternates: {
        canonical: "https://plusthe.site/mobile-game",
    },
    openGraph: {
        title: "Jasa Pembuatan Game Mobile — Android & iOS | plus.",
        description:
            "Jasa pengembangan game mobile profesional untuk Android & iOS: dari konsep hingga rilis dengan Unity & Unreal Engine.",
        type: "website",
        url: "https://plusthe.site/mobile-game",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jasa Pembuatan Game Mobile — Android & iOS | plus.",
        description:
            "Jasa pengembangan game mobile profesional untuk Android & iOS, dari konsep hingga rilis.",
    },
};

export default function MobileGameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
