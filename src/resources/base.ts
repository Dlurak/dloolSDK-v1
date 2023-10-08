export type Config = {
    baseUrl: string;
};

export abstract class BaseResource {
    baseUrl: string;

    constructor(config: Config) {
        this.baseUrl = config.baseUrl;
    }
}
