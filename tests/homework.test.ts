import { expect, it, describe, vi, afterEach } from 'vitest';
import { Dlool } from '../src/index';
import { Homework, NewHomework } from '../src/types/homework';
import { isHomework } from './validate/isHomework';
import { mockGlobalFetch, mockOneGlobalFetch } from './utils/mockGlobalFetch';
import { mock } from 'node:test';

const dlool = new Dlool();

describe(
    'getAllHomework',
    () => {
        it('should throw an school is invalid error', async () => {
            const obj = {
                school: 'invalid',
                class: 'invalid',
            };

            await expect(
                (async () => {
                    await dlool.homework.getAllHomework(obj);
                })(),
            ).rejects.toThrowError(`The school ${obj.school} does not exist`);
        });

        it('should throw an class is invalid error', async () => {
            const obj = {
                school: 'Ernst-Ludwig-Schule',
                class: 'invalid',
            };

            await expect(
                (async () => {
                    await dlool.homework.getAllHomework(obj);
                })(),
            ).rejects.toThrowError(`The school ${obj.school} does not have the class ${obj.class}`);
        });

        it('should have the right format', async () => {
            const obj = {
                school: 'Ernst-Ludwig-Schule',
                class: '9c',
            };

            const res = await dlool.homework.getAllHomework(obj);
            expect(res).toBeDefined();

            // @ts-expect-error
            isHomework(res.homework);
        });
    },
    {
        timeout: 1000 * 45,
    },
);

describe('getPagedHomework', () => {
    it('should throw an school is invalid error', async () => {
        const obj = {
            school: 'invalid',
            class: 'invalid',
            page: 1,
            limit: 1,
        };

        await expect(
            (async () => {
                await dlool.homework.getPagedHomework(obj);
            })(),
        ).rejects.toThrowError(`The school ${obj.school} does not exist`);
    });

    it('should throw an class is invalid error', async () => {
        const obj = {
            school: 'Ernst-Ludwig-Schule',
            class: 'invalid',
            page: 1,
            limit: 1,
        };

        await expect(
            (async () => {
                await dlool.homework.getPagedHomework(obj);
            })(),
        ).rejects.toThrowError(`The school ${obj.school} does not have the class ${obj.class}`);
    });

    it('should throw an page must be greater than 0 error', async () => {
        const obj = {
            school: 'Ernst-Ludwig-Schule',
            class: '9c',
            page: 0,
            limit: 1,
        };

        await expect(
            (async () => {
                await dlool.homework.getPagedHomework(obj);
            })(),
        ).rejects.toThrowError('page must be greater than 0');
    });

    it('should throw an limit must be greater than 0 error', async () => {
        const obj = {
            school: 'Ernst-Ludwig-Schule',
            class: '9c',
            page: 1,
            limit: 0,
        };

        await expect(
            (async () => {
                await dlool.homework.getPagedHomework(obj);
            })(),
        ).rejects.toThrowError('limit must be greater than 0');
    });

    it('should have the right format', async () => {
        const obj = {
            school: 'Ernst-Ludwig-Schule',
            class: '9c',
            page: 1,
            limit: 2,
        };

        const res = await dlool.homework.getPagedHomework(obj);

        const totalPageCount = res?.totalPageCount as number;
        expect(totalPageCount).toBeTypeOf('number');
        expect(totalPageCount).toBeGreaterThan(0);

        const homework = res?.homework as Homework[];

        isHomework(homework);
    });
});

describe('createHomework', () => {
    const positiveLoginResponse = {
        status: 'success',
        message: 'Login successful',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRsdXJhayIsImlhdCI6MTY5Njg2ODcwMSwiZXhwIjoxNjk2ODcyMzAxfQ.Strzn_wklTQgFC7l34bRnb0Skk5TmlhWN3Gx_lY296Q',
    };
    const successResponse = {
        status: 'success',
        message: 'Homework created',
        data: {
            creator: 'Creator ID',
            class: 'Class ID',
            createdAt: 0,
            _id: 'Homework ID',
            assignments: [
                {
                    subject: 'Math',
                    description: 'Finish book page 42',
                    due: {
                        year: 2023,
                        month: 6,
                        day: 27,
                    },
                },
            ],
        },
    };

    const positiveRequest: NewHomework = {
        from: {
            day: 1,
            month: 1,
            year: 2021,
        },
        assignments: [
            {
                subject: 'test',
                description: 'test',
                due: {
                    day: 1,
                    month: 1,
                    year: 2021,
                },
            },
        ],
        className: '9c',
    };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should create a homework', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockOneGlobalFetch(successResponse);
        const result = await dlool.homework.createHomework(positiveRequest);

        expect(result).toBeDefined();
        expect(result?.classId).toBe('Class ID');
        expect(result?.creatorId).toBe('Creator ID');
        expect(result?.homeworkId).toBe('Homework ID');
        expect(result?.createdAt.toISOString()).toBe(new Date(0).toISOString());
    });

    it('should throw an error when the token is invalid', async () => {
        const dlool = new Dlool();

        await expect(async () => {
            await dlool.homework.createHomework(positiveRequest);
        }).rejects.toThrowError();
    });
});
