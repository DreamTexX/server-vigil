import { type Machine } from "$lib/server/schema";
import { connect } from "$lib/server/db";
import r from "rethinkdb";

export async function getMachine(id: string): Promise<Machine | undefined> {
    const results = await r
        .db("server-vigil")
        .table("machines")
        .orderBy({ index: r.desc("createdAt") })
        .limit(1)
        .run(await connect());

    return results.next();
}

export async function getMachines(): Promise<Array<Machine>> {
    let results = await r
        .db("server-vigil")
        .table("machines")
        .orderBy({ index: r.desc("createdAt") })
        .run(await connect());
    return results.toArray();
}

export async function deleteMachine(id: string): Promise<void> {
    await r
        .db("server-vigil")
        .table("machines")
        .filter(r.row("id").eq(id))
        .delete()
        .run(await connect());
}
