import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "plus. — Global Digital AI-gency",
        short_name: "plus.",
        description:
            "One integrated platform for AI chatbots, branding, mobile apps, CRM, and digital marketing.",
        start_url: "/en",
        display: "standalone",
        background_color: "#0B1120",
        theme_color: "#0B1120",
        icons: [
            { src: "/favicon.png", sizes: "192x192", type: "image/png" },
            { src: "/favicon.png", sizes: "512x512", type: "image/png" },
        ],
    };
}
