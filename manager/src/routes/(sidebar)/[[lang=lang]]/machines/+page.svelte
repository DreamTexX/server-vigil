<script lang="ts">
    import MachineCard from "$lib/components/machines/MachineCard.svelte";
    import NoContent from "$lib/components/NoContent.svelte";
    import CreateDrawer from "$lib/components/machines/CreateDrawer.svelte";
    import { onMount, onDestroy } from "svelte";
    import type { Measurement } from "$lib/server/schema";
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";
    import { _ } from "$lib/stores/i18n.store";

    getBreadcrumbsStore().set([
        { label: $_("navigation.main.breadcrumbs.home"), href: "/" },
        { label: $_("navigation.main.breadcrumbs.machines") }
    ]);

    export let data;
    export let form;
    let eventSource: EventSource | undefined;
    let measurements: Record<string, Measurement> = {};

    let createDialogOpen = false;
    function openCreateDialog() {
        form = null;
        createDialogOpen = true;
    }

    onMount(() => {
        data.item.measurements.forEach((measurement) => {
            measurements[measurement.machineId] = measurement;
        });
        eventSource = new EventSource("/api/v1/measurements/subscribe");
        eventSource.onmessage = (event: MessageEvent) => {
            const data: Measurement = JSON.parse(event.data);
            measurements[data.machineId] = {
                ...data,
                createdAt: new Date(data.createdAt)
            };
        };
    });
    onDestroy(() => {
        eventSource?.close();
    });
</script>

<CreateDrawer bind:open={createDialogOpen} bind:form />

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium">
        {$_("pages.machines.title")}
    </h1>
    <button class="btn btn-primary" on:click={openCreateDialog}>
        {$_("pages.machines.addNewMachine")}
    </button>
</div>

{#if data.item.machines.length > 0}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each data.item.machines as machine (machine.id)}
            <MachineCard {machine} measurement={measurements[machine.id]} />
        {/each}
        <div></div>
        <div></div>
        <div></div>
    </div>
{:else}
    <NoContent buttonName={$_("pages.machines.addNewMachine")} />
{/if}
