import { env as publicEnv } from "$env/dynamic/public";
import { env } from "$env/dynamic/private";
import type { Machine } from "../schema";
import jwt from "jsonwebtoken";

export function createToken(machine: Machine) {
    return jwt.sign({ machine, baseUrl: publicEnv.PUBLIC_BASE_URL }, env.JWT_SECRET_KEY, {
        expiresIn: "30d"
    });
}
