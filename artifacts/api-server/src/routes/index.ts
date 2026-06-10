import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import coursesRouter from "./courses";
import examsRouter from "./exams";
import teachersRouter from "./teachers";
import blogRouter from "./blog";
import testimonialsRouter from "./testimonials";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(coursesRouter);
router.use(examsRouter);
router.use(teachersRouter);
router.use(blogRouter);
router.use(testimonialsRouter);

export default router;
