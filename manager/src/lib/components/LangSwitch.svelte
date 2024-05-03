<script lang="ts">
    import { page } from "$app/stores";
    import { SupportedLangs, getLangStore, type LangStoreValue } from "$lib/stores/lang.store";

    let langStore = getLangStore();
    let keys: [LangStoreValue] = <[LangStoreValue]>Object.keys(SupportedLangs);

    function buildRoute(lang: LangStoreValue, current: string): string {
        let segments = current.substring(1).split("/");
        segments[0] = lang;
        return "/" + segments.join("/");
    }
</script>

<div class="dropdown dropdown-top sm:dropdown-end sm:dropdown-bottom max-sm:w-full">
    <div tabindex="0" role="button" class="btn btn-ghost max-sm:w-full">
        <span class="sm:hidden">Change Language:</span>
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
