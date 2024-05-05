<script lang="ts">
    import { page } from "$app/stores";
    import DeleteDrawer from "$lib/components/machines/DeleteDrawer.svelte";
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";
    import ChartCard from "$lib/components/machines/ChartCard.svelte";
    import ChevronLeftIcon from "lucide-svelte/icons/chevron-left";
    import GaugeIcon from "lucide-svelte/icons/gauge";
    import SettingsIcon from "lucide-svelte/icons/settings-2";
    import LocalizedRelativeTime from "$lib/components/intl/LocalizedRelativeTime.svelte";
    import { langStore } from "$lib/stores/lang.store.js";
    import { _ } from "$lib/stores/i18n.store.js";

    export let form;
    export let data;

    let machine = data.item.machine;
    let deleteDrawerOpen: boolean = $page.url.searchParams.has("delete") ?? false;

    getBreadcrumbsStore().set([
        { label: $_("navigation.main.breadcrumbs.home"), href: "/" },
        { label: $_("navigation.main.breadcrumbs.machines"), href: "/machines" },
        { label: machine.name }
    ]);
</script>

<DeleteDrawer bind:open={deleteDrawerOpen} bind:form bind:machine />

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium">{machine.name}</h1>
    <div role="tablist" class="tabs-boxed tabs">
        <button role="tab" class="tab tab-active flex items-center gap-2">
            <GaugeIcon size={16} />
            <span class="max-sm:hidden">
                {$_("pages.machines._id.measurements")}
            </span>
        </button>
        <button role="tab" class="tab flex items-center gap-2">
            <SettingsIcon size={16} />
            <span class="max-sm:hidden">
                {$_("pages.machines._id.settings")}
            </span>
        </button>
    </div>
</div>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
    {#if data.item.measurements.length > 0}
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
                        <span class="pointer-events-none select-none text-base">
                            {$_("pages.machines._id.filter")}
                        </span>
                        <ChevronLeftIcon size={16} class="group-open:-rotate-90" />
                    </summary>

                    <form
                        on:submit|preventDefault
                        class="m-auto flex w-full flex-col items-center gap-2 sm:w-1/2 md:m-0 md:w-full md:flex-row md:justify-end"
                    >
                        <label class="form-control max-md:w-full">
                            <div class="label">
                                <span class="label-text">
                                    {$_("pages.machines._id.from")}
                                </span>
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
                                <span class="label-text">
                                    {$_("pages.machines._id.to")}
                                </span>
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
                                <span class="label-text">
                                    {$_("pages.machines._id.interval")}
                                </span>
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
                                    <option value="second">
                                        {$_("pages.machines._id.intervalSteps.second")}
                                    </option>
                                    <option value="min">
                                        {$_("pages.machines._id.intervalSteps.minute")}
                                    </option>
                                    <option value="hour">
                                        {$_("pages.machines._id.intervalSteps.hour")}
                                    </option>
                                    <option value="day">
                                        {$_("pages.machines._id.intervalSteps.day")}
                                    </option>
                                </select>
                            </div>
                        </label>
                    </form>
                </details>
            </div>
        </div>

        <ChartCard initial={data.item.measurements} machineId={machine.id} />
    {/if}
</div>
