import { r, type RCursor, type RDatum } from "rethinkdb-ts";
import type { Measurement } from "$lib/server/schema";
import { env } from "$env/dynamic/private";
import { connect } from "$lib/server/db";

export async function getMeasurementsForMachineById(
    machineId: string,
    order: "asc" | "desc" = "desc",
    limit?: number
): Promise<Array<Measurement>> {
    let query = r
        .db(env.DATABASE_NAME)
        .table("measurements")
        .orderBy({ index: order === "asc" ? r.asc("createdAt") : r.desc("createdAt") })
        .filter(r.row("machineId").eq(machineId));
    if (limit !== undefined) {
        query = query.limit(limit);
    }

    return query.run(await connect());
}

export async function subscribeMeasurements(): Promise<RCursor> {
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

export async function subscribeMeasurementByMachineId(machineId: string): Promise<RCursor> {
    const cursor = await r
        .db(env.DATABASE_NAME)
        .table("measurements")
        .filter(r.row("machineId").eq(machineId))
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
        .filter((rec: RDatum<Measurement>) => {
            return r.expr(ids).contains(rec("machineId"));
        })
        .group("machineId")
        .orderBy(r.desc("createdAt"))
        .limit(1)
        .run(await connect());

    return cursor.map((rec: any) => rec.reduction[0]);
}
