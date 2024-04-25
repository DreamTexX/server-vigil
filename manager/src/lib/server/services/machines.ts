import { type Machine, machinesTable } from "$lib/server/schema";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";

export async function getMachine(id: string): Promise<Machine | undefined> {
    let machines: Array<Machine> = await db().select().from(machinesTable).where(eq(machinesTable.id, id));
    if (machines.length <= 0) {
        return undefined;
    }

    return machines[0];
}

export async function getMachines(): Promise<Array<Machine>> {
    let machines: Array<Machine> = await db().select().from(machinesTable);
    return machines;
}

export async function deleteMachine(id: string): Promise<void> {
    await db().delete(machinesTable).where(eq(machinesTable.id, id));
}