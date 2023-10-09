export type Config = {
    baseUrl: string;
};

export abstract class BaseResource {
    baseUrl: string;

    constructor(config: Config = { baseUrl: 'https://dlool-backend.onrender.com' }) {
        this.baseUrl = config.baseUrl;
    }
}
