<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    getContext<Writable<Breadcrumbs>>("breadcrumbs").set([
        { label: "Home", href: "/" },
        { label: "Dashboard" }
    ]);
</script>
