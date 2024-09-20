import { dataSource } from "../data-source";
import { CourseEntity } from "../entities/course.entity";
import { CourseDTO } from "../interfaces/courseDTO";
import { Session } from "./session";

const courseRepo = dataSource.getRepository(CourseEntity);

export class Course {
    constructor(
        public courseId: string,
        public sessions?: Session[]
    ) {}

    static fromEntity(entity: CourseEntity): Course {
        return new Course(
            entity.courseId,
            entity.sessions ? entity.sessions.map(x => Session.fromEntity(x)) : undefined
        );
    }
    
    static toEntity(course: Course): CourseEntity {
        const entity = courseRepo.create({
            courseId: course.courseId,
            sessions: course.sessions ? course.sessions.map(x => Session.toEntity(x)) : undefined
        })
        return entity;
    }

    static toDTO(model: Course): CourseDTO {
        return {
            courseId: model.courseId,
            sessions: model.sessions ? model.sessions.map(x => Session.toDTO(x)) : undefined
        }
    }

    static fromDTO(dto: CourseDTO): Course {
        return new Course(
            dto.courseId,
            dto.sessions ? dto.sessions.map(x => Session.fromDTO(x)) : undefined
        )
    }
}
