<script lang="ts">
    import { enhance } from "$app/forms";
    import Drawer from "../Drawer.svelte";
    import CopyIcon from "lucide-svelte/icons/copy";
    import CopyCheckIcon from "lucide-svelte/icons/copy-check";
    import type { ComponentType } from "svelte";
    import type { ActionData } from "../../../routes/(sidebar)/[[lang]]/machines/$types";
    import { _ } from "$lib/stores/i18n.store";

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

<Drawer bind:open title={$_("components.machines.createDrawer.title")}>
    {#if form?.item}
        <div class="grid grid-cols-1 gap-4">
            <!-- prettier-ignore -->
            <p>
                {$_("components.machines.createDrawer.copyInfo1")}
                <span class="font-bold">
                    {$_("components.machines.createDrawer.copyInfo2")}
                </span>
                {$_("components.machines.createDrawer.copyInfo3")}
            </p>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">
                        {$_("components.machines.createDrawer.machineToken")}
                    </span>
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
            <button class="btn btn-secondary" on:click={close}>
                {$_("components.machines.createDrawer.closeBtn")}
            </button>
        </div>
    {:else}
        <form method="post" class="grid grid-cols-1 gap-4" use:enhance>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">
                        {$_("components.machines.createDrawer.machineNameLabel")}
                    </span>
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder={$_("components.machines.createDrawer.machineNamePlaceholder")}
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
            <button type="submit" class="btn btn-primary">
                {$_("components.machines.createDrawer.addBtn")}
            </button>
        </form>
    {/if}
</Drawer>
