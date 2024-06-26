import { writable, type Writable } from "svelte/store";

export const LANG_STORE_CONTEXT_KEY = "LANG";

export enum SupportedLangs {
    "en-US" = "English",
    "de-DE" = "German",
    "fr-FR" = "French",
    "de-GANS" = "Gans (sarcastic)",
    "de-GAY" = "German Gay (sarcastic, plz don't cancel me)"
}
export const DEFAULT_LANG: LangStoreValue = "en-US";

export type LangStoreValue = keyof typeof SupportedLangs;
export type LangStore = Writable<LangStoreValue>;

export const langStore: LangStore = writable<LangStoreValue>(DEFAULT_LANG);
