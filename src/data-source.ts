import 'reflect-metadata';  // Import reflect-metadata before anything else
import { DataSource } from "typeorm";
import path from "path";
import { SessionEntity } from "./entities/session.entity";
import { CourseEntity } from "./entities/course.entity";

const entities = [
    SessionEntity,
    CourseEntity
]

export const dataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, '../database.sqlite'),
    synchronize: true,
    logging: false,
    entities: entities,
})
