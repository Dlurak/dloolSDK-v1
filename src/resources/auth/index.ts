import { BaseResource } from '../base';
import { login } from './login';

export class Auth extends BaseResource {
    login(options: { username: string; password: string }) {
        return login(this.dlool, options).then((data) => {
            this.updateDloolToken(data[0]);
            this.dlool = data[1];
            return data[0];
        });
    }
}
