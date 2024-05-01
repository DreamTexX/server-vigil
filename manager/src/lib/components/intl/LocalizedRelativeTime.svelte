<script lang="ts">
    import { browser } from "$app/environment";
    import { toRelativeLocalDateWithUnit } from "./relative-time";
    import { onDestroy, onMount } from "svelte";

    export let date: Date;
    export let language: string;

    let { value, unitValue } = toRelativeLocalDateWithUnit(date, language);
    let update: ReturnType<typeof setTimeout>;

    function runUpdate() {
        clearInterval(update);
        update = setInterval(() => {
            let intermediateValues = toRelativeLocalDateWithUnit(date, language);
            value = intermediateValues.value;
            if (intermediateValues.unitValue > unitValue) {
                unitValue = intermediateValues.unitValue;
                clearInterval(update);
                runUpdate();
            }
        }, unitValue);
    }

    onMount(runUpdate);
    onDestroy(() => clearInterval(update));
</script>

{#if !browser}
    {date.toLocaleString()}
{:else}
    {value}
{/if}
