<script lang="ts">
    import { DarkMode, NavBrand, NavHamburger, Navbar } from "flowbite-svelte";
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import Logo from "$lib/assets/Logo.svelte";

    export let fluid = true;
    export let drawerHidden = false;
    export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
    <NavContainer class="mb-px mt-px px-1" {fluid}>
        <NavHamburger onClick={() => (drawerHidden = !drawerHidden)} class="m-0 me-3 md:block lg:hidden" />
        <NavBrand href="/" class={list ? "w-40" : "lg:w-60"}>
            <Logo class="me-2.5 h-8 sm:h-10 dark:text-white" />
            <span
                class="ml-px self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl"
            >
                ServerVigil
            </span>
        </NavBrand>
        <div class="hidden lg:block lg:ps-3">
            <Breadcrumbs />
        </div>
        <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
            <DarkMode />
        </div>
    </NavContainer>
</Navbar>
