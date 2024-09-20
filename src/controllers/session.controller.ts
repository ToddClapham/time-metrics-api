import { NextFunction, Request, Response } from "express";
import { NewSessionDTO } from "../interfaces/newSessionDTO";
import { sessionService } from "../services";
import { Session } from "../models/session";

async function saveSession(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionToSave: NewSessionDTO = req.body;
        const course = res.locals.course;
        const userId: string = req.headers['userid'] as string;

        const savedSession = await sessionService.saveSession(sessionToSave, course, userId);

        res.send(Session.toDTO(savedSession));
    } catch (error) {
        next(error);
    }
}

async function getSessionStats(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId: string = req.params.sessionId;
        // don't actually need the userid to get session details
        // but may be good to include in future for security (checking a user isn't accessing someone else's session)
        
        const sessionStats = await sessionService.getSessionStats(sessionId);

        res.send(sessionStats);
    } catch (error) {
        next(error);
    }
}

export default {
    saveSession,
    getSessionStats
}