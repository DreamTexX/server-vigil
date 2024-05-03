import { type Readable } from "svelte/store";
import { useReadableContext } from "./index";

export const LANG_STORE_CONTEXT_KEY = "LANG";

export enum SupportedLangs {
    "en-US" = "English",
    "de-DE" = "German"
}
export type LangStoreValue = keyof typeof SupportedLangs;
export type LangStore = Readable<LangStoreValue>;

/*
function createLangStore(): LangStore {
    const lang = browser ? <LangStoreValue>localStorage.getItem("lang") ?? "en-US" : "en-US";
    const { set: _set, update, subscribe } = writable<LangStoreValue>(lang);

    function set(new_val: LangStoreValue) {
        _set(new_val);
        localStorage.setItem("lang", new_val);
    }

    return {
        set,
        update,
        subscribe
    };
}
*/

export function getLangStore(lang?: LangStoreValue): LangStore {
    return useReadableContext<LangStoreValue>(LANG_STORE_CONTEXT_KEY, lang ?? "en-US");
}
