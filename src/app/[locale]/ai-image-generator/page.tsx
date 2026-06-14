"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["🖼️", "🎨", "🔍", "📦", "✂️", "🔌"];
const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80&auto=format",
];

export default function AIImageGeneratorPage() {
    return (
        <ProductPageTemplate
            pageKey="aiImagePage"
            featureIcons={featureIcons}
            avatars={avatars}
            themeColors={{
                bgGradient: "from-pink-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
                badgeDotColor: "bg-pink-500",
                statsBg: "bg-gradient-to-r from-pink-600 to-rose-600",
            }}
        />
    );
}
