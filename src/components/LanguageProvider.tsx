"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language } from "@/lib/translations";

/* ── Context ── */
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
    toggleLanguage: () => {},
});

/* ── Provider ──
 * Language is driven by the URL locale (`/en`, `/id`) passed in as
 * `initialLanguage` from the [locale] layout — the single source of truth,
 * in sync with the URL-based i18n + navbar language toggle. (Legacy
 * localStorage handling removed to avoid the two systems disagreeing.)
 */
export default function LanguageProvider({
    children,
    initialLanguage = "en",
}: {
    children: ReactNode;
    initialLanguage?: Language;
}) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    // Keep in sync when the route locale changes (e.g. navbar toggle).
    useEffect(() => {
        setLanguageState(initialLanguage);
    }, [initialLanguage]);

    const setLanguage = (lang: Language) => setLanguageState(lang);
    const toggleLanguage = () => setLanguage(language === "en" ? "id" : "en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

/* ── Hooks ── */
export function useLanguage() {
    return useContext(LanguageContext);
}

type TranslationKeys = typeof translations["en"];

export function useTranslation(): TranslationKeys {
    const { language } = useLanguage();
    return translations[language] as unknown as TranslationKeys;
}
