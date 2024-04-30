<script lang="ts">
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";
    
    getBreadcrumbsStore().set([
        { label: "Home", href: "/" },
        { label: "Dashboard" }
    ]);
</script>
