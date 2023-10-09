import { Auth } from './resources/auth';
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
    auth: Auth;

    /**
     * Creates a new Dlool instance
     *
     * @constructor
     * @constructs Dlool
     * @param {{ baseUrl: string } config - The configuration for the Dlool instance
     */
    constructor(config: Config = { baseUrl: 'https://dlool-backend.onrender.com' }) {
        this.homework = new Homework(config);
        this.auth = new Auth(config);

        // TODO: Check if it is valid
        // TODO: for that create a api endpoint that returns if it is a dlool instance
    }
}

export { SchoolError } from './errors/school';
export { ClassError } from './errors/class';
export { AuthError } from './errors/auth';
