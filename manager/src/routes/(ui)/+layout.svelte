<script lang="ts">
    import { writable } from "svelte/store";
    import "../../app.pcss";
    import { setContext } from "svelte";

    setContext("breadcrumbs", writable<Breadcrumbs>([]));
</script>

<slot />
