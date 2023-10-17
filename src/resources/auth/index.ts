import { Dlool } from 'src';
import { BaseResource } from '../base';
import { login } from './login';
import { user } from './user';

export class Auth extends BaseResource {
    login(options: { username: string; password: string }) {
        return login(this.dlool, options).then((data) => {
            this.updateDloolToken(data[0]);
            this.dlool = data[1];
            return data[0];
        });
    }
    user(id: string) {
        return user(this.dlool, id);
    }
}
