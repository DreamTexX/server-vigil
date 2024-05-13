import {
    SignJWT,
    exportJWK,
    generateKeyPair,
    jwtVerify,
    type GenerateKeyPairResult,
    type JWTPayload,
    type KeyLike
} from "jose";
import type { Machine } from "../schema";

let KEYS: GenerateKeyPairResult<KeyLike> | undefined;
async function getKeyPair(): Promise<GenerateKeyPairResult<KeyLike>> {
    if (!KEYS) KEYS = await generateKeyPair("PS256");
    return KEYS;
}

export async function getJWKs() {
    const { publicKey } = await getKeyPair();
    return [await exportJWK(publicKey)];
}

export async function createToken(machine: Machine): Promise<string> {
    const { privateKey } = await getKeyPair();

    return new SignJWT({ machine })
        .setProtectedHeader({ alg: "PS256" })
        .setExpirationTime("30d")
        .sign(privateKey);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
    const { privateKey } = await getKeyPair();
    const { payload } = await jwtVerify(token, privateKey);

    return payload;
}
