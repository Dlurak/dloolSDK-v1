import { Dlool } from 'src';

export abstract class BaseResource {
    private _dlool: Dlool;

    protected get dlool(): Dlool {
        return this._dlool;
    }

    protected set dlool(dlool: Dlool) {
        this._dlool = dlool;
    }

    protected updateDloolToken(token: string) {
        this._dlool.token = token;
    }

    constructor(dlool: Dlool) {
        this._dlool = dlool;
    }
}
