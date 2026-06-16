import type { MetadataRoute } from "next";

const BASE_URL = "https://plusthe.site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/en/studio", "/id/studio", "/admin"],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
