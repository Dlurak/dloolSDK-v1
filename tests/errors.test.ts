import { expect, it, describe } from 'vitest';
import { ClassError, SchoolError } from '../src';

describe('ClassError', () => {
    it('should set the name property correctly', () => {
        const error = new ClassError('Test error message');
        expect(error.name).toBe('ClassError');
    });

    it('should set the message property correctly', () => {
        const errorMessage = 'Test error message';
        const error = new ClassError(errorMessage);
        expect(error.message).toBe(errorMessage);
    });
});

describe('SchoolError', () => {
    it('should set the name property correctly', () => {
        const error = new SchoolError('Test error message');
        expect(error.name).toBe('SchoolError');
    });

    it('should set the message property correctly', () => {
        const errorMessage = 'Test error message';
        const error = new SchoolError(errorMessage);
        expect(error.message).toBe(errorMessage);
    });
});
