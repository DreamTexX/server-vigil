import { type Machine } from "$lib/server/schema";
import { connect } from "$lib/server/db";
import { r } from "rethinkdb-ts";
import { env } from "$env/dynamic/private";

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
    let results = await r
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
