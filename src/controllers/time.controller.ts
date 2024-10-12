import { NextFunction, Request, Response } from "express";
import { timeService } from "../services";

async function getTimeInSeconds(req: Request, res: Response, next: NextFunction) {
    try {
        const timeSeconds = await timeService.getTimeInSeconds();

        res.send({timeInSeconds: timeSeconds});
    } catch (error) {
        next(error);
    }
}

export default {
    getTimeInSeconds
}