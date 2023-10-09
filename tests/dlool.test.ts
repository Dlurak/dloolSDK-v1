import { expect, it, describe } from 'vitest';
import { Dlool } from '../src/index';

describe('dlool', () => {
    const dlool = new Dlool();

    it('should be a valid dlool instance', () => {
        expect(dlool).toBeDefined();
    });

    it('should have a homework property', () => {
        expect(dlool.homework).toBeDefined();
    });

    it('should have a baseUrl that is the default', () => {
        expect(dlool.homework.baseUrl).toBe('https://dlool-backend.onrender.com');
    });
});
