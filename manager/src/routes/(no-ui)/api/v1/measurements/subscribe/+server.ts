import { subscribeMeasurements } from "$lib/server/services/measurements";

export async function GET({}) {
    const cursor = await subscribeMeasurements();

    return new Response(
        new ReadableStream({
            start: (controller) => {
                cursor.each((err: Error, row: any) => {
                    if (err) {
                        controller.error(err);
                    } else {
                        if (row.new_val) {
                            controller.enqueue(`data: ${JSON.stringify(row.new_val)}\n\n`);
                        }
                    }
                }, controller.close);
            },
            cancel: () => {
                cursor.close();
            }
        }),
        {
            headers: {
                "Content-Type": "text/event-stream",
                Connection: "keep-alive",
                "Cache-Control": "no-cache"
            }
        }
    );
}
