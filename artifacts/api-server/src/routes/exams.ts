import { Router } from "express";
import { db, examsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListExamsQueryParams,
  ListExamsResponse,
  GetExamParams,
  GetExamResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/exams", async (req, res): Promise<void> => {
  const params = ListExamsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const rows = await db.select().from(examsTable);
  let filtered = rows;
  if (params.data.type) filtered = filtered.filter(r => r.type === params.data.type);
  if (params.data.subject) filtered = filtered.filter(r => r.subject === params.data.subject);
  if (params.data.difficulty) filtered = filtered.filter(r => r.difficulty === params.data.difficulty);

  const result = filtered.map(r => ({
    id: r.id,
    title: r.title,
    type: r.type,
    subject: r.subject,
    difficulty: r.difficulty,
    questionsCount: r.questionsCount,
    durationMinutes: r.durationMinutes,
    attemptCount: r.attemptCount,
    isFree: r.isFree,
    year: r.year ?? null,
  }));

  res.json(ListExamsResponse.parse(result));
});

router.get("/exams/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetExamParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db.select().from(examsTable).where(eq(examsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Exam not found" });
    return;
  }

  type QuestionShape = { id: number; text: string; options: string[]; correctOptionIndex: number; explanation?: string | null };
  const result = {
    id: row.id,
    title: row.title,
    type: row.type,
    subject: row.subject,
    difficulty: row.difficulty,
    questionsCount: row.questionsCount,
    durationMinutes: row.durationMinutes,
    attemptCount: row.attemptCount,
    isFree: row.isFree,
    year: row.year ?? null,
    description: row.description ?? "",
    questions: ((row.questions as QuestionShape[]) ?? []).map(q => ({
      id: q.id,
      text: q.text,
      options: q.options,
      correctOptionIndex: q.correctOptionIndex,
      explanation: q.explanation ?? null,
    })),
  };

  res.json(GetExamResponse.parse(result));
});

export default router;
