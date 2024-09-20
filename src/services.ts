import { dataSource } from "./data-source";
import { CourseEntity } from "./entities/course.entity";
import { SessionEntity } from "./entities/session.entity";
import { CourseService } from "./services/course.service";
import { SessionService } from "./services/session.service";

export const courseService = new CourseService(
    dataSource.getRepository(CourseEntity),
    dataSource.getRepository(SessionEntity),
);

export const sessionService = new SessionService(
    dataSource.getRepository(SessionEntity),
);