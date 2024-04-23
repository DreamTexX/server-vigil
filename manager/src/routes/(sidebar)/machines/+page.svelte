<script lang="ts">
    import MachineCard from "$lib/components/MachineCard.svelte";
    import type { Machine } from "$lib/components/MachineCard.svelte";
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";
    import { Button } from "flowbite-svelte";
    import { subSeconds, subMinutes, subHours } from "date-fns";

    BREADCRUMBS_STORE.set([{ label: "Home", home: true, href: "/" }, { label: "Machines" }]);

    const machines: Array<Machine> = [
        {
            id: "1",
            name: "Server #1",
            hostname: "machine-1.your.network",
            lastPing: subSeconds(new Date(), 5),
            group: "Default"
        },
        {
            id: "2",
            name: "Server #2",
            hostname: "machine-2.your.network",
            lastPing: subMinutes(new Date(), 5),
            group: "Default"
        },
        {
            id: "3",
            name: "Server #3",
            hostname: "machine-3.your.network",
            lastPing: subHours(new Date(), 5),
            group: "Default"
        }
    ];
</script>

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium dark:text-white">Overview Machines</h1>
    <Button>Enroll new Machine</Button>
</div>

<div class="min-h-full">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each machines as machine (machine.id)}
            <MachineCard {machine} />
        {/each}
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
