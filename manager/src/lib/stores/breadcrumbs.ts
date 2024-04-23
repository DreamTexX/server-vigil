import type { BreadcrumbItemProps } from "flowbite-svelte/BreadcrumbItem.svelte";
import { writable } from "svelte/store";

export const BREADCRUMBS_STORE = writable<Array<BreadcrumbItemProps | { label: string }>>([]);
