import { writable, type Writable } from "svelte/store";

export const LANG_STORE_CONTEXT_KEY = "LANG";

export enum SupportedLangs {
    "en-US" = "English",
    "de-DE" = "German",
    "fr-FR" = "French",
    "gans-GANS" = "Gans (sarcastic)"
}
export type LangStoreValue = keyof typeof SupportedLangs;
export type LangStore = Writable<LangStoreValue>;

export const langStore: LangStore = writable<LangStoreValue>("en-US");
