import { getLangStore } from "$lib/stores/lang.store";
import { get } from "svelte/store";

export function localizeUrl(path: string): string {
    return `/${get(getLangStore())}/${path.startsWith("/") ? path.substring(1) : path}`;
}
