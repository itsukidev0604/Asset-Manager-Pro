import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  studentAvatar: text("student_avatar").notNull(),
  score: integer("score").notNull(),
  improvement: integer("improvement").notNull(),
  testimonialText: text("testimonial_text").notNull(),
  examType: text("exam_type").notNull(),
  monthsStudied: integer("months_studied"),
});

export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonialsTable.$inferSelect;
