<script lang="ts">
    import { formatDistance, differenceInMinutes } from "date-fns";
    import { onDestroy, onMount } from "svelte";
    import type { Machine, Measurement } from "$lib/server/schema";
    import { goto } from "$app/navigation";

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

<div class="card bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="flex items-center justify-between gap-2">
            <a href="/machines/{machine.id}">
                <h5 class="text-lg font-bold">
                    {machine.name}
                </h5>
            </a>
            <details class="dropdown dropdown-end">
                <summary class="btn btn-ghost btn-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                    >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </summary>
                <ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow">
                    <li>
                        <button>Edit</button>
                    </li>
                    <li>
                        <button on:click={() => goto("/machines/" + machine.id, { state: { delete: true } })}>Delete</button>
                    </li>
                </ul>
            </details>
        </div>
        <hr class="my-1" />
        <div class="leading-8">
            {#if measurement}
                <div
                    class="badge"
                    class:badge-success={differenceInMinutes(now, measurement.createdAt) <= 5}
                    class:badge-error={differenceInMinutes(now, measurement.createdAt) > 5}
                >
                    Last Ping: {formatDistance(measurement.createdAt, now, {
                        includeSeconds: true
                    })} ago
                </div>
                <div class="badge badge-ghost">
                    <span class="font-bold">Hostname:</span>
                    &nbsp;{measurement.hostname}
                </div>
            {/if}
            <div class="badge badge-ghost">
                <span class="font-bold">Group:</span>
                &nbsp;Default
            </div>
        </div>
    </div>
</div>
