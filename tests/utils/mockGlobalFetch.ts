import { vi } from 'vitest';

export const mockGlobalFetch = (res: any) => {
    const mockFetch = vi.fn();
    const mockResponse = {
        json: vi.fn(() => res),
    };
    mockFetch.mockResolvedValue(mockResponse);

    global.fetch = mockFetch;
};

export const mockOneGlobalFetch = (res: any) => {
    const mockFetch = vi.fn();
    const mockResponse = {
        json: vi.fn(() => res),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    global.fetch = mockFetch;
};
