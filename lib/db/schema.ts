
import { pgTable, text, timestamp, uuid, jsonb, integer, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").default("Staff"),
  department: text("department"),
  status: text("status").default("Active"),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: text("action").notNull(), // CREATE, UPDATE, DELETE, etc.
  entity: text("entity").notNull(), // Employee, Requisition, etc.
  entityId: text("entity_id").notNull(),
  actorId: text("actor_id"),
  actorName: text("actor_name"),
  details: text("details"),
  metadata: jsonb("metadata"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// We can add other tables incrementally as we migrate modules
