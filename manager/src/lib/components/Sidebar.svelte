<script lang="ts">
    import { page } from "$app/stores";
    import ShieldIcon from "lucide-svelte/icons/shield";
    import ServerIcon from "lucide-svelte/icons/server";
    import SlidersIcon from "lucide-svelte/icons/sliders-vertical";
    import { localizeUrl } from "./intl/url-builder";
    import LangSwitch from "./LangSwitch.svelte";
    import { _ } from "../stores/i18n.store";

    export let drawerHidden: boolean = true;

    const closeDrawer = () => {
        drawerHidden = true;
    };

    let items = [
        { name: $_("navigation.sidebar.dashboard"), href: "/", icon: ShieldIcon },
        { name: $_("navigation.sidebar.machines"), href: "/machines", icon: ServerIcon },
        { name: $_("navigation.sidebar.settings"), href: "/settings", icon: SlidersIcon }
    ];
</script>

<aside
    class:hidden={drawerHidden}
    class="menu fixed inset-0 z-30 flex h-full w-64 flex-col justify-between border-r border-base-300 bg-base-100 pt-20 lg:flex lg:overflow-y-visible"
>
    <ul class="w-full">
        {#each items as { name, icon, href } (name)}
            {@const localizedHref = localizeUrl(href)}
            <li class="mb-1">
                <a
                    href={localizedHref}
                    class:active={$page.url.pathname === localizedHref}
                    class="gap-3"
                >
                    <svelte:component this={icon} size={22} strokeWidth={1.5} />
                    {name}
                </a>
            </li>
        {/each}
    </ul>
    <div class="block sm:hidden">
        <LangSwitch />
    </div>
</aside>

<div
    class:hidden={drawerHidden}
    class="fixed inset-0 z-20 bg-black/50 lg:hidden"
    on:click={closeDrawer}
    on:keydown={closeDrawer}
    role="presentation"
/>
