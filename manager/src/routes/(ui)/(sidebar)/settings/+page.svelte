<script lang="ts">
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";

    BREADCRUMBS_STORE.set([{ label: "Home", href: "/" }, { label: "Settings" }]);

    export let form;
</script>

<div class="card bg-base-100 shadow-xl">
    <form method="post" action="?/migrate" class="card-body">
        <button type="submit" class="btn btn-error">Run Migrations</button>
        {#if form?.success}
            <p>
                Migrations applied successfully
            </p>
        {/if}
    </form>
</div>
