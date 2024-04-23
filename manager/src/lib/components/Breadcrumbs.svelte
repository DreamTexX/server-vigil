<script lang="ts">
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";
    import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
</script>

<Breadcrumb>
    {#each $BREADCRUMBS_STORE as item}
        <BreadcrumbItem {...item}>{item.label}</BreadcrumbItem>
    {/each}
</Breadcrumb>
