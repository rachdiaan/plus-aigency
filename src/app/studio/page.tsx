import StudioApp from "./components/StudioApp";

export const metadata = {
    title: "PLUS Pro Studio | AI Marketing Dashboard",
    description: "All-in-one AI Marketing Platform for UMKM & Enterprises.",
    openGraph: {
        title: "PLUS Pro Studio | AI Marketing Dashboard",
        description: "All-in-one AI Marketing Platform for UMKM & Enterprises.",
        type: "website",
        url: "https://www.plusthe.site/studio",
    },
    alternates: {
        canonical: "https://www.plusthe.site/studio",
    },
};

export default function Page() {
    return <StudioApp />;
}
