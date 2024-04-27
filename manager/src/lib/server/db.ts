import { env } from "$env/dynamic/private";
import r from "rethinkdb";

let CACHED_CONNECTION: r.Connection | undefined = undefined;

export async function connect(): Promise<r.Connection> {
    if (CACHED_CONNECTION && CACHED_CONNECTION.open) {
        return Promise.resolve(CACHED_CONNECTION);
    }

    CACHED_CONNECTION = await r.connect(env.DATABASE_CONNECTION_URL);
    return CACHED_CONNECTION;
}
