import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SessionEntity } from "./session.entity"

@Entity({name: 'courses'})
export class CourseEntity {

    @PrimaryGeneratedColumn('uuid')
    courseId!: string

    @OneToMany(() => SessionEntity, session => session.course)
    sessions!: SessionEntity[]
}