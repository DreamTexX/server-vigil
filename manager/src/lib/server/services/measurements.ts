import type { Measurement } from "$lib/server/schema";
import { env } from "$env/dynamic/private";
import { connect } from "$lib/server/db";
import r from "rethinkdb";

export async function getMeasurementsForMachineById(
    machineId: string
): Promise<Array<Measurement>> {
    const results = await r
        .db(env.DATABASE_NAME)
        .table("measurements")
        .orderBy({ index: r.desc("createdAt") })
        .filter(r.row("machineId").eq(machineId))
        .run(await connect());

    return results.toArray();
}

export async function subscribeMeasurements(): Promise<r.Cursor> {
    const cursor = await r
        .db(env.DATABASE_NAME)
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

export async function batchGetLatestMeasurementForMachinesById(
    ids: Array<string>
): Promise<Array<Measurement>> {
    const cursor = await r
        .db(env.DATABASE_NAME)
        .table("measurements")
        .filter((rec) => {
            return r.expr(ids).contains(rec("machineId") as unknown as string);
        })
        // @ts-ignore
        .group("machineId")
        .orderBy(r.desc("createdAt"))
        .limit(1)
        .run(await connect());

    return (await cursor.toArray()).map((rec: any) => rec.reduction[0]);
}
