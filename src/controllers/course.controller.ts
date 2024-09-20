import { NextFunction, Request, Response } from "express";
import { courseService } from "../services";
import { Course } from "../models/course";

async function createCourse(req: Request, res: Response, next: NextFunction) {
    try {
        const courseId: string = req.headers['courseid'] as string;

        const newCourse = await courseService.createCourse(courseId);

        res.send(Course.toDTO(newCourse));
    } catch (error) {
        next(error);
    }
}

async function getCourseStats(req: Request, res: Response, next: NextFunction) {
    try {
        const userId: string = req.headers['userId'] as string;

        const courseStats = await courseService.getCourseStats(userId);

        res.send(courseStats);
    } catch (error) {
        next(error);
    }
}

export default {
    createCourse,
    getCourseStats
}