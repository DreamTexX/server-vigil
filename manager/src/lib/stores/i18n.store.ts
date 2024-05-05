import { dictionaryStore, type DictionaryStoreValue } from "./dictionary.store";
import { derived, type Readable } from "svelte/store";
import { langStore } from "./lang.store";

export const I18N_STORE_CONTEXT_KEY = "I18N";

export type I18nStoreValue = (key: string, data?: Record<string, string>) => string;
export type I18nStore = Readable<I18nStoreValue>;

function evaluate(
    key: string,
    dictionary: DictionaryStoreValue,
    data: Record<string, string>
): string {
    const keys = key.split(".");
    let level = dictionary;
    for (const key of keys) {
        if (typeof level === "object" && Object.keys(level).includes(key)) {
            level = level[key];
        }
    }

    if (typeof level === "string") {
        return replace(ref(level, dictionary, data), data);
    }

    return `Translation for "${key}" not found!`;
}

function replace(translation: string, dictionary: Record<string, string>): string {
    const patternStart = "${";
    const patternEnd = "}";
    let index = translation.indexOf(patternStart);
    while (index > 0) {
        const end = translation.indexOf(patternEnd, index);
        const item = dictionary[translation.substring(index + patternStart.length, end)];
        translation =
            translation.substring(0, index) + item + translation.substring(end + patternEnd.length);
        index = translation.indexOf(patternStart, index);
    }
    return translation;
}

function ref(
    translation: string,
    dictionary: DictionaryStoreValue,
    data: Record<string, string>
): string {
    const patternStart = "$ref{";
    const patternEnd = "}";
    let index = translation.indexOf(patternStart);
    while (index > -1) {
        const end = translation.indexOf(patternEnd, index);
        const key = translation.substring(index + patternStart.length, end);
        const item = evaluate(key, dictionary, data);
        translation =
            translation.substring(0, index) + item + translation.substring(end + patternEnd.length);
        index = translation.indexOf(patternStart, index);
    }
    return translation;
}

export const _: I18nStore = derived([langStore, dictionaryStore], ([_, $dictionary]) => {
    return (key: string, data: Record<string, string> = {}): string => {
        return evaluate(key, $dictionary, data);
    };
});
