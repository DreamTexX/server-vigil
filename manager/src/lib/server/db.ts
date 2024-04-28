import { env } from "$env/dynamic/private";
import r from "rethinkdb";

let CACHED_CONNECTION: r.Connection | undefined = undefined;

export async function connect(): Promise<r.Connection> {
    if (CACHED_CONNECTION && CACHED_CONNECTION.open) {
        return Promise.resolve(CACHED_CONNECTION);
    }

    CACHED_CONNECTION = await r.connect(env.DATABASE_SERVER);
    return CACHED_CONNECTION;
}

export async function migrate() {
    await r.db(env.DATABASE_NAME).tableCreate("machines").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).tableCreate("measurements").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).table("machines").indexCreate("createdAt").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).table("measurements").indexCreate("createdAt").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
}