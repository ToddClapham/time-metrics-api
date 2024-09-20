import 'reflect-metadata';  // Import reflect-metadata before anything else
import app from '../../app';
import request from 'supertest';

import { DataSource } from 'typeorm';
import { CourseEntity } from '../../entities/course.entity';
import { SessionEntity } from '../../entities/session.entity';

let server: any;
let testDataSource: DataSource;

beforeAll(async () => {
    // testDataSource = new DataSource({
    //     type: "sqlite",
    //     database: ':memory:',
    //     synchronize: true,
    //     logging: false,
    //     entities: [ SessionEntity, CourseEntity ],
    // })
    // await testDataSource.initialize()
});

afterAll(async () => {
    // await testDataSource.destroy();
});

describe('API Routes', () => {
    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown-route');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Route not found');
    });

    // it("should create a new session", async () => {
    //     const response = await request(app)
    //       .post("/api/courses/course-123")
    //       .send({ 
    //         totalModulesStudied: 5,
    //         averageScore: 80,
    //         timeStudied: 120,
    //        });
    
    //     expect(response.status).toBe(201);
    //     expect(response.body.totalModulesStudied).toBe(5);
    //     expect(response.body.averageScore).toBe(80);
    //   });
    
    //   it("should fetch all stats for a course", async () => {
    //     await request(app)
    //       .get("/api/courses/course-123")
    
    //     const response = await request(app).get("/api/courses/course-123");
    
    //     expect(response.status).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    //   });

    // it("should fetch a session", async () => {
        //     await request(app)
        //       .get("/api/courses/course-123/sessions/session-456")
        
        //     const response = await request(app).get("/api/courses/course-123/sessions/session-456");
        
        //     expect(response.status).toBe(200);
        //     expect(response.body.length).toBeGreaterThan(0);
        //   });
});