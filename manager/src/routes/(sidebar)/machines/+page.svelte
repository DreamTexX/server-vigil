<script lang="ts">
    import MachineCard from "$lib/components/machines/MachineCard.svelte";
    import NoContent from "$lib/components/NoContent.svelte";
    import CreateDrawer from "$lib/components/machines/CreateDrawer.svelte";
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";

    BREADCRUMBS_STORE.set([{ label: "Home", href: "/" }, { label: "Machines" }]);

    export let data;
    export let form;

    let createDialogOpen = false;
    function openCreateDialog() {
        form = null;
        createDialogOpen = true;
    }
</script>

<CreateDrawer bind:open={createDialogOpen} bind:form />

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium">Overview Machines</h1>
    <button class="btn btn-primary" on:click={openCreateDialog}>
        Enroll new Machine
    </button>
</div>

{#if data.item.length > 0}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each data.item as machine (machine.id)}
            <MachineCard {machine} />
        {/each}
        <div></div>
        <div></div>
        <div></div>
    </div>
{:else}
    <NoContent buttonName="Enroll new Machine" />
{/if}
