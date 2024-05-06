import { batchGetLatestMeasurementForMachinesById } from "$lib/server/services/measurements";
import { createMachineSchema, type CreateMachineDto } from "$lib/server/validator";
import { createMachine, getMachines } from "$lib/server/services/machines";
import { extractAndValidateFormPayload } from "$lib/server/middleware.js";
import { type Measurement, type Machine } from "$lib/server/schema";
import { createToken } from "$lib/server/services/tokens.js";

export async function load(): Promise<{
    item: { machines: Array<Machine>; measurements: Array<Measurement> };
}> {
    const machines: Array<Machine> = await getMachines();
    const measurements: Array<Measurement> = await batchGetLatestMeasurementForMachinesById(
        machines.map((machine) => machine.id)
    );
    return { item: { machines, measurements } };
}

export const actions = {
    default: async function ({ request }) {
        const { payload, fail } = await extractAndValidateFormPayload<CreateMachineDto>(
            request,
            createMachineSchema
        );
        if (fail) {
            return fail;
        }
        const machine = await createMachine(payload.name);
        const token = createToken(machine);

        return {
            item: {
                machine,
                token
            }
        };
    }
};
