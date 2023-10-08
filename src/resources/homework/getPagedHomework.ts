import { ClassError } from 'src/errors/class';
import { SchoolError } from 'src/errors/school';
import { Homework } from 'src/types/homework';
import fetch from 'isomorphic-unfetch';

export const getPagedHomework = (baseUrl, options: { class: string; school: string; page: number; limit: number }) => {
    if (options.page < 1) throw new Error('page must be greater than 0');
    if (options.limit < 1) throw new Error('limit must be greater than 0');

    const url = `${baseUrl}/homework?class=${options.class}&school=${options.school}&page=${options.page}&pageSize=${options.limit}`;
    const response = fetch(url).then((res) => res.json());

    return response.then((res) => {
        const errorMessage = res.error;
        const successMessage = res.message;
        const message = errorMessage || successMessage;

        const invalidSchoolTemplate = `The school ${options.school} does not exist`;
        const invalidClassTemplate = `The class ${options.class} does not exist in the school ${options.school}`;
        const successTemplate = `Homework found`;

        switch (message) {
            case invalidSchoolTemplate:
                throw new SchoolError(invalidSchoolTemplate);
            case invalidClassTemplate:
                throw new ClassError(`The school ${options.school} does not have the class ${options.class}`);
            case successTemplate:
                return {
                    homework: res.data.homework as Homework[],
                    totalPageCount: res.data.totalPageCount as number,
                };
        }
    });
};
