<script lang="ts">
    import { browser } from "$app/environment";
    import { toRelativeLocalDateWithUnit } from "./relative-time";
    import { onMount } from "svelte";

    export let date: Date;
    export let language: string;

    let { value, unitValue } = toRelativeLocalDateWithUnit(date, language);
    let update: NodeJS.Timeout;

    function runUpdate() {
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
</script>

{#if !browser}
    {date.toLocaleString()}
{:else}
    {value}
{/if}
