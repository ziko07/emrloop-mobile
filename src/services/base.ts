export class Base {
    static api_url = 'http://34.207.81.246/api/v1';
    static base_url = 'http://34.207.81.246/';

    static getAuthToken() {
        let auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    static requestHeader() {
        return {headers: {Authorization: `Bearer ${Base.getAuthToken()}`}};
    }
}
