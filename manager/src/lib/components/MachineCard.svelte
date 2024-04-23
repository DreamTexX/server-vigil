<script lang="ts">
    import { Badge, Card, Dropdown, DropdownItem, ToolbarButton, Tooltip } from "flowbite-svelte";
    import { DotsVerticalOutline } from "flowbite-svelte-icons";
    import { format, formatDistance, differenceInMinutes } from "date-fns";
    import { onDestroy, onMount } from "svelte";
    import type { Machine, Measurement } from "$lib/server/schema";

    export let machine: Machine;

    let measurement: Measurement | undefined;
    let now: Date = new Date();
    let ticker = setInterval(() => (now = new Date()), 30000);

    onMount(() => {
        // load latest measurement
    });

    onDestroy(() => {
        clearInterval(ticker);
    });
</script>

<Card size="none" padding="md">
    <div class="flex items-center justify-between gap-2">
        <div class="flex w-full justify-between gap-2">
            <a href="/machines/{machine.id}">
                <h5 class="text-lg font-bold text-gray-900 dark:text-white">
                    {machine.name}
                </h5>
            </a>
            {#if measurement}
                <div>
                    <Badge
                        color={differenceInMinutes(now, measurement.createdAt) <= 5
                            ? "green"
                            : "red"}
                    >
                        Last Ping: {formatDistance(measurement.createdAt, now, {
                            includeSeconds: true
                        })} ago
                    </Badge>
                    <Tooltip placement="bottom">
                        {format(measurement.createdAt, "PPpp")}
                    </Tooltip>
                </div>
            {/if}
        </div>
        <div>
            <ToolbarButton>
                <DotsVerticalOutline></DotsVerticalOutline>
            </ToolbarButton>
            <Dropdown placement="bottom-end">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
            </Dropdown>
        </div>
    </div>
    <hr class="my-2" />
    <div>
        <Badge color="dark">
            <span class="font-bold">Group:</span>
            &nbsp;Default
        </Badge>
        {#if measurement}
            <Badge color="dark">
                <span class="font-bold">Hostname:</span>
                &nbsp;{measurement.hostname}
            </Badge>
        {/if}
    </div>
</Card>
