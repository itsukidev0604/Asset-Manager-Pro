import { pgTable, text, serial, integer, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  teacherName: text("teacher_name").notNull(),
  teacherAvatar: text("teacher_avatar").notNull(),
  rating: real("rating").notNull().default(0),
  studentsCount: integer("students_count").notNull().default(0),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  category: text("category").notNull(),
  thumbnail: text("thumbnail").notNull(),
  level: text("level").notNull(),
  lessonsCount: integer("lessons_count"),
  durationHours: integer("duration_hours"),
  description: text("description"),
  whatYouLearn: text("what_you_learn").array(),
  curriculum: jsonb("curriculum"),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;
