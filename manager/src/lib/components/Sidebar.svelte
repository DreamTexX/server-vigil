<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/stores";
    import Home from "$lib/assets/icons/Home.svelte";
    import Server from "$lib/assets/icons/Server.svelte";

    export let drawerHidden: boolean = true;

    const closeDrawer = () => {
        drawerHidden = true;
    };

    $: mainSidebarUrl = $page.url.pathname;
    let activeMainSidebar: string;

    afterNavigate((navigation) => {
        activeMainSidebar = navigation.to?.url.pathname ?? "/";
    });

    let items = [
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Machines", href: "/machines", icon: Server }
    ];
</script>

<aside>
    <h4 class="sr-only">Main menu</h4>
    <ul
        class:hidden={drawerHidden}
        class="menu fixed inset-0 z-30 h-full w-64 border-r border-base-300 bg-base-100 pt-20 lg:block lg:h-auto lg:overflow-y-visible"
    >
        {#each items as { name, icon, href } (name)}
            <li>
                <a {href} class:active={mainSidebarUrl === href}>
                    <svelte:component this={icon} />
                    {name}
                </a>
            </li>
        {/each}
    </ul>
</aside>

<div
    class:hidden={drawerHidden}
    class="fixed inset-0 z-20 bg-gray-900/50"
    on:click={closeDrawer}
    on:keydown={closeDrawer}
    role="presentation"
/>
