<script lang="ts">
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";
</script>

<div class="breadcrumbs text-sm">
    <ul>
        {#each $BREADCRUMBS_STORE as { href, label }}
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
