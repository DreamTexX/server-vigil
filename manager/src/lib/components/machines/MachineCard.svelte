<script lang="ts">
    import type { Machine, Measurement } from "$lib/server/schema";
    import LocalizedRelativeTime from "../intl/LocalizedRelativeTime.svelte";
    import { localizeUrl } from "../intl/url-builder";
    import { getLangStore } from "$lib/stores/lang.store";

    export let machine: Machine;
    export let measurement: Measurement | undefined;

    const langStore = getLangStore();

    let differenceInMinutes = 0;

    $: differenceInMinutes = Math.round(
        (new Date().getTime() - (measurement?.createdAt?.getTime() ?? new Date().getTime())) /
            1000 /
            60
    );
</script>

<div class="card bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="flex items-center justify-between gap-2">
            <a href={localizeUrl("/machines/" + machine.id)} class="w-full">
                <h5 class="text-lg font-bold">
                    {machine.name}
                </h5>
            </a>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
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
                </div>
                <ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow">
                    <li>
                        <button>Edit</button>
                    </li>
                    <li>
                        <a href={localizeUrl("/machines/" + machine.id + "?delete")}>Delete</a>
                    </li>
                </ul>
            </div>
        </div>
        <hr class="my-1" />
        <div class="leading-8">
            {#if measurement}
                <div
                    class="badge tooltip"
                    class:badge-success={differenceInMinutes <= 5}
                    class:badge-error={differenceInMinutes > 5}
                    data-tip={measurement.createdAt.toLocaleString($langStore)}
                >
                    Last Ping: {#key measurement.id}
                        <LocalizedRelativeTime date={measurement.createdAt} language={$langStore} />
                    {/key}
                </div>
                <br />
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
