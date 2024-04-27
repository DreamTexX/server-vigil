import { object, string, number, type InferType } from "yup";

export const createMachineSchema = object({
    name: string().required().min(1).max(32)
});

export type CreateMachineDto = InferType<typeof createMachineSchema>;

export const createMeasurementSchema = object({
    hostname: string().required(),
    memTotal: number().required(),
    memAvailable: number().required()
});

export type CreateMeasurementDto = InferType<typeof createMeasurementSchema>;
