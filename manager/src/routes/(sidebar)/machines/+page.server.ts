import { db } from "$lib/server/db.js";
import { machinesTable, type Machine } from "$lib/server/schema";
import { fail, type ActionFailure, type ActionResult } from "@sveltejs/kit";
import { PostgresError } from "postgres";
import { make } from "simple-body-validator";

export async function load({ }): Promise<{ items: Array<Machine> }> {
    let machines: Array<Machine> = await db().select().from(machinesTable);

    return { items: machines };
}

export const actions = {
    default: async function ({ request }): Promise<{ items: Array<Machine> } | ActionFailure<{ errors: { name?: string, other?: string } }>> {
        let payload = Object.fromEntries((await request.formData()).entries()) as { name: string };
        let validator = make(payload, {
            name: "required|string|min:1|max:32"
        });
        if (!validator.validate()) {
            return fail(400, {
                errors: {
                    name: validator.errors().first("name") as string | undefined
                }
            });
        }

        try {
            const machine = await db().insert(machinesTable).values({ name: payload.name }).returning();

            return {
                items: machine
            };
        } catch (error) {
            if ((error as Error).name === "PostgresError") {
                if ((error as PostgresError).constraint_name === "machines_name_unique") {
                    return fail(400, {
                        errors: {
                            name: "This name is already in use."
                        }
                    });
                }
            }

            return fail(400, {
                errors: {
                    other: (error as Error).message as string | undefined
                }
            })
        }
    }
}