import { ValidationError, type AnyObject, type ObjectSchema } from "yup";
import { error, fail, type ActionFailure } from "@sveltejs/kit";
import type { JwtPayload } from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import type { Machine } from "./schema";
import jwt from "jsonwebtoken";

export function requireMachineToken(request: Request, machineId: string): Machine {
    const authorizationHeader = request.headers.get("authorization");
    if (!authorizationHeader) {
        throw error(401, { message: "unauthorized" });
    }

    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
        throw error(401, { message: "unauthorized" });
    }

    let machine: Machine;
    try {
        machine = (<JwtPayload>jwt.verify(token, env.JWT_SECRET_KEY, { complete: false })).machine;
    } catch (err) {
        throw error(401, { message: "unauthorized" });
    }

    if (machine.id !== machineId) {
        throw error(401, { message: "unauthorized" });
    }

    return machine;
}

export async function extractAndValidateJsonPayload<T>(
    request: Request,
    schema: ObjectSchema<AnyObject>
): Promise<T> {
    try {
        return schema.validate(await request.json()) as Promise<T>;
    } catch (err) {
        throw error(500, <Error>err);
    }
}

export async function extractAndValidateFormPayload<T>(
    request: Request,
    schema: ObjectSchema<AnyObject>
): Promise<
    | { payload?: undefined; fail: ActionFailure<{ errors: { name: string | undefined } }> }
    | { payload: T; fail?: undefined }
> {
    try {
        return {
            payload: (await schema.validate(
                Object.fromEntries((await request.formData()).entries())
            )) as T
        };
    } catch (err) {
        if (err instanceof ValidationError)
            return {
                fail: fail(400, {
                    errors: {
                        name: err.message[0].toUpperCase() + err.message.substring(1) + "."
                    }
                })
            };
        throw error(500, <Error>err);
    }
}
