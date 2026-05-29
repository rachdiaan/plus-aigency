"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["🎵", "🎸", "🎛️", "🎤", "🔊", "🔌"];
const avatars = [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80&auto=format",
];

export default function AIMusicGeneratorPage() {
    return (
        <ProductPageTemplate
            pageKey="aiMusicPage"
            featureIcons={featureIcons}
            avatars={avatars}
            themeColors={{
                bgGradient: "from-purple-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                badgeDotColor: "bg-purple-500",
                statsBg: "bg-gradient-to-r from-purple-600 to-indigo-600",
            }}
        />
    );
}
