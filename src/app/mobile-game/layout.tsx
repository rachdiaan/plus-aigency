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
        url: "https://plusthe.site/mobile-game",
    },
};

export default function MobileGameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
