<script lang="ts">
    import { page } from "$app/stores";
    import DeleteDrawer from "$lib/components/machines/DeleteDrawer.svelte";
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";
    import ChartCard from "$lib/components/machines/ChartCard.svelte";
    import ChevronLeftIcon from "lucide-svelte/icons/chevron-left";
    import GaugeIcon from "lucide-svelte/icons/gauge";
    import SettingsIcon from "lucide-svelte/icons/settings-2";
    import LocalizedRelativeTime from "$lib/components/intl/LocalizedRelativeTime.svelte";
    import { getLangStore } from "$lib/stores/lang.store.js";

    export let form;
    export let data;

    const langStore = getLangStore();

    let machine = data.item.machine;
    let deleteDrawerOpen: boolean = $page.url.searchParams.has("delete") ?? false;

    getBreadcrumbsStore().set([
        { label: "Home", href: "/" },
        { label: "Machines", href: "/machines" },
        { label: machine.name }
    ]);
</script>

<DeleteDrawer bind:open={deleteDrawerOpen} bind:form bind:machine />

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium">{machine.name}</h1>
    <div role="tablist" class="tabs-boxed tabs">
        <button role="tab" class="tab tab-active flex items-center gap-2">
            <GaugeIcon size={16} />
            <span class="max-sm:hidden">Measurements</span>
        </button>
        <button role="tab" class="tab flex items-center gap-2">
            <SettingsIcon size={16} />
            <span class="max-sm:hidden">Settings</span>
        </button>
    </div>
</div>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
    <div class="card bg-base-100 shadow-xl xl:col-span-2">
        <div class="card-body py-3">
            <details class="group">
                <summary
                    class="grid cursor-pointer list-none grid-cols-[1fr_max-content_max-content] items-center gap-2"
                >
                    <div>
                        <LocalizedRelativeTime
                            date={data.item.measurements[0].createdAt}
                            language={$langStore}
                        />
                        -
                        <LocalizedRelativeTime
                            date={data.item.measurements[data.item.measurements.length - 1]
                                .createdAt}
                            language={$langStore}
                        />
                    </div>
                    <span class="pointer-events-none select-none text-base">Filter</span>
                    <ChevronLeftIcon size={16} class="group-open:-rotate-90" />
                </summary>

                <form
                    on:submit|preventDefault
                    class="m-auto flex w-full flex-col items-center gap-2 sm:w-1/2 md:m-0 md:w-full md:flex-row md:justify-end"
                >
                    <label class="form-control max-md:w-full">
                        <div class="label">
                            <span class="label-text">From</span>
                        </div>
                        <input
                            type="datetime-local"
                            name="from"
                            class="input input-sm input-bordered max-md:w-full"
                            lang={$langStore}
                        />
                    </label>
                    <label class="form-control max-md:w-full">
                        <div class="label">
                            <span class="label-text">To</span>
                        </div>
                        <input
                            type="datetime-local"
                            name="from"
                            class="input input-sm input-bordered max-md:w-full"
                            lang={$langStore}
                        />
                    </label>
                    <label class="form-control max-md:w-full">
                        <div class="label">
                            <span class="label-text">Interval</span>
                        </div>
                        <div class="group join max-md:w-full">
                            <input
                                type="number"
                                name="interval-value"
                                class="input input-sm join-item input-bordered w-20 max-md:w-full"
                                min="1"
                            />
                            <select
                                name="interval-unit"
                                class="join-item select select-bordered select-sm"
                            >
                                <option value="second">Second</option>
                                <option value="min">Minute</option>
                                <option value="hour">Hour</option>
                                <option value="day">Day</option>
                            </select>
                        </div>
                    </label>
                </form>
            </details>
        </div>
    </div>

    <ChartCard initial={data.item.measurements} machineId={machine.id} />
</div>
