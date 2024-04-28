import { migrate } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export const actions = {
    migrate: async () => {
        await migrate();

        return {
            success: true
        };
    }
};
