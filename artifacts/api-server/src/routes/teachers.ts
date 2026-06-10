import { Router } from "express";
import { db, teachersTable, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListTeachersResponse,
  GetTeacherParams,
  GetTeacherResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/teachers", async (_req, res): Promise<void> => {
  const rows = await db.select().from(teachersTable);
  const result = rows.map(r => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar,
    specialization: r.specialization,
    experienceYears: r.experienceYears,
    studentsCount: r.studentsCount,
    bio: r.bio,
    rating: r.rating ?? null,
  }));
  res.json(ListTeachersResponse.parse(result));
});

router.get("/teachers/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetTeacherParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [teacher] = await db.select().from(teachersTable).where(eq(teachersTable.id, params.data.id));
  if (!teacher) {
    res.status(404).json({ error: "Teacher not found" });
    return;
  }

  const courseRows = await db.select().from(coursesTable).where(eq(coursesTable.teacherName, teacher.name));

  const result = {
    id: teacher.id,
    name: teacher.name,
    avatar: teacher.avatar,
    specialization: teacher.specialization,
    experienceYears: teacher.experienceYears,
    studentsCount: teacher.studentsCount,
    bio: teacher.bio,
    rating: teacher.rating ?? null,
    courses: courseRows.map(r => ({
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
    })),
  };

  res.json(GetTeacherResponse.parse(result));
});

export default router;
