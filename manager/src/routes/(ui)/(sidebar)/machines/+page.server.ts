import { getMachines } from "$lib/server/services/machines";
import { createMachineSchema } from "$lib/server/validator";
import type { Machine } from "$lib/server/schema";
import { error, fail } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { connect } from "$lib/server/db";
import { ValidationError } from "yup";
import jwt from "jsonwebtoken";
import r from "rethinkdb";

export async function load({}): Promise<{ item: Array<Machine> }> {
    return { item: await getMachines() };
}

export const actions = {
    default: async function ({ request }) {
        let payload;
        try {
            payload = await createMachineSchema.validate(
                Object.fromEntries((await request.formData()).entries())
            );
        } catch (err) {
            if (err instanceof ValidationError)
                return fail(400, {
                    errors: {
                        name: err.message
                    }
                });
            throw error(500, <Error>err);
        }

        const insertedData = { name: payload.name, createdAt: new Date(), updatedAt: new Date() };
        const results = await r
            .db("server-vigil")
            .table("machines")
            .insert(insertedData)
            .run(await connect());

        if (results.inserted) {
            const data = { ...insertedData, id: results.generated_keys[0] };
            const token = jwt.sign({ machine: data }, env.JWT_SECRET_KEY, { expiresIn: "30d" });

            return {
                item: {
                    machine: { ...data, id: results.generated_keys[0] },
                    token
                }
            };
        }

        throw error(500, { message: "Database error" });
    }
};
