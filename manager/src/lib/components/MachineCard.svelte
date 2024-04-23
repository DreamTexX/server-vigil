<script lang="ts" context="module">
    export interface Machine {
        id: string;
        name: string;
        hostname: string;
        lastPing: Date;
        group: string;
    }
</script>

<script lang="ts">
    import { Badge, Card, Dropdown, DropdownItem, ToolbarButton, Tooltip } from "flowbite-svelte";
    import { DotsVerticalOutline } from "flowbite-svelte-icons";
    import { format, formatDistance, differenceInMinutes } from "date-fns";
    import { onDestroy } from "svelte";

    export let machine: Machine;

    let now: Date = new Date();
    let ticker = setInterval(() => (now = new Date()), 30000);

    onDestroy(() => {
        clearInterval(ticker);
    });
</script>

<Card size="none" padding="md">
    <div class="flex items-center justify-between gap-2">
        <div class="flex w-full justify-between gap-2">
            <a href="/machines/{machine.id}">
                <h5 class="text-lg font-bold text-gray-900 dark:text-white">
                    {machine.name}
                </h5>
            </a>
            <div>
                <Badge color={differenceInMinutes(now, machine.lastPing) <= 5 ? "green" : "red"}>
                    Last Ping: {formatDistance(machine.lastPing, now, { includeSeconds: true })} ago
                </Badge>
                <Tooltip placement="bottom">
                    {format(machine.lastPing, "PPpp")}
                </Tooltip>
            </div>
        </div>
        <div>
            <ToolbarButton>
                <DotsVerticalOutline></DotsVerticalOutline>
            </ToolbarButton>
            <Dropdown placement="bottom-end">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
            </Dropdown>
        </div>
    </div>
    <hr class="my-2" />
    <div>
        <Badge color="dark">
            <span class="font-bold">Group:</span>
            &nbsp;{machine.group}
        </Badge>
        <Badge color="dark">
            <span class="font-bold">Hostname:</span>
            &nbsp;{machine.hostname}
        </Badge>
    </div>
</Card>
