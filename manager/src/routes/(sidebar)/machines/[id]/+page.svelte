<script lang="ts">
    import { page } from "$app/stores";
    import DeleteDrawer from "$lib/components/machines/DeleteDrawer.svelte";
    import { onDestroy, onMount } from "svelte";
    import Chart from "chart.js/auto";
    import type { Measurement } from "$lib/server/schema";
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";

    export let form;
    export let data;

    let canvas: HTMLCanvasElement | undefined;
    let machine = data.item.machine;
    let measurements = data.item.measurements;
    let deleteDrawerOpen: boolean = $page.state.delete ?? false;
    let eventSource: EventSource | undefined;
    let chart: Chart | undefined;

    getBreadcrumbsStore().set([
        { label: "Home", href: "/" },
        { label: "Machines", href: "/machines" },
        { label: machine.name }
    ]);

    onMount(async () => {
        eventSource = new EventSource(`/api/v1/machines/${machine.id}/measurements/subscribe`);
        eventSource.onmessage = (event: MessageEvent) => {
            const measurement: Measurement = JSON.parse(event.data);
            if (chart) {
                chart.data.labels?.shift();
                chart.data.labels?.push(new Date(measurement.createdAt).toLocaleTimeString());
                chart.data.datasets.forEach((dataset) => dataset.data.shift());
                chart.data.datasets[0].data.push(measurement.memTotal - measurement.memAvailable);
                chart.data.datasets[1].data.push(measurement.memTotal);
                chart.update();
            }
        };

        if (canvas)
            chart = new Chart(canvas, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: "Used",
                            data: measurements.map(
                                (measurement) => measurement.memTotal - measurement.memAvailable
                            ),
                            yAxisID: "y"
                        },
                        {
                            label: "Total",
                            data: measurements.map((measurement) => measurement.memTotal),
                            yAxisID: "y"
                        }
                    ],
                    labels: measurements.map((measurement) =>
                        measurement.createdAt.toLocaleTimeString()
                    )
                },
                options: {
                    maintainAspectRatio: false,
                    onResize: (chart, { width }) => {
                        if (window.innerWidth <= 640) chart.resize(width, 200);
                        else chart.resize(width, 300);
                    },
                    scales: {
                        y: {
                            min: 0,
                            ticks: {
                                callback: (tickValue) => {
                                    return Math.round(<number>tickValue / 1024 / 1024) + " GB";
                                }
                            }
                        }
                    }
                }
            });
    });

    onDestroy(() => {
        eventSource?.close();
    });
</script>

<DeleteDrawer bind:open={deleteDrawerOpen} bind:form bind:machine />

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium">{machine.name}</h1>
    <div role="tablist" class="tabs-boxed tabs">
        <button role="tab" class="tab tab-active">Measurements</button>
        <button role="tab" class="tab">Settings</button>
    </div>
</div>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex items-center justify-between gap-2">
                <h5 class="text-lg">Memory History</h5>
            </div>
            <hr class="my-1" />
            <div class="relative w-full">
                <canvas bind:this={canvas}></canvas>
            </div>
        </div>
    </div>
</div>
