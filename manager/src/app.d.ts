// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        interface PageState {
            delete?: boolean;
        }
        // interface Platform {}
    }

    type Breadcrumbs = Array<{ label: string; href?: string }>;
}

export {};
