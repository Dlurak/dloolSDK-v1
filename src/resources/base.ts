import { Dlool } from 'src';

export abstract class BaseResource {
    private _dlool: Dlool;

    protected get dlool(): Dlool {
        return this._dlool;
    }

    constructor(dlool: Dlool) {
        this._dlool = dlool;
    }
}
