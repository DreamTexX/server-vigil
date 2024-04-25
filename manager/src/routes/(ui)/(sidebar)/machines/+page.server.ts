import { db } from "$lib/server/db.js";
import { machinesTable, type Machine } from "$lib/server/schema";
import { error, fail } from "@sveltejs/kit";
import { PostgresError } from "postgres";
import { createMachineSchema } from "$lib/server/validator";
import { ValidationError } from "yup";
import { getMachines } from "$lib/server/services/machines.js";
import jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";

export async function load({ }): Promise<{ item: Array<Machine> }> {
    return { item: await getMachines() };
}

export const actions = {
    default: async function ({ request }) {
        let payload;
        try {
            payload = await createMachineSchema.validate(Object.fromEntries((await request.formData()).entries()));
        } catch (err) {
            if (err instanceof ValidationError)
                return fail(400, {
                    errors: {
                        name: err.message
                    }
                });
            throw error(500, (<Error>err));
        }

        try {
            const machines = await db().insert(machinesTable).values({ name: payload.name }).returning();
            const token = jwt.sign({ machine: machines[0] }, env.JWT_SECRET_KEY, { expiresIn: "30d" });

            return {
                item: {
                    machine: machines[0],
                    token
                }
            };
        } catch (err) {
            if ((err as Error).name === "PostgresError") {
                if ((err as PostgresError).constraint_name === "machines_name_unique") {
                    return fail(400, {
                        errors: {
                            name: (<string | undefined>"This name is already in use.")
                        }
                    });
                }
            }

            throw error(500, (<Error>err));
        }
    }
}