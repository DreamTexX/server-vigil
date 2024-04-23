import { env } from "$env/dynamic/private";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let DB_INSTANCE: PostgresJsDatabase | undefined;

export function db() {
    if (!DB_INSTANCE) {
        DB_INSTANCE = drizzle(postgres(env.DATABASE_CONNECTION_URL))
    }

    return DB_INSTANCE;
}