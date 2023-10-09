import { describe, it, afterEach, vi, expect } from 'vitest';
import { Dlool } from '../src/index';
import { mockGlobalFetch } from './utils/mockGlobalFetch';

const dlool = new Dlool();

describe('Login', () => {
    const positiveApiResponse = {
        status: 'success',
        message: 'Login successful',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRsdXJhayIsImlhdCI6MTY5Njg2ODcwMSwiZXhwIjoxNjk2ODcyMzAxfQ.Strzn_wklTQgFC7l34bRnb0Skk5TmlhWN3Gx_lY296Q',
    };
    const negativeApiResponse = { status: 'error', message: 'Incorrect username or password' };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should login', async () => {
        mockGlobalFetch(positiveApiResponse);
        const dlool = new Dlool();

        const res = await dlool.auth.login({ username: 'admin', password: 'admin' });
        expect(res).toBe(positiveApiResponse.token);
        expect(dlool.token).toBe(positiveApiResponse.token);
    });

    it('should throw an error', async () => {
        mockGlobalFetch(negativeApiResponse);
        const dlool = new Dlool();

        await expect(
            (async () => {
                await dlool.auth.login({ username: 'admin', password: 'admin' });
            })(),
        ).rejects.toThrowError('Incorrect username or password');
        expect(dlool.token).toBeUndefined();
    });

    it('should throw an error when it cannot request the API', async () => {
        const spy = vi.spyOn(global, 'fetch');
        spy.mockRejectedValue(new Error('Network error'));

        await expect(
            (async () => {
                await dlool.auth.login({ username: 'admin', password: 'admin' });
            })(),
        ).rejects.toThrowError();
    });
});
