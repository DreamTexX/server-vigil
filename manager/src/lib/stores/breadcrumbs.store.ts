import type { Writable } from "svelte/store";
import { useWritableContext } from "./index";

export const LANG_STORE_CONTEXT_KEY = "BREADCRUMBS";

export interface Breadcrumb {
    label: string;
    href?: string;
}
export type LangStoreValue = Array<Breadcrumb>;
export type LangStore = Writable<LangStoreValue>;

export function getBreadcrumbsStore(): LangStore {
    return useWritableContext<LangStoreValue>(LANG_STORE_CONTEXT_KEY, []);
}
