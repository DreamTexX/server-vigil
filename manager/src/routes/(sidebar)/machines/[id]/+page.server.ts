import { type Machine } from '$lib/server/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { deleteMachine, getMachine } from "$lib/server/services/machines";

export async function load({ params }): Promise<{ item: Machine }> {
    let machine = await getMachine(params.id);
    if (!machine) {
        throw error(404);
    }

    return {
        item: machine
    };
}

export const actions = {
    delete: async function ({ request, params }) {
        const payload = await request.formData();
        const machine = await getMachine(params.id);
        if (!machine) {
            throw error(404);
        }

        if (payload.get("name") !== machine.name) {
            return fail(400, {
                errors: {
                    name: (<string | undefined>"Name must match the name of the machine.")
                }
            });
        }

        try {
            deleteMachine(params.id);
        } catch (err) {
            throw error(500, <Error>err);
        }

        redirect(303, "/machines");
    }
}