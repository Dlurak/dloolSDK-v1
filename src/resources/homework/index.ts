import { BaseResource } from '../base';
import fetch from 'isomorphic-unfetch';
import {
    HomeworkStatus,
    getAllHomeworkAPIPositiveResponse,
    getAllHomeworkAPIResponse,
    getAllHomeworkResponse,
} from './types';

export class Homework extends BaseResource {
    getAllHomework(options: { class: string; school: string }) {
        const url = `${this.baseUrl}/homework/all?class=${options.class}&school=${options.school}`;
        const response = fetch(url).then((res) => res.json()) as Promise<getAllHomeworkAPIResponse>;

        return response.then((res) => {
            const { message } = res;

            const invalidSchoolTemplate = `The school ${options.school} does not exist`;
            const invalidClassTemplate = `The class ${options.class} does not exist in the school ${options.school}`;
            const successTemplate = `Homework found`;

            let result: getAllHomeworkResponse;

            switch (message) {
                case invalidSchoolTemplate:
                    result = {
                        status: HomeworkStatus.INVALID_SCHOOL,
                        message: 'Invalid school',
                    };
                    break;
                case invalidClassTemplate:
                    result = {
                        status: HomeworkStatus.INVALID_CLASS,
                        message: 'Invalid class',
                    };
                    break;
                case successTemplate:
                    result = {
                        status: HomeworkStatus.SUCCESS,
                        message: 'Homework found',
                        data: (res as getAllHomeworkAPIPositiveResponse).data,
                    };
                    break;
            }

            return result;
        });
    }
}
