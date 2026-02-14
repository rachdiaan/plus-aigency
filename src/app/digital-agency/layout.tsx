import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Digital Agency — plus.",
    description:
        "Innovative minds delivering branding, storytelling, and content daily. We craft & enhance your digital presence.",
    openGraph: {
        title: "Digital Agency — plus.",
        description:
            "Innovative minds delivering branding, storytelling, and content daily.",
        type: "website",
        url: "https://plusthe.site/digital-agency",
    },
};

export default function DigitalAgencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
