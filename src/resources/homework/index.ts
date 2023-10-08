import { BaseResource } from '../base';
import { getAllHomework } from './getAllHomework';

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
    getAllHomework(options: { class: string; school: string }) {
        return getAllHomework(this.baseUrl, options);
    }
}
