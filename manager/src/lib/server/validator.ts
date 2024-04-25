import { object, string, number, type InferType } from "yup";

export const createMachineSchema = object({
    name: string().required().min(1).max(32),
});

export type CreateMachineDto = InferType<typeof createMachineSchema>;

export const createMeasurementSchema = object({
    hostname: string().required(),
    mem_total: number().required(),
    mem_available: number().required(),
});

export type CreateMeasurementDto = InferType<typeof createMachineSchema>;