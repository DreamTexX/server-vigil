<script lang="ts">
    import NoContent from "$lib/assets/NoContent.svelte";
    import { P } from "flowbite-svelte";

    export let buttonName: string = "Create New";
</script>

<div class="mt-32 flex flex-col items-center justify-center gap-8">
    <NoContent class="max-w-xs" />
    <h1
        class="text-center text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
    >
        No Content
    </h1>
    <P class="mb-5 text-center text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
        This page is currently empty. Click "{buttonName}" to get started.
    </P>
</div>
