import { derived, type Readable } from "svelte/store";
import { dictionaryStore } from "./dictionary.store";
import { langStore } from "./lang.store";

export const I18N_STORE_CONTEXT_KEY = "I18N";

export type I18nStoreValue = (...keys: Array<string>) => string;
export type I18nStore = Readable<I18nStoreValue>;

export const _: I18nStore = derived([langStore, dictionaryStore], ([_, $dictionary]) => {
    return (...keys: Array<string>): string => {
        if (!$dictionary) return "";
        let level = $dictionary;
        for (const key of keys) {
            if (typeof level === "object" && Object.keys(level).includes(key)) {
                level = level[key];
            }
        }

        if (typeof level === "string") {
            return level;
        }

        return `Translation for "${keys.join(".")}" not found!`;
    };
});
