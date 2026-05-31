import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.plusthe.site";
    const routes = [
        "",
        "/chat-bot",
        "/studio",
        "/digital-agency",
        "/mobile-game",
        "/customer-support",
        "/mobile-app",
        "/crm",
        "/ai-image-generator",
        "/ai-text-generator",
        "/ai-video-generator",
        "/ai-music-generator",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
    }));
}
