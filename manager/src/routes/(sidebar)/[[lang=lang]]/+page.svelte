<script lang="ts">
    import { getBreadcrumbsStore } from "$lib/stores/breadcrumbs.store";
    import { _ } from "$lib/stores/i18n.store";

    getBreadcrumbsStore().set([
        { label: $_("navigation.main.breadcrumbs.home"), href: "/" },
        { label: $_("navigation.main.breadcrumbs.dashboard") }
    ]);
</script>
