import { dataSource } from "../data-source";
import { SessionEntity } from "../entities/session.entity";
import { SessionDTO } from "../interfaces/sessionDTO";
import { Course } from "./course";

const sessionRepo = dataSource.getRepository(SessionEntity);

export class Session {
    constructor(
        public sessionId: string,
        public totalModulesStudied: number,
        public averageScore: number,
        public timeStudied: number,
        public userId: string,
        public course?: Course
    ) {}

    static fromEntity(entity: SessionEntity): Session {
        return new Session(
            entity.sessionId,
            entity.totalModulesStudied,
            entity.averageScore,
            entity.timeStudied,
            entity.userId,
            entity.course ? Course.fromEntity(entity.course) : undefined
        );
    }
    
    static toEntity(session: Session): SessionEntity {
        const entity = sessionRepo.create({
            sessionId: session.sessionId,
            totalModulesStudied: session.totalModulesStudied,
            averageScore: session.averageScore,
            timeStudied: session.timeStudied,
            userId: session.userId,
            course: session.course ? Course.toEntity(session.course) : undefined
        })
        return entity;
    }

    static toDTO(model: Session): SessionDTO {
        return {
            sessionId: model.sessionId,
            totalModulesStudied: model.totalModulesStudied,
            averageScore: model.averageScore,
            timeStudied: model.timeStudied,
            userId: model.userId,
            course: model.course ? Course.toDTO(model.course) : undefined
        }
    }

    static fromDTO(dto: SessionDTO): Session {
        return new Session(
            dto.sessionId,
            dto.totalModulesStudied,
            dto.averageScore,
            dto.timeStudied,
            dto.userId,
            dto.course ? Course.fromDTO(dto.course) : undefined
        )
    }
}