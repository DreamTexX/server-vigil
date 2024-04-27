<script lang="ts">
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import Logo from "$lib/assets/Logo.svelte";
    import ThemeSwitch from "./ThemeSwitch.svelte";

    export let drawerHidden: boolean;
</script>

<nav class="navbar sticky top-0 z-40 border-b border-base-300 bg-base-100">
    <button
        class="btn btn-ghost flex-none lg:hidden"
        on:click={() => (drawerHidden = !drawerHidden)}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="inline-block h-5 w-5"
        >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    </button>
    <div class="flex-none px-4 lg:w-64">
        <div class="flex">
            <Logo class="me-2.5 h-8 sm:h-10" />
            <span class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
                ServerVigil
            </span>
        </div>
    </div>
    <div class="flex-1 px-4">
        <div class="hidden lg:block">
            <Breadcrumbs />
        </div>
    </div>
    <div class="flex-none">
        <ThemeSwitch />
    </div>
</nav>
