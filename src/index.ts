import { Config } from './resources/base';
import { Homework } from './resources/homework';

export class Dlool {
    homework: Homework;

    constructor(config: Config) {
        this.homework = new Homework(config);
    }
}
