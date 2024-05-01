import { subscribeMeasurements } from "$lib/server/services/measurements";
import type { Changes, RethinkDBError } from "rethinkdb-ts";
import type { Measurement } from "$lib/server/schema";

export async function GET() {
    try {
        const cursor = await subscribeMeasurements();
        let isOpen = true;
        const stream = new ReadableStream({
            start: (controller) => {
                cursor.each(
                    (err: RethinkDBError | undefined, row: Changes<Measurement>) => {
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
