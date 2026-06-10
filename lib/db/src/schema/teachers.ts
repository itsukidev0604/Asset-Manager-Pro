import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const teachersTable = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  specialization: text("specialization").notNull(),
  experienceYears: integer("experience_years").notNull(),
  studentsCount: integer("students_count").notNull().default(0),
  bio: text("bio").notNull(),
  rating: real("rating"),
});

export const insertTeacherSchema = createInsertSchema(teachersTable).omit({ id: true });
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type Teacher = typeof teachersTable.$inferSelect;
