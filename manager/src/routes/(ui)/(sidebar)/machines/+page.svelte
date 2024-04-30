<script lang="ts">
    import MachineCard from "$lib/components/machines/MachineCard.svelte";
    import NoContent from "$lib/components/NoContent.svelte";
    import CreateDrawer from "$lib/components/machines/CreateDrawer.svelte";
    import { onMount, onDestroy, getContext } from "svelte";
    import type { Measurement } from "$lib/server/schema";
    import type { Writable } from "svelte/store";

    getContext<Writable<Breadcrumbs>>("breadcrumbs").set([{ label: "Home", href: "/" }, { label: "Machines" }]);

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
    <h1 class="text-2xl font-medium">Overview Machines</h1>
    <button class="btn btn-primary" on:click={openCreateDialog}>Add new Machine</button>
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
    <NoContent buttonName="Add new Machine" />
{/if}
