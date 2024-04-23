<script lang="ts">
    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";

    let drawerHidden = false;
</script>

<header
    class="sticky top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
    <Navbar bind:drawerHidden />
</header>
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
