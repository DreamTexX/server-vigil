<script lang="ts">
    import { page } from "$app/stores";
    import { _ } from "$lib/stores/i18n.store";
    import { SupportedLangs, langStore, type LangStoreValue } from "$lib/stores/lang.store";

    let keys: [LangStoreValue] = <[LangStoreValue]>Object.keys(SupportedLangs);

    function buildRoute(lang: LangStoreValue, current: string): string {
        let segments = current.substring(1).split("/");
        segments[0] = lang;
        return "/" + segments.join("/");
    }
</script>

<div class="dropdown dropdown-top sm:dropdown-end sm:dropdown-bottom max-sm:w-full">
    <div tabindex="0" role="button" class="btn btn-ghost max-sm:w-full">
        <span class="sm:hidden">{$_("components.langSwitch.changeLang")}:</span>
        <span>{SupportedLangs[$langStore]}</span>
    </div>
    <ul
        class="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow"
        data-sveltekit-reload
    >
        {#each keys as lang}
            <li>
                <a href={buildRoute(lang, $page.url.pathname)}>
                    {SupportedLangs[lang]}
                </a>
            </li>
        {/each}
    </ul>
</div>
