import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { measurementsTable, type Machine } from "$lib/server/schema";
import { createMeasurementSchema } from "$lib/server/validator";
import { error, json } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function GET({ params }) {
    return json(await db()
        .select()
        .from(measurementsTable)
        .where(eq(measurementsTable.machineId, params.machine_id))
        .orderBy(desc(measurementsTable.createdAt))
    );
}

export async function POST({ request, params }) {
    let payload;
    try {
        payload = await createMeasurementSchema.validate(await request.json());
    } catch (err) {
        throw error(500, (<Error>err));
    }

    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
        throw error(401, { message: "unauthorized" });
    }

    let [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
        throw error(401, { message: "unauthorized" });
    }

    let machine: Machine;
    try {
        machine = (<JwtPayload>jwt.verify(token, env.JWT_SECRET_KEY, { complete: false })).machine;
    } catch (err) {
        throw error(401, { message: "unauthorized" });
    }

    if (machine.id !== params.machine_id) {
        throw error(401, { message: "unauthorized" });
    }

    let measurements = await db()
        .insert(measurementsTable)
        .values({
            hostname: payload.hostname,
            mem_available: payload.mem_available,
            mem_total: payload.mem_total,
            machineId: machine.id
        })
        .returning();

    return json(measurements[0]);
}