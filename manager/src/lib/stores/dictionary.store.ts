import { writable, type Writable } from "svelte/store";
import type { LangStoreValue } from "./lang.store";

export const DICTIONARY_STORE_CONTEXT_KEY = "DICTIONARY";

type Nested =
    | {
          [key: string]: Nested | string;
      }
    | string;
export type DictionaryStoreValue = Nested;
export type DictionaryStore = Writable<DictionaryStoreValue>;

export const dictionaryStore: DictionaryStore = writable<DictionaryStoreValue>({});

export async function loadSupportedDictionary(lang: LangStoreValue): Promise<DictionaryStoreValue> {
    switch (lang) {
        case "de-DE":
            return import("$lib/assets/translations/de-DE.json");
        case "fr-FR":
            return import("$lib/assets/translations/fr-FR.json");
        case "de-GANS":
            return import("$lib/assets/translations/de-GANS.json");
        case "en-US":
            return import("$lib/assets/translations/en-US.json");
        case "de-GAY":
            return import("$lib/assets/translations/de-GAY.json");
    }
}
