<script lang="ts">
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";

    let drawerHidden: boolean = true;
</script>

<Navbar bind:drawerHidden />
<div class="overflow-hidden lg:flex">
    <Sidebar bind:drawerHidden />
    <div class="relative h-full w-full overflow-y-auto lg:ml-64">
        <main class="m-auto max-w-screen-2xl p-4">
            <div class="mb-2 block lg:hidden">
                <Breadcrumbs />
            </div>
            <slot />
        </main>
    </div>
</div>
