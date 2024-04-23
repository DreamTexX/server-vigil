<script lang="ts">
    import { enhance } from "$app/forms";
    import MachineCard from "$lib/components/MachineCard.svelte";
    import NoContent from "$lib/components/NoContent.svelte";
    import { BREADCRUMBS_STORE } from "$lib/stores/breadcrumbs";
    import { Button, CloseButton, Drawer, Helper, Input, Label } from "flowbite-svelte";
    import { tick } from "svelte";

    BREADCRUMBS_STORE.set([{ label: "Home", home: true, href: "/" }, { label: "Machines" }]);

    let hideCreateDialog: boolean = true;
    function closeCreateDialog() {
        hideCreateDialog = true;
    }

    export let data;
    export let form;
</script>

<div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-medium dark:text-white">Overview Machines</h1>
    <Button on:click={() => (hideCreateDialog = false)}>Enroll new Machine</Button>
</div>

<Drawer
    bind:hidden={hideCreateDialog}
    placement="right"
    transitionType="fly"
    transitionParams={{ duration: 0 }}
    width="w-96"
    class="p-0"
>
    <div class="mb-6 flex items-center bg-gray-100 px-4 py-2 dark:bg-gray-700">
        <h5 class="w-full text-lg font-semibold text-gray-500 dark:text-gray-400">
            Enroll new Machine
        </h5>
        <CloseButton on:click={closeCreateDialog} class="dark:text-white" />
    </div>
    <form
        method="post"
        use:enhance={() => {
            return async ({ result, update }) => {
                if (result.type === "success") {
                    closeCreateDialog();
                }
                
                return update();
            };
        }}
        class="grid grid-cols-1 gap-4 px-4"
    >
        <div>
            <Label for="name-input" class="mb-2 block">Machine Name</Label>
            <Input
                id="name-input"
                name="name"
                color={form?.errors?.name !== undefined ? "red" : "base"}
                placeholder="Machine Name"
                on:keydown={() => {
                    if (form && form.errors) form.errors.name = undefined;
                }}
            />
            {#if form?.errors?.name}
                <Helper color="red" class="text-right">{form?.errors.name}</Helper>
            {/if}
        </div>
        <div class="flex justify-end">
            <Button type="submit">Enroll</Button>
        </div>
    </form>
</Drawer>

{#if data.items.length > 0}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each data.items as machine (machine.id)}
            <MachineCard {machine} />
        {/each}
        <div></div>
        <div></div>
        <div></div>
    </div>
{:else}
    <NoContent buttonName="Enroll new Machine" />
{/if}
