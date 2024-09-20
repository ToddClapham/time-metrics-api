import * as express from "express";
const router = express.Router();
const json = express.json();

import courseMiddleware from "../middleware/course.middleware";

import sessionController from "../controllers/session.controller";
import courseController from "../controllers/course.controller";

router.use( '/courses/:courseId', courseMiddleware.attachCourse);

router.post('/courses', json, courseController.createCourse);
router.post('/courses/:courseId', json, sessionController.saveSession);
router.get( '/courses/:courseId', courseController.getCourseStats);
router.get( '/courses/:courseId/sessions/:sessionId', sessionController.getSessionStats);

export default router;