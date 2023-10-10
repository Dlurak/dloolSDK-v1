import { NewHomework, UpdateHomework } from 'src/types/homework';
import { BaseResource } from '../base';
import { createHomework } from './createHomework';
import { getAllHomework } from './getAllHomework';
import { getPagedHomework } from './getPagedHomework';
import { deleteHomework } from './deleteHomework';
import { updateHomework } from './updateHomework';

/**
 * Homework class
 * @classdesc The homework class for the Dlool SDK. On this class, you can run operations related to homework
 * @class
 */
export class Homework extends BaseResource {
    /**
     * A function to get all the homework for a specific class
     * @param {{ class: string; school: string }} options - The options for the getAllHomework method
     * @returns The response from the API
     */
    getAll(options: { class: string; school: string }) {
        return getAllHomework(this.dlool.baseUrl, options);
    }

    getPaged(options: { class: string; school: string; page: number; limit: number }) {
        return getPagedHomework(this.dlool.baseUrl, options);
    }

    create(data: NewHomework) {
        return createHomework(this.dlool, data);
    }

    delete(homeworkId: string) {
        return deleteHomework(this.dlool, homeworkId);
    }

    update(id: string, data: UpdateHomework) {
        return updateHomework(this.dlool, id, data);
    }
}
