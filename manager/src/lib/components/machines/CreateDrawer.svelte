<script lang="ts">
    import { enhance } from "$app/forms";
    import Drawer from "../Drawer.svelte";
    import CopyIcon from "lucide-svelte/icons/copy";
    import CopyCheckIcon from "lucide-svelte/icons/copy-check";
    import type { ComponentType } from "svelte";
    import type { ActionData } from "../../../routes/(sidebar)/[[lang]]/machines/$types";

    export let form: ActionData;
    export let open: boolean = false;

    let copyIcon: ComponentType = CopyIcon;
    let copyResetTimeout: ReturnType<typeof setTimeout>;

    function close() {
        open = false;
    }

    async function copyToken() {
        clearTimeout(copyResetTimeout);
        await navigator.clipboard.writeText(form!.item!.token);
        copyIcon = CopyCheckIcon;
        copyResetTimeout = setTimeout(() => (copyIcon = CopyIcon), 1000);
    }
</script>

<Drawer bind:open title="Add new Machine">
    {#if form?.item}
        <div class="grid grid-cols-1 gap-4">
            <!-- prettier-ignore -->
            <p>
                Use the following token to connect your agent to this instance.
                <span class="font-bold">This token will only be shown once</span>.
                Use the machines settings page to generate a new token.
            </p>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Machine Token</span>
                </div>
                <div class="join">
                    <input
                        type="text"
                        class="input join-item input-bordered w-full !outline-none"
                        readonly
                        value={form.item.token}
                    />
                    <button class="btn join-item btn-neutral" on:click={copyToken}>
                        <svelte:component this={copyIcon} size={24} />
                    </button>
                </div>
            </label>
            <button class="btn btn-secondary" on:click={close}>Close</button>
        </div>
    {:else}
        <form method="post" class="grid grid-cols-1 gap-4" use:enhance>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Machine Name</span>
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
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    {/if}
</Drawer>
