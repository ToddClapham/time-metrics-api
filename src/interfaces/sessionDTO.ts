import { CourseDTO } from "./courseDTO";

export interface SessionDTO {
    sessionId: string;
    totalModulesStudied: number;
    averageScore: number;
    timeStudied: number;
    userId: string;
    course?: CourseDTO;
}