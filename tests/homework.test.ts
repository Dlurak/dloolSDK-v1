import { expect, it, describe, vi, afterEach } from 'vitest';
import { Dlool } from '../src/index';
import { Homework, NewHomework, UpdateHomework } from '../src/types/homework';
import { isHomework } from './validate/isHomework';
import { mockGlobalFetch, mockOneGlobalFetch, mockRejectGlobalFetch } from './utils/mockGlobalFetch';

const dlool = new Dlool();

const positiveLoginResponse = {
    status: 'success',
    message: 'Login successful',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRsdXJhayIsImlhdCI6MTY5Njg2ODcwMSwiZXhwIjoxNjk2ODcyMzAxfQ.Strzn_wklTQgFC7l34bRnb0Skk5TmlhWN3Gx_lY296Q',
};
const negativeLoginResponse = {
    status: 'error',
    message: 'Invalid username or password',
};

describe(
    'getAll',
    () => {
        it('should throw an school is invalid error', async () => {
            const obj = {
                school: 'invalid',
                class: 'invalid',
            };

            await expect(
                (async () => {
                    await dlool.homework.getAll(obj);
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
                    await dlool.homework.getAll(obj);
                })(),
            ).rejects.toThrowError(`The school ${obj.school} does not have the class ${obj.class}`);
        });

        it('should have the right format', async () => {
            const obj = {
                school: 'Ernst-Ludwig-Schule',
                class: '9c',
            };

            const res = await dlool.homework.getAll(obj);
            expect(res).toBeDefined();

            // @ts-expect-error
            isHomework(res.homework);
        });
    },
    {
        timeout: 1000 * 45,
    },
);

describe('getPaged', () => {
    it('should throw an school is invalid error', async () => {
        const obj = {
            school: 'invalid',
            class: 'invalid',
            page: 1,
            limit: 1,
        };

        await expect(
            (async () => {
                await dlool.homework.getPaged(obj);
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
                await dlool.homework.getPaged(obj);
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
                await dlool.homework.getPaged(obj);
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
                await dlool.homework.getPaged(obj);
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

        const res = await dlool.homework.getPaged(obj);

        const totalPageCount = res?.totalPageCount as number;
        expect(totalPageCount).toBeTypeOf('number');
        expect(totalPageCount).toBeGreaterThan(0);

        const homework = res?.homework as Homework[];

        isHomework(homework);
    });
});

describe('create', () => {
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
        const result = await dlool.homework.create(positiveRequest);

        expect(result).toBeDefined();
        expect(result?.classId).toBe('Class ID');
        expect(result?.creatorId).toBe('Creator ID');
        expect(result?.homeworkId).toBe('Homework ID');
        expect(result?.createdAt.toISOString()).toBe(new Date(0).toISOString());
    });

    it('should throw an error when the token is invalid', async () => {
        const dlool = new Dlool();

        await expect(async () => {
            await dlool.homework.create(positiveRequest);
        }).rejects.toThrowError();
    });

    it('should throw an error when the user gives invalid data', async () => {
        const dlool = new Dlool();

        const invalidFrom = {
            ...positiveRequest,
            from: {
                day: 1,
                month: 1,
                year: 0,
            },
        };
        const invalidAssignments = {
            ...positiveRequest,
            assignments: [],
        };

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        await expect(async () => {
            await dlool.homework.create(invalidFrom);
        }).rejects.toThrowError('The from field is not a valid date');

        await expect(async () => {
            await dlool.homework.create(invalidAssignments);
        }).rejects.toThrowError('The assignments field is empty');
    });
});

describe('delete', () => {
    it('should delete a homework', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockOneGlobalFetch({
            status: 'success',
            message: 'Homework deleted successfully',
        });
        const result = dlool.homework.delete('Homework ID');

        expect(result).resolves.toBe(true);
    });

    it('should throw an error when the token is invalid', async () => {
        const dlool = new Dlool();

        const plannedThrow = async () => {
            await expect(async () => {
                await dlool.homework.delete('Homework ID');
            }).rejects.toThrowError();
        };

        await plannedThrow();

        mockOneGlobalFetch(negativeLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' }).catch(() => {});
        await plannedThrow();

        dlool.token = 'invalid';
        await plannedThrow();
    });

    it('should throw an error when the homework id is invalid', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockOneGlobalFetch({
            status: 'error',
            message: 'Invalid homework id',
        });
        await expect(async () => {
            await dlool.homework.delete('Homework ID');
        }).rejects.toThrowError('The homework id is invalid');
    });

    it('should throw an error when the homework does not exist', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockOneGlobalFetch({
            status: 'error',
            message: 'Homework not found',
        });
        await expect(async () => {
            await dlool.homework.delete('Homework ID');
        }).rejects.toThrowError('The homework does not exist');
    });

    it('should throw an error when the request failed', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockRejectGlobalFetch(new Error('Invalid testddd'));
        await expect(async () => {
            await dlool.homework.delete('Homework ID');
        }).rejects.toThrowError();
    });
});

describe('update', () => {
    it('should update a homework', async () => {
        const dlool = new Dlool();

        mockOneGlobalFetch(positiveLoginResponse);
        await dlool.auth.login({ username: 'admin', password: 'admin' });

        mockOneGlobalFetch({
            message: 'homework updated',
            data: {
                class: 'someClassId',
                creator: 'someCreatorId',
                createdAt: 0,
            },
        });

        const request: UpdateHomework = {
            from: {
                day: 1,
                month: 1,
                year: 2021,
            },
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
        };
        const result = await dlool.homework.update('Homework ID', request);

        expect(result).toBeDefined();
        expect(result).toEqual({
            classId: 'someClassId',
            creatorId: 'someCreatorId',
            createdAt: new Date(0),
        });
    });

    it('should throw an error when the token is invalid', async () => {
        const dlool = new Dlool();

        const plannedThrow = async () => {
            await expect(async () => {
                await dlool.homework.update('Homework ID', {
                    from: {
                        day: 1,
                        month: 1,
                        year: 2021,
                    },
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
                });
            }).rejects.toThrowError('You must be logged in to perform this action');
        };

        await plannedThrow();
    });
});
