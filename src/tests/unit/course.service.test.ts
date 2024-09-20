import { Repository } from "typeorm";
import { CourseEntity } from "../../entities/course.entity";
import { CourseService } from "../../services/course.service";
import { SessionEntity } from "../../entities/session.entity";

describe('CourseService unit test', () => {
    let courseService: CourseService;
    let courseRepoMock: jest.Mocked<Repository<CourseEntity>>;
    let sessionRepoMock: jest.Mocked<Repository<SessionEntity>>;

    beforeEach(() => {
        // reset the mocks before each test
        jest.clearAllMocks();

        // Create a mock repository
        courseRepoMock = {
            findOne: jest.fn(),
        } as unknown as jest.Mocked<Repository<CourseEntity>>;
        sessionRepoMock = {
            find: jest.fn(),
        } as unknown as jest.Mocked<Repository<SessionEntity>>;
  
        // Inject the mock repository into the service
        courseService = new CourseService(courseRepoMock, sessionRepoMock);
    });

    it('should calculate the correct course stats from the sessions', async () => {
        // Arrange: Mocking the data returned by the repository
        const mockCourse: CourseEntity = { courseId: 'course-123' } as CourseEntity;
        const mockSessions: SessionEntity[] = [
            { sessionId: 'session-123', totalModulesStudied: 5, averageScore: 80, timeStudied: 120, userId: 'test-user', course: mockCourse } as SessionEntity,
            { sessionId: 'session-456', totalModulesStudied: 3, averageScore: 85, timeStudied: 100, userId: 'test-user', course: mockCourse } as SessionEntity,
        ];

        // Act: Call the function
        const result = courseService.calculateCourseStats(mockSessions);

        // Assert: Check the results
        expect(result).toEqual({
            totalModulesStudied: 8,         // 5 + 3
            averageScore: 82.5,             // (80 + 85) / 2
            timeStudied: 220                // 120 + 100
        });
    });
});