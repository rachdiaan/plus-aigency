"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["✍️", "📝", "🔎", "🌐", "🎯", "🔌"];
const avatars = [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format",
];

export default function AITextGeneratorPage() {
    return (
        <ProductPageTemplate
            pageKey="aiTextPage"
            featureIcons={featureIcons}
            avatars={avatars}
            themeColors={{
                bgGradient: "from-amber-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                badgeDotColor: "bg-amber-500",
                statsBg: "bg-gradient-to-r from-amber-600 to-orange-600",
            }}
        />
    );
}
