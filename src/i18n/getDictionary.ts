import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import id from "./dictionaries/id";

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale] ?? en;
}

export type { Dictionary };
