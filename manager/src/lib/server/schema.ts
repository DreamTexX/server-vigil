import type { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const machinesTable = pgTable("machines", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 32 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Machine = InferSelectModel<typeof machinesTable>;

export const measurementsTable = pgTable("measurements", {
    id: uuid("id").defaultRandom().primaryKey(),
    hostname: varchar("hostname", { length: 128 }).notNull(),
    mem_total: integer("mem_total").notNull(),
    mem_available: integer("mem_available").notNull(),
    machineId: uuid("machine_id").references(() => machinesTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Measurement = InferSelectModel<typeof measurementsTable>;