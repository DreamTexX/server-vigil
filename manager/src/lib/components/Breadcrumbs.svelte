<script lang="ts">
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";

    const breadcrumbs = getBreadcrumbsStore();
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
