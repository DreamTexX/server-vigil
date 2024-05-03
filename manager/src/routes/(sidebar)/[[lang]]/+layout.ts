import { SupportedLangs } from "$lib/stores/lang.store.js";
import { redirect } from "@sveltejs/kit";

export function load({ params, url }) {
    if (!params.lang || !Object.keys(SupportedLangs).includes(params.lang)) {
        throw redirect(303, "/en-US" + url.pathname);
    }
}
