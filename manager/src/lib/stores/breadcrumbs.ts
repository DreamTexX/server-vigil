import { writable } from "svelte/store";

export const BREADCRUMBS_STORE = writable<Array<{ label: string; href?: string }>>([]);
