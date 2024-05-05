<script lang="ts">
    import "../app.pcss";

    import { page } from "$app/stores";
    import { localizeUrl } from "$lib/components/intl/url-builder";
    import { _ } from "$lib/stores/i18n.store";
</script>

<main>
    <div class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
        <div class="text-center xl:max-w-4xl">
            <h1 class="mb-3 text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {$page.status}
            </h1>
            <p class="mb-5 text-center text-base font-normal md:text-lg">
                {$_("pages.error.badLink")}
            </p>
            <a href={localizeUrl("/")} class="btn btn-primary">
                <svg
                    class="-ml-1 mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                {$_("pages.error.goBack")}
            </a>
        </div>
    </div>
</main>
