import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const examsTable = pgTable("exams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  subject: text("subject").notNull(),
  difficulty: text("difficulty").notNull(),
  questionsCount: integer("questions_count").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  attemptCount: integer("attempt_count").notNull().default(0),
  isFree: boolean("is_free").notNull().default(false),
  year: integer("year"),
  description: text("description"),
  questions: jsonb("questions"),
});

export const insertExamSchema = createInsertSchema(examsTable).omit({ id: true });
export type InsertExam = z.infer<typeof insertExamSchema>;
export type Exam = typeof examsTable.$inferSelect;
