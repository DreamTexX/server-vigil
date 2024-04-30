import { deleteMachine, getMachine } from "$lib/server/services/machines";
import { error, fail, redirect } from "@sveltejs/kit";
import { type Machine, type Measurement } from "$lib/server/schema";
import { getMeasurementsForMachineById } from "$lib/server/services/measurements";

export async function load({ params }): Promise<{ item: { machine: Machine, measurements: Array<Measurement> }}> {
    const machine = await getMachine(params.id);
    if (!machine) {
        throw error(404);
    }

    const measurements = await getMeasurementsForMachineById(machine.id, "desc", 10);

    return {
        item: {
            machine,
            measurements: measurements.reverse()
        }
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
                    name: <string | undefined>"Name must match the name of the machine."
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
};
