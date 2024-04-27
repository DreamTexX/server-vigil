<script lang="ts">
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";

    BREADCRUMBS_STORE.set([{ label: "Home", href: "/" }, { label: "Dashboard" }]);
</script>
