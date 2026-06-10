import { Router } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListCoursesQueryParams,
  ListCoursesResponse,
  GetCourseParams,
  GetCourseResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/courses", async (req, res): Promise<void> => {
  const params = ListCoursesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const rows = await db.select().from(coursesTable);
  let filtered = rows;
  if (params.data.category) {
    filtered = rows.filter(r => r.category === params.data.category);
  }
  if (params.data.limit) {
    filtered = filtered.slice(0, params.data.limit);
  }

  const result = filtered.map(r => ({
    id: r.id,
    title: r.title,
    teacherName: r.teacherName,
    teacherAvatar: r.teacherAvatar,
    rating: r.rating,
    studentsCount: r.studentsCount,
    price: r.price,
    originalPrice: r.originalPrice ?? null,
    category: r.category,
    thumbnail: r.thumbnail,
    level: r.level,
    lessonsCount: r.lessonsCount ?? null,
    durationHours: r.durationHours ?? null,
  }));

  res.json(ListCoursesResponse.parse(result));
});

router.get("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetCourseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  const result = {
    id: row.id,
    title: row.title,
    teacherName: row.teacherName,
    teacherAvatar: row.teacherAvatar,
    rating: row.rating,
    studentsCount: row.studentsCount,
    price: row.price,
    originalPrice: row.originalPrice ?? null,
    category: row.category,
    thumbnail: row.thumbnail,
    level: row.level,
    lessonsCount: row.lessonsCount ?? null,
    durationHours: row.durationHours ?? null,
    description: row.description ?? "",
    whatYouLearn: (row.whatYouLearn as string[]) ?? [],
    curriculum: (row.curriculum as Array<{ title: string; lessons: string[] }>) ?? [],
  };

  res.json(GetCourseResponse.parse(result));
});

export default router;
