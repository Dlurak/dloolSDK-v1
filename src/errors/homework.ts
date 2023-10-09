export class HomeworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HomeworkError';
    }
}
