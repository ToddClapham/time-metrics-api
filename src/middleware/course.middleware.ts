import { Request, Response, NextFunction } from "express";
import { courseService } from "../services";

async function attachCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId: string = req.params.courseId;

        const course = await courseService.getCourse(courseId);

        res.locals.course = course;

        next();

    } catch (error) {
        next(error);
    }
}

export default {
    attachCourse
}