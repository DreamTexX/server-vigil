import type { JwtPayload } from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import type { Machine } from "./schema";
import type { ObjectSchema } from "yup";
import { error } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export function requireMachineToken(request: Request, machineId: string): Machine {
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

    if (machine.id !== machineId) {
        throw error(401, { message: "unauthorized" });
    }

    return machine;
}

export async function extractAndValidateJsonPayload<T>(
    request: Request,
    schema: ObjectSchema<any>
): Promise<T> {
    try {
        return (await schema.validate(await request.json())) as T;
    } catch (err) {
        throw error(500, <Error>err);
    }
}
