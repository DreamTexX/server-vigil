import { subscribeMeasurementByMachineId } from "$lib/server/services/measurements";
import type { RethinkDBError } from "rethinkdb-ts";

export async function GET({ params }) {
    try {
        const cursor = await subscribeMeasurementByMachineId(params.machine_id);
        let isOpen = true;
        const stream = new ReadableStream({
            start: (controller) => {
                cursor.each(
                    (err: RethinkDBError | undefined, row: any) => {
                        if (!isOpen) return;
                        if (err) {
                            controller.error(err);
                        } else {
                            if (row.new_val) {
                                controller.enqueue(`data: ${JSON.stringify(row.new_val)}\n\n`);
                            }
                        }
                    },
                    () => {
                        if (isOpen) controller.close();
                    }
                );
            },
            cancel: async () => {
                isOpen = false;
                await cursor.close();
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                Connection: "keep-alive",
                "Cache-Control": "no-cache"
            }
        });
    } catch (err) {
        console.error(err);
    }
}
