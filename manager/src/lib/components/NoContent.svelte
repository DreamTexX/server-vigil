<script lang="ts">
    import { _ } from "$lib/stores/i18n.store";

    export let buttonName: string = "Create New";
</script>

<div class="mt-32 flex flex-col items-center justify-center gap-8">
    <h1 class="text-center text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">No Content</h1>
    <p class="mb-5 text-center text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
        {$_("components.noContent.text", { buttonName })}
    </p>
</div>
