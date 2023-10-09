import { describe, it, afterEach, vi, expect } from 'vitest';
import { Dlool } from '../src/index';

const dlool = new Dlool();

const mockGlobalFetch = (res: any) => {
    const mockFetch = vi.fn();
    const mockResponse = {
        json: vi.fn(() => res),
    };
    mockFetch.mockResolvedValue(mockResponse);

    global.fetch = mockFetch;
};

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

        const res = await dlool.auth.login({ username: 'admin', password: 'admin' });
        expect(res.token).toBe(positiveApiResponse.token);
    });

    it('should throw an error', async () => {
        mockGlobalFetch(negativeApiResponse);

        await expect(
            (async () => {
                await dlool.auth.login({ username: 'admin', password: 'admin' });
            })(),
        ).rejects.toThrowError('Incorrect username or password');
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
