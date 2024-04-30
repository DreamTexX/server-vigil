<script lang="ts">
    import "../app.pcss";
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";

    getBreadcrumbsStore();
</script>

<slot />
