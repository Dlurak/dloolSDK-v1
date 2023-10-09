import { BaseResource } from '../base';
import { login } from './login';

export class Auth extends BaseResource {
    login(options: { username: string; password: string }) {
        return login(this.dlool.baseUrl, options);
    }
}
