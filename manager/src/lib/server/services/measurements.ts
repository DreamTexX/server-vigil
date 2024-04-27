import type { Measurement } from "$lib/server/schema";
import { connect } from "$lib/server/db";
import r from "rethinkdb";

export async function getMeasurementsForMachineById(
    machineId: string
): Promise<Array<Measurement>> {
    const results = await r
        .db("server-vigil")
        .table("measurements")
        .orderBy({ index: r.desc("createdAt") })
        .filter(r.row("machineId").eq(machineId))
        .run(await connect());

    return results.toArray();
}

export async function subscribeMeasurements(): Promise<r.Cursor> {
    const cursor = await r
        .db("server-vigil")
        .table("measurements")
        .changes({
            changefeedQueueSize: 1,
            includeInitial: false,
            includeOffsets: false,
            includeStates: false,
            includeTypes: false,
            squash: false
        })
        .run(await connect());

    return cursor;
}
