import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  readingTimeMinutes: integer("reading_time_minutes").notNull(),
  thumbnail: text("thumbnail").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar").notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
