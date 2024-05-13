import { getJWKs } from "$lib/server/services/tokens";
import { json } from "@sveltejs/kit";

export async function GET() {
    return json(await getJWKs());
}
