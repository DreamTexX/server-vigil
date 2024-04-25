<script lang="ts">
    import { page } from "$app/stores";
    import DeleteDrawer from "$lib/components/machines/DeleteDrawer.svelte";
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs.js";

    export let form;
    export let data;

    let machine = data.item;
    let deleteDrawerOpen: boolean = $page.state.delete ?? false;

    BREADCRUMBS_STORE.set([
        { label: "Home", href: "/" },
        { label: "Machines", href: "/machines" },
        { label: machine.name }
    ]);
</script>

<DeleteDrawer bind:open={deleteDrawerOpen} bind:form bind:machine />
