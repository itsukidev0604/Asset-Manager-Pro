import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { ListTestimonialsResponse } from "@workspace/api-zod";

const router = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const rows = await db.select().from(testimonialsTable);
  const result = rows.map(r => ({
    id: r.id,
    studentName: r.studentName,
    studentAvatar: r.studentAvatar,
    score: r.score,
    improvement: r.improvement,
    testimonialText: r.testimonialText,
    examType: r.examType,
    monthsStudied: r.monthsStudied ?? null,
  }));
  res.json(ListTestimonialsResponse.parse(result));
});

export default router;
