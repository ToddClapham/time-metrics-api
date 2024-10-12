import { TimeService } from '../../services/time.service';

describe('TimeService Unit Tests', () => {
    let timeService: TimeService;

    beforeEach(() => {
        timeService = new TimeService();
    });

    it('should return the current time in seconds', async () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const timeInSeconds = await timeService.getTimeInSeconds();
        expect(timeInSeconds).toBeCloseTo(currentTimeInSeconds, 0);
    });

    it('should return a number', async () => {
        const timeInSeconds = await timeService.getTimeInSeconds();
        expect(typeof timeInSeconds).toBe('number');
    });

    it('should return a positive number', async () => {
        const timeInSeconds = await timeService.getTimeInSeconds();
        expect(timeInSeconds).toBeGreaterThan(0);
    });
});