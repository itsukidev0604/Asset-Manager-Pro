import { Router } from "express";
import { db, teachersTable, coursesTable, examsTable, testimonialsTable } from "@workspace/db";
import { count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [examCount] = await db.select({ count: count() }).from(examsTable);
  res.json({
    students: 5120,
    exams: examCount.count,
    questions: 10800,
    satisfactionRate: 95,
  });
});

export default router;
