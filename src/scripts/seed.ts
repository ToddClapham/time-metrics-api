import { dataSource } from "../data-source";
import { CourseEntity } from "../entities/course.entity";

dataSource.initialize().then(async () => {

    // Setting up test course
    const courseRepo = dataSource.getRepository(CourseEntity);

    const newCourse = courseRepo.create({
        sessions: []
    })
    await courseRepo.save(newCourse);
});