import { DEFAULT_LANG, type LangStoreValue } from "$lib/stores/lang.store.js";
import { loadSupportedDictionary } from "$lib/stores/dictionary.store.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params, url }) {
    if (!params.lang) {
        throw redirect(303, "/" + DEFAULT_LANG + url.pathname);
    }

    const dictionary = await loadSupportedDictionary(params.lang as LangStoreValue);
    return {
        dictionary
    };
}
