import { SessionDTO } from "./sessionDTO";

export interface CourseDTO {
    courseId: string;
    sessions?: SessionDTO[];
}