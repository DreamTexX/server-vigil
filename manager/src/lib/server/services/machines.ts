import { type Machine } from "$lib/server/schema";
import { env } from "$env/dynamic/private";
import { connect } from "$lib/server/db";
import { r } from "rethinkdb-ts";

export async function getMachine(id: string): Promise<Machine | undefined> {
    const results = await r
        .db(env.DATABASE_NAME)
        .table("machines")
        .orderBy({ index: r.desc("createdAt") })
        .filter(r.row("id").eq(id))
        .limit(1)
        .run(await connect());

    return results[0];
}

export async function getMachines(): Promise<Array<Machine>> {
    const results = await r
        .db(env.DATABASE_NAME)
        .table("machines")
        .orderBy({ index: r.desc("createdAt") })
        .run(await connect());
    return results;
}

export async function deleteMachine(id: string): Promise<void> {
    await r
        .db(env.DATABASE_NAME)
        .table("machines")
        .filter(r.row("id").eq(id))
        .delete()
        .run(await connect());
}
