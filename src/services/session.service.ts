import { Repository } from "typeorm";
import { SessionEntity } from "../entities/session.entity";
import { Session } from "../models/session";
import { NewSessionDTO } from "../interfaces/newSessionDTO";
import { Course } from "../models/course";
import { SessionStatsDTO } from "../interfaces/sessionStatsDTO";

export class SessionService {

    constructor(
        private readonly sessionRepo: Repository<SessionEntity>,
    ) {}

    async saveSession(newSession: NewSessionDTO, course: Course, userId: string): Promise<Session> {
        // session needs to have a course when creating so throw error if no course
        if (!course) throw new Error("Course not found for persisting session");
        const sessionEntity = this.sessionRepo.create({
            totalModulesStudied: newSession.totalModulesStudied,
            averageScore: newSession.averageScore,
            timeStudied: newSession.timeStudied,
            userId: userId,
            course: course ? Course.toEntity(course) : undefined
        });

        const savedSession = await this.sessionRepo.save(sessionEntity);

        return Session.fromEntity(savedSession);
    }

    async getSessionStats(sessionId: string): Promise<SessionStatsDTO> {
        const sessionEntity = await this.sessionRepo.findOne({
            where: {
                sessionId: sessionId,
            }
        });
        if (!sessionEntity) throw new Error("Session not found");
        
        return {
            sessionId: sessionEntity.sessionId,
            totalModulesStudied: sessionEntity.totalModulesStudied,
            averageScore: sessionEntity.averageScore,
            timeStudied: sessionEntity.timeStudied
        };
    }
}