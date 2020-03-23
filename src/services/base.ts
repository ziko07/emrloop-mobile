export class Base {
    static api_url = 'http://localhost:3000/api/v1';
    static base_url = 'http://localhost:3000/';

    static getAuthToken() {
        let auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }
}
