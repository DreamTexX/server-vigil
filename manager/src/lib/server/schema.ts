export type Machine = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Measurement = {
    id: string;
    hostname: string;
    memTotal: number;
    memAvailable: number;
    machineId: string;
    createdAt: Date;
};
