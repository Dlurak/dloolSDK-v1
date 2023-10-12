import { expect, it, describe } from 'vitest';
import { Dlool } from '../src/index';
import { Auth } from '../src/resources/auth';
import { Homework } from '../src/resources/homework';

describe('dlool', () => {
    const dlool = new Dlool();

    it('should be a valid dlool instance', () => {
        expect(dlool).toBeDefined();
    });

    it('should have all (default) properties', () => {
        expect(dlool.homework).toBeInstanceOf(Homework);
        expect(dlool.auth).toBeInstanceOf(Auth);
        expect(dlool.baseUrl).toBe('https://dlool-backend.onrender.com');
    });

    it("should return false when the service isn't a Dlool instance", async () => {
        const dlool = new Dlool({ baseUrl: 'https://google.com', token: undefined });
        expect(await dlool.validateBaseUrl()).toBe(false);
    });
});
