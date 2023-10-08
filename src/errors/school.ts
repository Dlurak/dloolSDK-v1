export class SchoolError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SchoolError';
    }
}
