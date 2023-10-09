import { expect, it, describe } from 'vitest';
import { Dlool } from '../src/index';
import { Homework } from '../src/types/homework';
import { isHomework } from './validate/isHomework';

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
