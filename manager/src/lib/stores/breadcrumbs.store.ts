import type { Writable } from "svelte/store";
import { useWritableContext } from "./index";

export const LANG_STORE_CONTEXT_KEY = "BREADCRUMBS";

export interface Breadcrumb {
    label: string;
    href?: string;
}
export type BreadcrumbStoreValue = Array<Breadcrumb>;
export type BreadcrumbStore = Writable<BreadcrumbStoreValue>;

export function getBreadcrumbsStore(): BreadcrumbStore {
    return useWritableContext<BreadcrumbStoreValue>(LANG_STORE_CONTEXT_KEY, []);
}
