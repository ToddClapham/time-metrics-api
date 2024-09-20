import { Repository } from "typeorm";
import { CourseEntity } from "../entities/course.entity";
import { Course } from "../models/course";
import { CourseStatsDTO } from "../interfaces/courseStatsDTO";
import { SessionEntity } from "../entities/session.entity";

export class CourseService {

    constructor(
        private readonly courseRepo: Repository<CourseEntity>,
        private readonly sessionRepo: Repository<SessionEntity>
    ) {}

    async createCourse(courseId: string): Promise<Course> {

        const courseEntity = this.courseRepo.create({
            courseId: courseId
        });
        await this.courseRepo.save(courseEntity);
        
        return Course.fromEntity(courseEntity);
    }

    async getCourse(courseId: string): Promise<Course> {

        const courseEntity = await this.courseRepo.findOne({
            where: {courseId: courseId}
        });
        if (!courseEntity) throw new Error("Course not found");
        
        return Course.fromEntity(courseEntity);
    }

    async getCourseStats(userId: string): Promise<CourseStatsDTO> {

        const sessionEntities = await this.sessionRepo.find({
            where: {
                userId: userId,
            }
        });

        const courseStats = this.calculateCourseStats(sessionEntities);

        return courseStats;
    }
    
    calculateCourseStats(sessions: SessionEntity[]): CourseStatsDTO {
        const totalModulesStudied = sessions.reduce((total, session) => total + session.totalModulesStudied, 0);
        const totalScore = sessions.reduce((total, session) => total + session.averageScore, 0);
        const averageScore = totalScore === 0 ? 0 : totalScore / sessions.length;
        const timeStudied = sessions.reduce((total, session) => total + session.timeStudied, 0);

        const courseStats: CourseStatsDTO = {
            totalModulesStudied: totalModulesStudied,
            averageScore: averageScore,
            timeStudied: timeStudied
        }

        return courseStats;
    }

}