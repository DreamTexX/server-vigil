import { env } from "$env/dynamic/private";
import { r, type Connection } from "rethinkdb-ts";

let CACHED_CONNECTION: Connection | undefined = undefined;

export async function connect(): Promise<Connection> {
    if (CACHED_CONNECTION && CACHED_CONNECTION.open) {
        return Promise.resolve(CACHED_CONNECTION);
    }

    CACHED_CONNECTION = await r.connect({ server: { host: env.DATABASE_SERVER } });
    return CACHED_CONNECTION;
}

export async function migrate() {
    await r.db(env.DATABASE_NAME).tableCreate("machines").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).tableCreate("measurements").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).table("machines").indexCreate("createdAt").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
    await r.db(env.DATABASE_NAME).table("measurements").indexCreate("createdAt").run(await connect()).catch((err) => console.warn("error ignored:", err.message));
}