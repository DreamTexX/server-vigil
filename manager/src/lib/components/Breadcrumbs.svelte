<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const breadcrumbs = getContext<Writable<Breadcrumbs>>("breadcrumbs");
</script>

<div class="breadcrumbs text-sm">
    <ul>
        {#each $breadcrumbs as { href, label }}
            <li>
                {#if href}
                    <a {href}>{label}</a>
                {:else}
                    {label}
                {/if}
            </li>
        {/each}
    </ul>
</div>
