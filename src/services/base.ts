import { environment } from '../environments/environment';

export class Base {
    static apiUrl = `${ environment.BASE_URL }api/v1`;
    static baseUrl = environment.BASE_URL;

    // static apiUrl = 'http://192.168.0.117:3001/api/v1';
    // static baseUrl = 'http://192.168.0.117:3301';

    static getAuthToken() {
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
