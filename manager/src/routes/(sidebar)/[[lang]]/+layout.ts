import type { DictionaryStoreValue } from "$lib/stores/dictionary.store.js";
import { SupportedLangs } from "$lib/stores/lang.store.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params, url }) {
    if (!params.lang || !Object.keys(SupportedLangs).includes(params.lang)) {
        throw redirect(303, "/en-US" + url.pathname);
    }

    const dictionary = (
        await (() => {
            switch (params.lang) {
                case "de-DE":
                    return import("$lib/assets/translations/de-DE.json");
            }

            return import("$lib/assets/translations/en-US.json");
        })()
    ).default as DictionaryStoreValue;

    return {
        dictionary
    };
}
