export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

export const notAuthenticated = new AuthError('You must be logged in to perform this action');
