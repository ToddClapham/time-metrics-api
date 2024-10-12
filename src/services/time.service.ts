export class TimeService {
    async getTimeInSeconds(): Promise<number> {
        return Math.floor(Date.now() / 1000);
    }
}