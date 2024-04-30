import type { Writable } from "svelte/store";
import { useWritableContext } from "./index";

export const LANG_STORE_CONTEXT_KEY = "LANG";

export type LangStoreValue = "en-US" | "de-DE";
export type LangStore = Writable<LangStoreValue>;

export function getLangStore(): LangStore {
    return useWritableContext<LangStoreValue>(LANG_STORE_CONTEXT_KEY, "en-US");
}
