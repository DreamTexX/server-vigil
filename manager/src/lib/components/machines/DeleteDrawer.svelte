<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Machine } from "$lib/server/schema";
    import type { ActionData } from "../../../routes/(sidebar)/machines/[id]/$types";
    import Drawer from "../Drawer.svelte";

    export let form: ActionData;
    export let open: boolean = false;
    export let machine: Machine;
</script>

<Drawer bind:open title="Delete Machine">
    <form
        method="post"
        action="/machines/{machine.id}?/delete"
        class="grid grid-cols-1 gap-4"
        use:enhance
    >
        <p>
            This action will permanently delete this machine and all its measurements from this
            application. <span class="font-bold">It will not delete the agent or server data</span>
            .
        </p>
        <p>
            To confirm and delete, please type <kbd class="kbd kbd-sm">{machine.name}</kbd>
            .
        </p>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Confirm with Machine Name</span>
            </div>
            <input
                type="text"
                name="name"
                placeholder="Machine Name"
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
        <button type="submit" class="btn btn-error">Delete</button>
    </form>
</Drawer>
