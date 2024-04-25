<script lang="ts">
    import X from "$lib/assets/icons/X.svelte";

    export let open: boolean = false;
    export let title: string | undefined = undefined;

    const closeDrawer = () => {
        open = false;
    };
</script>

<aside
    class:hidden={!open}
    class="fixed inset-0 z-50 float-right ml-auto h-full max-w-screen-sm w-full overflow-y-auto bg-base-100"
>
    <header class="flex gap-1 bg-base-200 px-8 py-4 items-center">
        <h5 class="w-full text-lg font-semibold">
            {title ?? ""}
        </h5>
        <button class="btn btn-ghost btn-sm" on:click={closeDrawer}>
            <X />
        </button>
    </header>
    <main class="px-8 py-4">
        <slot></slot>
    </main>
</aside>

<div
    class:hidden={!open}
    class="fixed inset-0 z-40 bg-black/50"
    on:click={closeDrawer}
    on:keydown={closeDrawer}
    role="presentation"
/>
