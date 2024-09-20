import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CourseEntity } from "./course.entity"

@Entity({name: 'sessions'})
export class SessionEntity {

    @PrimaryGeneratedColumn('uuid')
    sessionId!: string
    
    @Column()
    totalModulesStudied!: number

    @Column()
    averageScore!: number

    @Column()
    timeStudied!: number

    @Column()
    userId!: string

    @ManyToOne(() => CourseEntity, course => course.sessions)
    course!: CourseEntity
}