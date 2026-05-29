"use client";

import ProductPageTemplate from "@/components/ProductPageTemplate";

const featureIcons = ["📱", "🔔", "📡", "⚡", "🔒", "📊"];
const avatars = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80&auto=format",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80&auto=format",
];

export default function MobileAppPage() {
    return (
        <ProductPageTemplate
            pageKey="mobileAppPage"
            featureIcons={featureIcons}
            avatars={avatars}
            themeColors={{
                bgGradient: "from-violet-50 via-white to-fuchsia-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                badgeDotColor: "bg-violet-500",
                statsBg: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
            }}
        />
    );
}
