import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListBlogPostsQueryParams,
  ListBlogPostsResponse,
  GetBlogPostParams,
  GetBlogPostResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/blog", async (req, res): Promise<void> => {
  const params = ListBlogPostsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const rows = await db.select().from(blogPostsTable);
  let filtered = rows;
  if (params.data.category) filtered = filtered.filter(r => r.category === params.data.category);
  if (params.data.limit) filtered = filtered.slice(0, params.data.limit);

  const result = filtered.map(r => ({
    id: r.id,
    title: r.title,
    category: r.category,
    readingTimeMinutes: r.readingTimeMinutes,
    thumbnail: r.thumbnail,
    publishedAt: r.publishedAt.toISOString(),
    excerpt: r.excerpt,
  }));

  res.json(ListBlogPostsResponse.parse(result));
});

router.get("/blog/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetBlogPostParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }

  const result = {
    id: row.id,
    title: row.title,
    category: row.category,
    readingTimeMinutes: row.readingTimeMinutes,
    thumbnail: row.thumbnail,
    publishedAt: row.publishedAt.toISOString(),
    excerpt: row.excerpt,
    content: row.content,
    authorName: row.authorName,
    authorAvatar: row.authorAvatar,
  };

  res.json(GetBlogPostResponse.parse(result));
});

export default router;
