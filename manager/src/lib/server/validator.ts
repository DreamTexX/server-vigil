import { object, string, type InferType } from "yup";

export const createMachineSchema = object({
    name: string().required().min(1).max(32),
});

export type CreateMachineDto = InferType<typeof createMachineSchema>;