<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Chart from "chart.js/auto";
    import type { Measurement } from "$lib/server/schema";
    import MaximizeIcon from "lucide-svelte/icons/maximize";
    import { getLangStore } from "$lib/stores/lang.store";

    export let machineId: string;
    export let initial: Array<Measurement>;

    const langStore = getLangStore();

    let canvas: HTMLCanvasElement | undefined;
    let chart: Chart | undefined;
    let eventSource: EventSource | undefined;

    onMount(() => {
        eventSource = new EventSource(`/api/v1/machines/${machineId}/measurements/subscribe`);
        eventSource.onmessage = (event: MessageEvent) => {
            const measurement: Measurement = JSON.parse(event.data);
            if (chart) {
                chart.data.labels?.shift();
                chart.data.labels?.push(
                    new Date(measurement.createdAt).toLocaleTimeString($langStore)
                );
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
                            data: initial.map(
                                (measurement) => measurement.memTotal - measurement.memAvailable
                            ),
                            yAxisID: "y",
                            fill: "origin",
                            borderColor: "oklch(0.774824 0.115704 81.5192)",
                            backgroundColor: "oklch(0.774824 0.115704 81.5192 / 20%)"
                        },
                        {
                            label: "Total",
                            data: initial.map((measurement) => measurement.memTotal),
                            yAxisID: "y",
                            fill: "0",
                            borderColor: "oklch(0.417036 0.099057 251.474)",
                            backgroundColor: "oklch(41.7% 0.099057 251.474 / 20%)"
                        }
                    ],
                    labels: initial.map((measurement) =>
                        measurement.createdAt.toLocaleTimeString($langStore)
                    )
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            position: "nearest"
                        },
                        legend: {
                            display: false
                        }
                    },
                    hover: {
                        intersect: false,
                        mode: "index"
                    },
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

<div class="card bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="flex items-center justify-between gap-2">
            <h5 class="text-lg">Memory History</h5>
            <div class="flex items-center gap-2">
                <button>
                    <MaximizeIcon size={20} />
                </button>
            </div>
        </div>
        <!--<hr class="my-1" />-->

        <div class="relative w-full">
            <canvas bind:this={canvas}></canvas>
        </div>
    </div>
</div>
