<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Machine } from "$lib/server/schema";
    import { _ } from "$lib/stores/i18n.store";
    import type { ActionData } from "../../../routes/(sidebar)/[[lang]]/machines/[id]/$types";
    import Drawer from "../Drawer.svelte";

    export let form: ActionData;
    export let open: boolean = false;
    export let machine: Machine;
</script>

<Drawer bind:open title={$_("components.machines.deleteDrawer.title")}>
    <form
        method="post"
        action="/machines/{machine.id}?/delete"
        class="grid grid-cols-1 gap-4"
        use:enhance
    >
        <p>
            {$_("components.machines.deleteDrawer.warn1")}
            <span class="font-bold">
                {$_("components.machines.deleteDrawer.warn2")}
            </span>
        </p>
        <p>
            {$_("components.machines.deleteDrawer.confirmMsg")}
            <kbd class="kbd kbd-sm">{machine.name}</kbd>
        </p>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">
                    {$_("components.machines.deleteDrawer.confirmLabel")}
                </span>
            </div>
            <input
                type="text"
                name="name"
                placeholder={$_("components.machines.deleteDrawer.confirmPlaceholder")}
                on:keydown={() => {
                    if (form && form.errors) form.errors.name = undefined;
                }}
                class="input input-bordered w-full"
                class:input-error={form?.errors?.name}
            />
            {#if form?.errors?.name}
                <div class="label">
                    <span></span>
                    <span class="label-text-alt text-error">{form.errors.name}</span>
                </div>
            {/if}
        </label>
        <button type="submit" class="btn btn-error">
            {$_("components.machines.deleteDrawer.deleteBtn")}
        </button>
    </form>
</Drawer>
