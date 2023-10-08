import { SchoolError } from 'src/errors/school';
import { getAllHomeworkAPIPositiveResponse, getAllHomeworkAPIResponse } from '../../types/homework';
import fetch from 'isomorphic-unfetch';
import { ClassError } from 'src/errors/class';

export const getAllHomework = (baseUrl: string, options: { class: string; school: string }) => {
    const url = `${baseUrl}/homework/all?class=${options.class}&school=${options.school}`;
    const response = fetch(url).then((res) => res.json()) as Promise<getAllHomeworkAPIResponse>;

    return response.then((res) => {
        const { message } = res;

        const invalidSchoolTemplate = `The school ${options.school} does not exist`;
        const invalidClassTemplate = `The class ${options.class} does not exist in the school ${options.school}`;
        const successTemplate = `Homework found`;

        switch (message) {
            case invalidSchoolTemplate:
                throw new SchoolError(invalidSchoolTemplate);
            case invalidClassTemplate:
                throw new ClassError(`The school ${options.school} does not have the class ${options.class}`);
            case successTemplate:
                return { homework: (res as getAllHomeworkAPIPositiveResponse).data };
        }
    });
};
