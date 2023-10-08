import { Config } from './resources/base';
import { Homework } from './resources/homework';

/**
 * Dlool class
 * @class
 * @classdesc The main class for the Dlool SDK
 * @param {Config} config - The configuration object
 * @example
 *  const dlool = new Dlool({
 *     baseUrl: 'https://dlool-backend.onrender.com',
 *  })
 */
export class Dlool {
    /**
     * The homework instance associated with the Dlool instance
     * @type {Homework}
     * @class
     */
    homework: Homework;

    /**
     * Creates a new Dlool instance
     *
     * @constructor
     * @constructs Dlool
     * @param {{ baseUrl: string } config - The configuration for the Dlool instance
     */
    constructor(config: Config) {
        this.homework = new Homework(config);
    }
}
