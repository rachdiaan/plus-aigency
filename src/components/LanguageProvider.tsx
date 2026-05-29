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

/* ── Provider ── */
export default function LanguageProvider({ children }: { children: ReactNode }) {
    // Start with "en" default to avoid server/client hydration mismatch
    const [language, setLanguageState] = useState<Language>("en");

    // Load language preference from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("plus-language") as Language | null;
        if (stored === "en" || stored === "id") {
            setLanguageState(stored);
        }
    }, []);

    // Sync HTML lang attribute whenever language changes
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = language;
        }
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("plus-language", lang);
    };

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    };

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
