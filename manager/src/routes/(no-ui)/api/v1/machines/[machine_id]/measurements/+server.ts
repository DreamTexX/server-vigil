import { extractAndValidateJsonPayload, requireMachineToken } from "$lib/server/middleware";
import { createMeasurementSchema, type CreateMeasurementDto } from "$lib/server/validator";
import { getMeasurementsForMachineById } from "$lib/server/services/measurements";
import { error, json } from "@sveltejs/kit";
import { connect } from "$lib/server/db";
import r from "rethinkdb";
import { env } from "$env/dynamic/private";

export async function GET({ params }) {
    return json(await getMeasurementsForMachineById(params.machine_id));
}

export async function POST({ request, params }) {
    const machine = requireMachineToken(request, params.machine_id);
    const payload: CreateMeasurementDto = await extractAndValidateJsonPayload(
        request,
        createMeasurementSchema
    );
    const data = {
        ...payload,
        machineId: machine.id,
        createdAt: new Date()
    };

    let results = await r
        .db(env.DATABASE_NAME)
        .table("measurements")
        .insert(data)
        .run(await connect());
    if (results.inserted) {
        return json({ ...data, id: results.generated_keys[0] });
    }

    throw error(500, { message: "database stuff failed" });
}
